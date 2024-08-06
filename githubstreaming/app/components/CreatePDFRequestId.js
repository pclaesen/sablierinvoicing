import { PDFDocument, StandardFonts, rgb, PDFName, PDFArray } from 'pdf-lib';
import { ethers } from 'ethers';
import { getChainName, getBlockExplorerByName } from './ChainLibrary';

export async function createPdfRequestId(requestIdData) {
  try {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 12;
    
    // Format the current date
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();

    //const web3Provider = new Web3SignatureProvider(window.ethereum);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    //const signer = provider.getSigner();
    //const underlyingSablierAddress = new ethers.Contract(sablierContractAddress, sablierLockupLinearABI, signer);

    const network = await provider.getNetwork();
    const chainId = network.chainId;
    const chainName = getChainName(chainId);
    const blockExplorer = getBlockExplorerByName(chainName);
    
    // Draw invoice details on the PDF
    page.drawText('Invoice number: ' + requestIdData.contentData.userInvoiceNumber, {
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

    // Populate PDF with requestId data
    page.drawText('Request ID: ' + requestIdData.requestId, {
      x: 50,
      y: height - 5 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0.53, 0.71),
    });

    page.drawText('Payer: ' + requestIdData.payer.value, {
      x: 50,
      y: height - 7 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    page.drawText('Payee: ' + requestIdData.payee.value, {
      x: 50,
      y: height - 8 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    // Convert expectedAmount from smallest unit to desired format
    const amountWei = requestIdData.expectedAmount / 10e6;
    page.drawText('Amount: ' + ethers.utils.formatUnits(amountWei, 6) + ' USDC', {
      x: 50,
      y: height - 9 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    // Add link to transaction on block explorer
    const linkText = 'View transaction';
    const linkUrl = `${blockExplorer}tx/${requestIdData.contentData.txHashWithdrawFromStream}`;
    const linkWidth = timesRomanFont.widthOfTextAtSize(linkText, fontSize);

    page.drawText(linkText, {
      x: 50,
      y: height - 13 * fontSize,
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

    // Save the PDF and open it in a new tab
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    // Open the PDF in a new tab
    window.open(url, '_blank');

    // Clean up the object URL after a short delay
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);

    console.log('PDF created and opened in a new tab.');
  } catch (error) {
    console.error('Error creating PDF:', error);
  }
}
