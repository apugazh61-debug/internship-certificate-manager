'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CertificateTemplate } from '@/components/certificate-template';

export default function NewCertificatePage() {
    const router = useRouter();
    const [interns, setInterns] = useState([]);
    const [selectedInternId, setSelectedInternId] = useState('');
    const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
    const [step, setStep] = useState(1); // 1: Select, 2: Preview & Issue
    const [generatedCert, setGeneratedCert] = useState<any>(null);

    useEffect(() => {
        fetch('/api/interns').then(res => res.json()).then(setInterns).catch(console.error);
    }, []);

    const handleNext = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/certificates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ intern_id: selectedInternId, issue_date: issueDate })
            });
            const data = await res.json();
            if (data.certificate_id) {
                setGeneratedCert(data);
                setStep(2);
            }
        } catch (err) {
            alert('Error creating certificate record');
        }
    };

    const selectedIntern: any = interns.find((i: any) => i.id == selectedInternId) || { name: 'Intern Name' };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-900 ">Issue New Certificate</h1>

            {step === 1 ? (
                <form onSubmit={handleNext} className="bg-white p-6 rounded-lg shadow  space-y-6">
                    <div>
                        <Label htmlFor="intern">Select Intern</Label>
                        <select
                            id="intern"
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  "
                            value={selectedInternId}
                            onChange={e => setSelectedInternId(e.target.value)}
                        >
                            <option value="">Choose an intern...</option>
                            {interns.map((intern: any) => (
                                <option key={intern.id} value={intern.id}>{intern.name} ({intern.intern_id})</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <Label htmlFor="date">Issue Date</Label>
                        <Input id="date" type="date" required value={issueDate} onChange={e => setIssueDate(e.target.value)} />
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit">Generate & Preview</Button>
                    </div>
                </form>
            ) : (
                <div className="space-y-6">
                    <div className="flex justify-center">
                        {generatedCert && (
                            <CertificateTemplate
                                internName={selectedIntern.name}
                                courseName="Full Stack Web Development" // Hardcoded for now, could be dynamic from Modules
                                date={issueDate}
                                certificateId={generatedCert.certificate_id}
                            />
                        )}
                    </div>
                    <div className="flex justify-center gap-4">
                        <Button variant="outline" onClick={() => setStep(1)}>Issue Another</Button>
                        <Button onClick={() => router.push('/admin/certificates')}>Done</Button>
                    </div>
                </div>
            )}
        </div>
    );
}
