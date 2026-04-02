import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
    try {
        const { internName, email, certificateId, verifyUrl } = await req.json();

        // Configure Nodemailer for development/demo (Using a fake Ethereal account or Gmail app password)
        // For a mini project, let's setup a basic SMTP mockup or direct them to use ETHEREAL
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'marta.crona25@ethereal.email', // Demo credentials, typically put in .env
                pass: 'wZ36W9vqjS9bJWeR19'
            }
        });

        const mailOptions = {
            from: '"InternManager System" <admin@internmanager.com>',
            to: email,
            subject: `Your Internship Certificate is Ready, ${internName}!`,
            html: `
                <div style="font-family: Arial, sans-serif; p-padding: 20px; color: #333;">
                    <h2 style="color: #4F46E5;">Congratulations, ${internName}!</h2>
                    <p>Your internship certificate has been successfully generated.</p>
                    <p><strong>Certificate ID:</strong> ${certificateId}</p>
                    <p>You can instantly view and verify your digital certificate using the link below:</p>
                    <a href="${verifyUrl}" style="display: inline-block; padding: 10px 20px; margin-top: 10px; background-color: #4F46E5; color: #fff; text-decoration: none; border-radius: 5px;">View Digital Certificate</a>
                    <br/><br/>
                    <p>Best Regards,</p>
                    <p><strong>InternManager Team</strong></p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);

        return NextResponse.json({ success: true, messageId: info.messageId, previewUrl: nodemailer.getTestMessageUrl(info) });

    } catch (error) {
        console.error('Email sending error:', error);
        return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
    }
}
