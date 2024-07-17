// components/PDFHandler.js
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export async function createPdf(confirmedRequestData) {
  const pdfDoc = await PDFDocument.create();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  const fontSize = 30;
  page.drawText('Request ID' + confirmedRequestData.requestId, {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
  });

  page.drawText(`Request Data: ${JSON.stringify(confirmedRequestData)}`, {
    x: 50,
    y: height - 6 * fontSize,
    size: fontSize - 10,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  // Optional: If you want to trigger a download, you can do it here
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.open = 'invoice.pdf';
  link.click();
}
