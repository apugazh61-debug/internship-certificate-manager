import jsPDF from 'jspdf';
import QRCode from 'qrcode';

export const generateCertificatePDF = async (internName: string, courseName: string, date: string, certificateId: string) => {
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
    });

    // Background
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 297, 210, 'F');

    // Border
    doc.setDrawColor(79, 70, 229); // Indigo-600
    doc.setLineWidth(2);
    doc.rect(10, 10, 277, 190);

    // Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(40);
    doc.setTextColor(31, 41, 55); // Gray-800
    doc.text('CERTIFICATE', 148.5, 40, { align: 'center' });
    doc.setFontSize(20);
    doc.text('OF COMPLETION', 148.5, 50, { align: 'center' });

    // Body
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(16);
    doc.text('This verifies that', 148.5, 80, { align: 'center' });

    doc.setFont('times', 'bolditalic');
    doc.setFontSize(36);
    doc.setTextColor(79, 70, 229);
    doc.text(internName, 148.5, 95, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(16);
    doc.setTextColor(31, 41, 55);
    doc.text('has successfully completed the internship program in', 148.5, 120, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text(courseName, 148.5, 130, { align: 'center' });

    // Footer
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    // Align horizontally with space for signature
    doc.text(`Issued on: ${date}`, 50, 170, { align: 'center' });
    doc.text('___________________', 50, 160, { align: 'center' });
    doc.text('Authorized Signature', 50, 165, { align: 'center' });

    // QR Code
    try {
        const verifyUrl = `${window.location.origin}/verify/${certificateId}`;
        const qrDataUrl = await QRCode.toDataURL(verifyUrl, { width: 100, margin: 1 });
        doc.addImage(qrDataUrl, 'PNG', 220, 140, 40, 40);
        doc.setFontSize(10);
        doc.text(`ID: ${certificateId}`, 240, 185, { align: 'center' });
        doc.text('Scan to Verify', 240, 190, { align: 'center' });
    } catch (err) {
        console.error('QR Error', err);
    }

    doc.save(`Certificate-${internName}.pdf`);
};
