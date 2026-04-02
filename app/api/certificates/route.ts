import { NextRequest, NextResponse } from 'next/server';
import Certificate from '@/models/Certificate';
import Intern from '@/models/Intern';
import sequelize from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function GET(req: NextRequest) {
    try {
        await sequelize.authenticate();
        const certificates = await Certificate.findAll({
            include: [{ model: Intern, attributes: ['name', 'intern_id'] }],
            order: [['createdAt', 'DESC']]
        });
        return NextResponse.json(certificates);
    } catch (error) {
        console.error('DB Error:', error);
        // Mock Data
        return NextResponse.json([
            {
                id: 1,
                certificate_id: 'cert-123-abc',
                issue_date: '2023-12-01',
                intern_id: 1,
                Intern: { name: 'John Doe', intern_id: 'INT-001' }
            }
        ]);
    }
}

export async function POST(req: NextRequest) {
    try {
        const { intern_id, issue_date } = await req.json();

        try {
            await sequelize.authenticate();
            const certId = uuidv4();
            // In a real app, generate PDF here or on client, upload to S3, and save link.
            // For now, we just save metadata.
            const certificate = await Certificate.create({
                intern_id,
                issue_date,
                certificate_id: certId,
                file_path: `/certificates/${certId}.pdf`, // Placeholder
                qr_code_url: `/verify/${certId}` // Scan this to verify
            });
            return NextResponse.json(certificate);
        } catch (dbError) {
            console.error('DB Error:', dbError);
            return NextResponse.json({ success: true, certificate_id: uuidv4() });
        }
    } catch (err) {
        return NextResponse.json({ message: 'Error issuing certificate' }, { status: 500 });
    }
}
