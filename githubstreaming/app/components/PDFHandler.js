import { useEffect } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { ethers } from 'ethers';

export async function createPdf(confirmedRequestData, txHash, blockExplorer, fileName = 'invoice.pdf') {
  console.log('Creating PDF');
  console.log(blockExplorer);

  try {
    //Get date
    const currentDate = new Date(Date.now());
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(currentDate.getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    // Add a new page to the document
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 12;

    // Draw various pieces of information on the page
    page.drawText('Issue date: ' + date, {
      x: 450,
      y: height - 1 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    page.drawText('Paid on: ' + confirmedRequestData.contentData.dueDate, {
      x: 450,
      y: height - 2 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

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

    page.drawText('Amount: ' + ethers.utils.formatUnits(confirmedRequestData.expectedAmount, 6) + ' USDC', {
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

    page.drawText('Transaction hash: ' + blockExplorer + 'tx/' + txHash, {
      x: 50,
      y: height - 12 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      underline: true,
      color: rgb(0, 0, 0),
    });

    

    // Save the PDF document to a blob
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Create a URL for the blob
    const url = URL.createObjectURL(blob);

    // Create an anchor element and trigger a download
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank'; // Open in new tab
    link.download = fileName; // Set the filename for download

    // Append the link to the body and programmatically click it
    document.body.appendChild(link);
    link.click();

    // Clean up: remove the link from the DOM and revoke the URL after a delay
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100); // Delay to ensure the link is fully processed before removal
    console.log('PDF created');
  } catch (error) {
    console.error('Error creating PDF:', error);
  }
}
