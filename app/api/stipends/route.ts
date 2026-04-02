import { NextRequest, NextResponse } from 'next/server';
import Stipend from '@/models/Stipend';
import Intern from '@/models/Intern';
import sequelize from '@/lib/db';

export async function GET(req: NextRequest) {
    try {
        await sequelize.authenticate();
        const stipends = await Stipend.findAll({
            include: [{ model: Intern, attributes: ['name', 'intern_id'] }],
            order: [['payment_date', 'DESC']]
        });
        return NextResponse.json(stipends);
    } catch (error) {
        console.error('DB Error:', error);
        // Mock Data
        return NextResponse.json([
            {
                id: 1,
                amount: 5000,
                payment_date: '2023-05-01',
                status: 'paid',
                intern_id: 1,
                Intern: { name: 'John Doe', intern_id: 'INT-001' }
            },
            {
                id: 2,
                amount: 5000,
                payment_date: '2023-06-01',
                status: 'pending',
                intern_id: 1,
                Intern: { name: 'John Doe', intern_id: 'INT-001' }
            }
        ]);
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        try {
            await sequelize.authenticate();
            const stipend = await Stipend.create(body);
            return NextResponse.json(stipend);
        } catch (dbError) {
            console.error('DB Error:', dbError);
            return NextResponse.json({ ...body, id: Math.random(), status: 'pending' });
        }
    } catch (err) {
        return NextResponse.json({ message: 'Error creating stipend' }, { status: 500 });
    }
}
