// RequestHandler.js

import { ethers } from 'ethers';
import { Web3SignatureProvider } from '@requestnetwork/web3-signature';
import { RequestNetwork, Types, Utils } from '@requestnetwork/request-client.js';
import { sablierLockupLinearABI } from '../abi/SablierLockupLinearABI';
import { createPdf } from './PDFHandler'; // Ensure this path is correct
import { getChainName, getBlockExplorerByName } from './ChainLibrary'; // Ensure this path is correct

export const handleRequest = async (streamId, withdrawnAmount, sablierContractAddress, transactionHash, invoiceNumber) => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const web3Provider = new Web3SignatureProvider(window.ethereum);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const underlyingSablierAddress = new ethers.Contract(sablierContractAddress, sablierLockupLinearABI, signer);

      const network = await provider.getNetwork();
      const chainId = network.chainId;
      const chainName = getChainName(chainId);
      const blockExplorer = getBlockExplorerByName(chainName);

      const streamIdDetails = await underlyingSablierAddress.getStream(Number(streamId));
      console.log("Stream ID details:", streamIdDetails);

      const amountToPassInRequest = withdrawnAmount;

      const streamIdObject = {
        sender: streamIdDetails[0],
        recipient: streamIdDetails[1],
        tokenAddress: streamIdDetails[5]
      }

      const tempRequestClient = new RequestNetwork({
        nodeConnectionConfig: {
          baseURL: 'https://sepolia.gateway.request.network/',
        },
        signatureProvider: web3Provider,
      });

      const payeeIdentity = streamIdObject.recipient;
      const payerIdentity = streamIdObject.sender;

      // Get the current date and format it according to the user's locale
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString(); // You can customize the options here if needed

      const requestCreateParameters = {
        requestInfo: {
          currency: {
            type: Types.RequestLogic.CURRENCY.ERC20,
            value: streamIdObject.tokenAddress,
            network: 'sepolia',
          },
          expectedAmount: amountToPassInRequest,
          payee: {
            type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
            value: payeeIdentity,
          },
          payer: {
            type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
            value: payerIdentity,
          },
          timestamp: Utils.getCurrentTimestampInSecond(),
        },
        paymentNetwork: {
          id: Types.Extension.PAYMENT_NETWORK_ID.ERC20_FEE_PROXY_CONTRACT,
          parameters: {
            paymentNetworkName: 'sepolia',
            paymentAddress: payeeIdentity,
            feeAddress: '0x0000000000000000000000000000000000000000',
            feeAmount: '0',
          },
        },
        contentData: {
          reason: 'Withdrawal from StreamId ' + streamId,
          dueDate: formattedDate,
          txHashWithdrawFromStream: transactionHash,
          userInvoiceNumber: invoiceNumber,
        },
        signer: {
          type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
          value: payeeIdentity,
        },
      };

      const request = await tempRequestClient.createRequest(requestCreateParameters);
      const confirmedRequestData = await request.waitForConfirmation();
      console.log(confirmedRequestData);

      // Create PDF after request confirmation
      await createPdf(confirmedRequestData, transactionHash, blockExplorer, invoiceNumber);
      return { success: true, transactionHash };
    } catch (error) {
      console.error('Request handling failed', error);
      return { success: false, error: error.message };
    }
  } else {
    console.error('No MetaMask connection found, redirecting to connection process...');
    return { success: false, error: 'No MetaMask connection found' };
  }
};
