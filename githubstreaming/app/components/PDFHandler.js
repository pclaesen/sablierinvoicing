import { PDFDocument, StandardFonts, rgb, PDFName, PDFArray, parseDate } from 'pdf-lib';
import { ethers } from 'ethers';

export async function createPdf(confirmedRequestData, txHash, blockExplorer, fileName = 'invoice.pdf') {
  try {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString()

    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 12;

    page.drawText('Issue date: ' + formattedDate, {
      x: 450,
      y: height - 1 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    page.drawText('Paid on: ' + formattedDate, {
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

    let amountWei = confirmedRequestData.expectedAmount / 10e6;
    page.drawText('Amount: ' + ethers.utils.formatUnits(amountWei, 6) + ' USDC', {
      x: 50,
      y: height - 8 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    const linkText = 'View transaction';
    const linkUrl = `${blockExplorer}tx/${txHash}`;
    const linkWidth = timesRomanFont.widthOfTextAtSize(linkText, fontSize);

    page.drawText(linkText, {
      x: 50,
      y: height - 12 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      underline: true,
      color: rgb(0, 0, 1),
    });

    const linkAnnotation = pdfDoc.context.obj({
      Type: PDFName.of('Annot'),
      Subtype: PDFName.of('Link'),
      Rect: [50, height - 12 * fontSize, 50 + linkWidth, height - 11 * fontSize],
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
