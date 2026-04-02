import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User';
import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';
import sequelize from '@/lib/db';
import { validateCoordinator } from '@/lib/coordinator-store';

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        // Admin super login
        if (email === 'Pugazh@Alfiya' && password === 'PugazhAlfiya') {
            const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
            const session = await encrypt({ user: { id: 1, email: 'Pugazh@Alfiya', role: 'admin' }, expires });
            (await cookies()).set('session', session, { expires, httpOnly: true });
            return NextResponse.json({ success: true });
        }

        // Coordinator login — checks the live server-side store
        const coordinator = validateCoordinator(email, password);
        if (coordinator) {
            const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
            const session = await encrypt({ user: { id: 99, email, role: 'coordinator' }, expires });
            (await cookies()).set('session', session, { expires, httpOnly: true });
            return NextResponse.json({ success: true });
        }

        try {
            // Try actual DB lookup if connection works
            // Note: Password usage here is plain, in production use bcrypt!
            // This is simplified as per "Project Initialization" scope
            const user = await User.findOne({ where: { email } });

            if (!user || user.password_hash !== password) {
                return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
            }

            const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
            const session = await encrypt({ user: { id: user.id, email: user.email, role: user.role }, expires });
            (await cookies()).set('session', session, { expires, httpOnly: true });

            return NextResponse.json({ success: true });

        } catch (dbError) {
            console.error('DB Error:', dbError);
            return NextResponse.json({ message: 'Invalid credentials. Please contact your administrator.' }, { status: 500 });
        }

    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
