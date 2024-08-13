import { PDFDocument, StandardFonts, rgb, PDFName, PDFArray } from 'pdf-lib';
import { ethers } from 'ethers';
import { fetchCompanyDetails } from './SB_Helpers';

async function drawTable(page, x, y, columnWidths, rows, font, fontSize, smallFontSize) {
  const rowHeight = fontSize * 1.2; // Reduced row height for tighter spacing
  let currentY = y;

  rows.forEach(row => {
    let currentX = x;
    row.forEach((cell, i) => {
      const isSmallText = (i === 1 && (cell.includes('0x') || cell.includes('@'))); // Apply smaller font for addresses and emails
      page.drawText(cell, {
        x: currentX,
        y: currentY,
        size: isSmallText ? smallFontSize : fontSize, // Use small font size for specific cells
        font: font,
        color: rgb(0, 0, 0),
      });
      currentX += columnWidths[i];
    });
    currentY -= rowHeight;
  });
}

export async function createPdf(confirmedRequestData, txHash, blockExplorer, invoiceNumber, fileName = 'invoice.pdf', companyDetails, customerDetails, formattedAmount, tokenSymbol) {
  try {

    if (!companyDetails || !customerDetails) {
      console.error('Missing company or customer details:', { companyDetails, customerDetails });
      throw new Error('Missing company or customer details');
    }
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();

    // Convert payer and payee values to lowercase
    const payerAddress = confirmedRequestData.payer.value.toLowerCase();
    const payeeAddress = confirmedRequestData.payee.value.toLowerCase();

    // Fetch company details for payer and payee
    const payerDetails = await fetchCompanyDetails(payerAddress);
    const payeeDetails = await fetchCompanyDetails(payeeAddress);

    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    
    // Set the page size to A4
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 dimensions in points
    const { width, height } = page.getSize();
    const fontSize = 8;
    const smallFontSize = 6; // Smaller font size for EVM addresses and emails

    // Draw text information at the top
    page.drawText('Invoice number: ' + invoiceNumber, {
      x: 50,
      y: height - 2 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    page.drawText('Issue date: ' + formattedDate, {
      x: width - 150, // Adjusted for A4 width
      y: height - 2 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    page.drawText('Paid on: ' + formattedDate, {
      x: width - 150, // Adjusted for A4 width
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

    // Define table column widths and data
    const leftTableX = 50;
    const rightTableX = width / 2 + 20; // Adjusted for A4 width
    const tableColumnWidths = [100, width / 2 - 120]; // Adjusted column widths for smaller spacing

    // Payee information table
    const payeeRows = [
      ['SUPPLIER:'],
      ['Payee Company:', payeeDetails?.company_name || 'N/A'],
      ['Payee Address:', payeeDetails?.address || 'N/A'],
      ['Payee City:', payeeDetails?.city || 'N/A'],
      ['Payee Postal Code:', payeeDetails?.postal_code || 'N/A'],
      ['Payee Country:', payeeDetails?.country || 'N/A'],
      ['Payee VAT/Company Nr.:', payeeDetails?.company_vat_number || 'N/A'],
      ['Payee EVM address:', confirmedRequestData.payee.value],
    ];
    drawTable(page, leftTableX, height - 7 * fontSize, tableColumnWidths, payeeRows, timesRomanFont, fontSize, smallFontSize);

    // Customer information table
    const payerRows = [
      ['CUSTOMER:'],
      ['Customer Company:', customerDetails.companyName || 'N/A'],
      ['Customer Address:', customerDetails.address || 'N/A'],
      ['Customer City:', customerDetails.city || 'N/A'],
      ['Customer Postal Code:', customerDetails.postalCode || 'N/A'],
      ['Customer Country:', customerDetails.country || 'N/A'],
      ['Customer VAT/Company Nr.:', customerDetails.vatNumber || 'N/A'],
      ['Customer EVM address:', confirmedRequestData.payer.value],
    ];
    drawTable(page, rightTableX, height - 7 * fontSize, tableColumnWidths, payerRows, timesRomanFont, fontSize, smallFontSize);

    page.drawText(`Amount: ${formattedAmount} ${tokenSymbol}`, {
      x: 50,
      y: height - 17 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    const linkText = 'View transaction';
    const linkUrl = `${blockExplorer}tx/${txHash}`;
    const linkWidth = timesRomanFont.widthOfTextAtSize(linkText, fontSize);

    page.drawText(linkText, {
      x: 50,
      y: height - 19 * fontSize,
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
