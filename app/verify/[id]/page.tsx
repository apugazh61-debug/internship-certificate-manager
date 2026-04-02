import { notFound } from 'next/navigation';
import Certificate from '@/models/Certificate';
import Intern from '@/models/Intern';
import sequelize from '@/lib/db';
import { CheckCircle, XCircle } from 'lucide-react';

export default async function VerifyPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    let certificate = null;
    let error = false;

    try {
        await sequelize.authenticate();
        const cert = await Certificate.findOne({
            where: { certificate_id: id },
            include: [{ model: Intern, attributes: ['name', 'intern_id'] }]
        });

        if (cert) {
            certificate = cert.toJSON();
        }
    } catch (err) {
        console.error('Verification Error:', err);
        error = true;
        // Mock fallback for demo if DB fails
        if (id === 'demo-123') {
            certificate = {
                certificate_id: 'demo-123',
                issue_date: '2023-01-01',
                Intern: { name: 'Demo User', intern_id: 'DEMO-01' }
            };
            error = false;
        }
    }

    if (!certificate && !error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
                <XCircle className="h-16 w-16 text-red-500 mb-4" />
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid Certificate</h1>
                <p className="text-gray-600">The certificate ID <strong>{id}</strong> could not be found.</p>
            </div>
        );
    }

    if (error && !certificate) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
                <h1 className="text-xl font-bold text-gray-900 mb-2">System Error</h1>
                <p className="text-gray-600">Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center border-t-4 border-green-500">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Valid Certificate</h1>
                <p className="text-gray-500 mb-6">This certificate is authentic and issued by our organization.</p>

                <div className="bg-gray-50 p-4 rounded-md text-left space-y-3">
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold">Intern Name</p>
                        <p className="text-lg font-medium text-gray-900">{certificate.Intern?.name}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold">Intern ID</p>
                        <p className="text-md text-gray-700">{certificate.Intern?.intern_id}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold">Course</p>
                        <p className="text-md text-gray-700">Full Stack Web Development</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold">Issue Date</p>
                        <p className="text-md text-gray-700">{certificate.issue_date}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold">Certificate ID</p>
                        <p className="text-xs font-mono text-gray-500 break-all">{certificate.certificate_id}</p>
                    </div>
                </div>

                <div className="mt-8 text-xs text-gray-400">
                    Verified by InternManager System
                </div>
            </div>
        </div>
    );
}
