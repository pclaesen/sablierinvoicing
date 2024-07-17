import React from 'react';
import { ethers } from 'ethers';
import { Web3SignatureProvider } from '@requestnetwork/web3-signature';
import { RequestNetwork, Types, Utils } from '@requestnetwork/request-client.js';
import { sablierLockupLinearABI } from '../abi/SablierLockupLinearABI';
import styles from '../page.module.css';

const RequestHandler = ({ account, streamId, withdrawnAmount }) => {
  const handleRequest = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const web3Provider = new Web3SignatureProvider(window.ethereum);

        const sablierContractAddress = "0x3E435560fd0a03ddF70694b35b673C25c65aBB6C";
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const underlyingSablierAddress = new ethers.Contract(sablierContractAddress, sablierLockupLinearABI, signer);

        let streamIdDetails = await underlyingSablierAddress.getStream(Number(streamId));
        console.log("Stream ID details:",streamIdDetails);

        let amountToPassInRequest = withdrawnAmount;

        const streamIdObject = {
          sender: streamIdDetails[0],
          recipient: streamIdDetails[1],
          //streamIdDetails[2], = deposited amount
          tokenAddress: streamIdDetails[3]
        }

        const tempRequestClient = new RequestNetwork({
          nodeConnectionConfig: {
            baseURL: 'https://sepolia.gateway.request.network/',
          },
          signatureProvider: web3Provider,
        });

        const payeeIdentity = streamIdObject.recipient;
        const payerIdentity = streamIdObject.sender;
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
            reason: 'Withdrawal from StreamId' + streamId,
            dueDate: '2024.07.17',
          },
          signer: {
            type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
            value: payeeIdentity,
          },
        };

        const request = await tempRequestClient.createRequest(requestCreateParameters);
        const confirmedRequestData = await request.waitForConfirmation();
        console.log(confirmedRequestData);
      } catch (error) {
        console.error('Request handling failed', error);
      }
    } else {
      console.error('No MetaMask connection found, redirecting to connection process...');
    }
  };

  return (
    <div className={styles.requestHandler}>
      <button onClick={handleRequest} className={styles.button}>
        Handle Request
      </button>
    </div>
  );
};

export default RequestHandler;
