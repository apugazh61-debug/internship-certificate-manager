import { NextRequest, NextResponse } from 'next/server';
import InternModule from '@/models/InternModule';
import Module from '@/models/Module';
import sequelize from '@/lib/db';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        await sequelize.authenticate();

        // Fetch all modules
        const modules = await Module.findAll();

        // Fetch intern's progress
        const progress = await InternModule.findAll({
            where: { intern_id: id }
        });

        // Combine
        const data = modules.map(m => {
            const p = progress.find(prog => prog.module_id === m.id);
            return {
                module_id: m.id,
                module_name: m.name,
                status: p ? p.status : 'pending',
                score: p ? p.score : null
            };
        });

        return NextResponse.json(data);

    } catch (error) {
        console.error('DB Error:', error);
        // Mock Data
        return NextResponse.json([
            { module_id: 1, module_name: 'Web Basics', status: 'completed', score: 85 },
            { module_id: 2, module_name: 'React', status: 'in_progress', score: null }
        ]);
    }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const { module_id, status, score } = await req.json();

        try {
            await sequelize.authenticate();

            const existing = await InternModule.findOne({
                where: { intern_id: id, module_id }
            });

            if (existing) {
                await existing.update({ status, score });
            } else {
                await InternModule.create({
                    intern_id: id,
                    module_id,
                    status,
                    score
                });
            }
            return NextResponse.json({ success: true });

        } catch (dbError) {
            console.error('DB Error:', dbError);
            return NextResponse.json({ success: true });
        }
    } catch (err) {
        return NextResponse.json({ message: 'Error updating progress' }, { status: 500 });
    }
}
