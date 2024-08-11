import { PDFDocument, StandardFonts, rgb, PDFName, PDFArray } from 'pdf-lib';
import { ethers } from 'ethers';
import { fetchCompanyDetails } from './SB_Helpers';

export async function createPdf(confirmedRequestData, txHash, blockExplorer, invoiceNumber, fileName = 'invoice.pdf') {
  try {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();

    // Convert payer and payee values to lowercase
    const payerAddress = confirmedRequestData.payer.value.toLowerCase();
    const payeeAddress = confirmedRequestData.payee.value.toLowerCase();

    // Log the lowercase values for debugging
    console.log('Payer Address (Lowercase):', payerAddress);
    console.log('Payee Address (Lowercase):', payeeAddress);

    // Fetch company details for payer and payee
    const payerDetails = await fetchCompanyDetails(payerAddress);
    const payeeDetails = await fetchCompanyDetails(payeeAddress);

    // Log the fetched details for debugging
    console.log('Fetched Payer Details:', payerDetails);
    console.log('Fetched Payee Details:', payeeDetails);

    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 12;

    page.drawText('Invoice number: ' + invoiceNumber, {
      x: 50,
      y: height - 2 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    page.drawText('Issue date: ' + formattedDate, {
      x: 450,
      y: height - 2 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    page.drawText('Paid on: ' + formattedDate, {
      x: 450,
      y: height - 3 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    page.drawText('Request ID: ' + confirmedRequestData.requestId, {
      x: 50,
      y: height - 5 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0.53, 0.71),
    });

    page.drawText('Customer: ' + confirmedRequestData.payer.value, {
      x: 50,
      y: height - 7 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    // Add payer company details if available
    if (payerDetails) {
      page.drawText('Payer Company: ' + payerDetails.company_name, {
        x: 50,
        y: height - 8 * fontSize,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      page.drawText('Payer Email: ' + payerDetails.email, {
        x: 50,
        y: height - 9 * fontSize,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });
    }

    page.drawText('Payee: ' + confirmedRequestData.payee.value, {
      x: 50,
      y: height - 10 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    // Add payee company details if available
    if (payeeDetails) {
      page.drawText('Payee Company: ' + payeeDetails.company_name, {
        x: 50,
        y: height - 11 * fontSize,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      page.drawText('Payee Email: ' + payeeDetails.email, {
        x: 50,
        y: height - 12 * fontSize,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });
    }

    let amountWei = confirmedRequestData.expectedAmount / 10e6;
    page.drawText('Amount: ' + ethers.utils.formatUnits(amountWei, 6) + ' USDC', {
      x: 50,
      y: height - 13 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    const linkText = 'View transaction';
    const linkUrl = `${blockExplorer}tx/${txHash}`;
    const linkWidth = timesRomanFont.widthOfTextAtSize(linkText, fontSize);

    page.drawText(linkText, {
      x: 50,
      y: height - 17 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      underline: true,
      color: rgb(0, 0, 1),
    });

    const linkAnnotation = pdfDoc.context.obj({
      Type: PDFName.of('Annot'),
      Subtype: PDFName.of('Link'),
      Rect: [50, height - 16 * fontSize, 50 + linkWidth, height - 15 * fontSize],
      Border: PDFArray.withContext(pdfDoc.context).push(0, 0, 0),
      A: pdfDoc.context.obj({
        S: PDFName.of('URI'),
        URI: PDFName.of(linkUrl),
      }),
    });

    const annots = page.node.get(PDFName.of('Annots')) || pdfDoc.context.obj([]);
    annots.push(linkAnnotation);
    page.node.set(PDFName.of('Annots'), annots);

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.download = fileName;

    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
    console.log('PDF created');
  } catch (error) {
    console.error('Error creating PDF:', error);
  }
}
