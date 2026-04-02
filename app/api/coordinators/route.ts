import { NextRequest, NextResponse } from 'next/server';
import { addCoordinator, removeCoordinator, getAllCoordinators } from '@/lib/coordinator-store';

// GET all coordinators (for admin panel display)
export async function GET() {
    const coordinators = getAllCoordinators();
    // Don't send passwords to the client
    const safe = coordinators.map(({ email, name, role }) => ({ email, name, role }));
    return NextResponse.json(safe);
}

// POST — create a new coordinator account from admin panel
export async function POST(req: NextRequest) {
    try {
        const { email, password, name, role } = await req.json();

        if (!email || !password || !name) {
            return NextResponse.json({ message: 'Email, password, and name are required.' }, { status: 400 });
        }

        addCoordinator({ email, password, name, role: role || 'coordinator' });

        return NextResponse.json({ success: true, message: `Coordinator "${name}" created successfully.` });
    } catch (e) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

// DELETE — remove a coordinator account
export async function DELETE(req: NextRequest) {
    try {
        const { email } = await req.json();
        removeCoordinator(email);
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
