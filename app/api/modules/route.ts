import { NextRequest, NextResponse } from 'next/server';
import Module from '@/models/Module';
import sequelize from '@/lib/db';

export async function GET(req: NextRequest) {
    try {
        await sequelize.authenticate();
        const modules = await Module.findAll();
        return NextResponse.json(modules);
    } catch (error) {
        console.error('DB Error:', error);
        // Mock Data
        return NextResponse.json([
            { id: 1, name: 'Web Development Basics', description: 'HTML, CSS, JS', duration_days: 7 },
            { id: 2, name: 'React & Next.js', description: 'Components, Hooks, Routing', duration_days: 14 },
        ]);
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        // Validation would go here

        try {
            await sequelize.authenticate();
            const module = await Module.create(body);
            return NextResponse.json(module);
        } catch (dbError) {
            console.error('DB Error:', dbError);
            return NextResponse.json({ ...body, id: Math.random() });
        }
    } catch (err) {
        return NextResponse.json({ message: 'Error creating module' }, { status: 500 });
    }
}
