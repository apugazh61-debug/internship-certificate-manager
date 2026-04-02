'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus, Download, ExternalLink, Mail } from 'lucide-react';
import { generateCertificatePDF } from '@/lib/pdf';

export default function CertificatesPage() {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCertificates();
    }, []);

    async function fetchCertificates() {
        try {
            const res = await fetch('/api/certificates');
            const data = await res.json();
            setCertificates(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleEmail(cert: any) {
        try {
            const res = await fetch('/api/certificates/email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    internName: cert.Intern?.name || 'Intern',
                    email: cert.Intern?.email || 'test@example.com', // Assuming email might be fetched or use fallback
                    certificateId: cert.certificate_id,
                    verifyUrl: `${window.location.origin}/verify/${cert.certificate_id}`
                })
            });
            if (res.ok) {
                alert('Email sent successfully!');
            } else {
                alert('Failed to send email.');
            }
        } catch (err) {
            console.error('Email error:', err);
            alert('An error occurred while sending email.');
        }
    }

    return (
        <div>
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900 ">Certificates</h1>
                    <p className="mt-2 text-sm text-gray-700 ">
                        Manage and issue internship certificates.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <Link href="/admin/certificates/new">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Issue Certificate
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300 ">
                                <thead className="bg-gray-50 ">
                                    <tr>
                                        <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900  sm:pl-6">Intern</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ">Cert ID</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ">Date</th>
                                        <th className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Actions</span></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white  ">
                                    {certificates.map((cert: any) => (
                                        <tr key={cert.id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900  sm:pl-6">
                                                {cert.Intern?.name || cert.intern_id}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                                                {cert.certificate_id}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                                                {cert.issue_date}
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/verify/${cert.certificate_id}`} target="_blank">
                                                        <Button variant="ghost" size="sm">
                                                            <ExternalLink className="h-4 w-4 mr-1" />
                                                            Verify
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleEmail(cert)}
                                                        title="Send Email"
                                                    >
                                                        <Mail className="h-4 w-4 text-indigo-500" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => generateCertificatePDF(
                                                            cert.Intern?.name || 'Intern',
                                                            'Full Stack Web Development',
                                                            cert.issue_date,
                                                            cert.certificate_id
                                                        )}
                                                    >
                                                        <Download className="h-4 w-4 mr-1" />
                                                        PDF
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
