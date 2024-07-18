import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { ethers } from 'ethers';

export async function createPdf(confirmedRequestData, fileName = 'invoice.pdf') {
  console.log('Creating PDF with data:', confirmedRequestData);
  const pdfDoc = await PDFDocument.create();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  const fontSize = 12;

  page.drawText('Request ID: ' + confirmedRequestData.requestId, {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
  });

  page.drawText('Customer: ' + confirmedRequestData.payer.value, {
    x: 50,
    y: height - 6 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  page.drawText('Payee: ' + confirmedRequestData.payee.value, {
    x: 50,
    y: height - 7 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  page.drawText('Token address: ' + confirmedRequestData.currencyInfo.value, {
    x: 50,
    y: height - 8 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  page.drawText('Amount: ' + ethers.utils.formatUnits(confirmedRequestData.expectedAmount, 6), {
    x: 50,
    y: height - 9 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  page.drawText('Note: ' + confirmedRequestData.contentData.reason, {
    x: 50,
    y: height - 10 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  page.drawText('Due date: ' + confirmedRequestData.contentData.dueDate, {
    x: 450,
    y: height - 1 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  // Create an anchor element
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank'; // Open in new tab
  link.download = fileName; // Set the filename for download

  // Append the link to the body
  document.body.appendChild(link);

  // Programmatically click the link to trigger the new tab opening
  link.click();

  // Clean up: remove the link from the DOM and revoke the URL after a delay
  setTimeout(() => {
    if (link.parentNode) {
      link.parentNode.removeChild(link);
    }
    URL.revokeObjectURL(url);
  }, 100); // Delay to ensure the link is fully processed before removal
}
