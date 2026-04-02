'use client';

import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import jsPDF from 'jspdf';
import { Button } from '@/components/ui/button';
import { generateCertificatePDF } from '@/lib/pdf';

interface CertificateTemplateProps {
    internName: string;
    courseName: string;
    date: string;
    certificateId: string;
    onDownload?: () => void;
}

export function CertificateTemplate({ internName, courseName, date, certificateId, onDownload }: CertificateTemplateProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleDownload = () => {
        generateCertificatePDF(internName, courseName, date, certificateId);
        if (onDownload) onDownload();
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="border border-gray-200 p-4 shadow-lg bg-white w-full max-w-3xl aspect-[1.414/1] relative flex flex-col items-center justify-center text-center">
                {/* Visual Preview (HTML approximation of PDF) */}
                <div className="absolute inset-2 border-4 border-indigo-600"></div>
                <h1 className="text-4xl font-bold text-gray-800 mt-8">CERTIFICATE</h1>
                <h2 className="text-xl font-semibold text-gray-600">OF COMPLETION</h2>
                <p className="mt-8 text-lg text-gray-500">This verifies that</p>
                <p className="text-4xl font-serif italic text-indigo-600 my-4">{internName}</p>
                <p className="text-lg text-gray-500">has successfully completed the internship program in</p>
                <p className="text-2xl font-bold text-gray-800 my-2">{courseName}</p>

                <div className="mt-auto mb-12 flex justify-between w-full px-16 relative z-10">
                    <div className="text-center">
                        <div className="w-48 border-b-2 border-gray-400 mb-2"></div>
                        <p className="text-sm font-semibold">Authorized Signature</p>
                        <p className="text-xs text-gray-500">{date}</p>
                    </div>
                    <div className="text-center">
                        <div className="w-24 h-24 bg-gray-100 flex items-center justify-center text-xs text-gray-400">QR Preview</div>
                        <p className="text-xs font-mono mt-1">{certificateId}</p>
                    </div>
                </div>
            </div>

            <Button onClick={handleDownload} size="lg">
                Download PDF
            </Button>
        </div>
    );
}
