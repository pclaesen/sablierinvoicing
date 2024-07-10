import React from 'react';
import { RequestNetwork, Types, Utils } from '@requestnetwork/request-client.js';
import { Web3SignatureProvider } from '@requestnetwork/web3-signature';
import styles from '../page.module.css';

const RequestHandler = ({ account }) => {
  const handleRequest = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        console.log(account);
        const web3Provider = new Web3SignatureProvider(window.ethereum);
        const requestClient = new RequestNetwork({
          nodeConnectionConfig: {
            baseURL: 'https://sepolia.gateway.request.network/',
          },
          signatureProvider: web3Provider,
        });

        const payeeIdentity = account;
        const payerIdentity = '0x1B39C76b7bbF7F16795F461Ce5298E882B63a7D6';
        const requestCreateParameters = {
          requestInfo: {
            currency: {
              type: Types.RequestLogic.CURRENCY.ERC20,
              value: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
              network: 'sepolia',
            },
            expectedAmount: '1000000000000000000',
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
            reason: '🍕',
            dueDate: '2025.06.16',
          },
          signer: {
            type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
            value: payeeIdentity,
          },
        };

        const request = await requestClient.createRequest(requestCreateParameters);
        const confirmedRequestData = await request.waitForConfirmation();
        console.log(confirmedRequestData);
      } catch (error) {
        console.error('Request handling failed', error);
      }
    }
  };

  return (
    <button className={styles.button} onClick={handleRequest}>
      Handle Request
    </button>
  );
};

export default RequestHandler;
