import React from 'react';
import { RequestNetwork, Types, Utils } from '@requestnetwork/request-client.js';
import { Web3SignatureProvider } from '@requestnetwork/web3-signature';
import { payRequest } from "@requestnetwork/payment-processor";
import styles from '../page.module.css';
import { ethers } from 'ethers';

const RequestHandler = ({ account }) => {
  const handleRequest = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        //console.log(account);
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
            expectedAmount: '10000000',
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
            reason: 'INVOICE123',
            dueDate: '2025.06.16',
          },
          signer: {
            type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
            value: payeeIdentity,
          },
          
        };

        const request = await requestClient.createRequest(requestCreateParameters);
        const confirmedRequestData = await request.waitForConfirmation(5);
        console.log(confirmedRequestData);
        await request.declareReceivedPayment( "10000000", "test", requestCreateParameters.signer);
        console.log("Declared paid");
      } catch (error) {
        console.error('Request handling failed', error);
      }
    }
  };

  async function payRequestFromId() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const web3Provider = new Web3SignatureProvider(window.ethereum);
    const requestClient = new RequestNetwork({
      nodeConnectionConfig: { 
        baseURL: "https://sepolia.gateway.request.network/",
      },
      signatureProvider: web3Provider,
    });
    // const identityAddress = account;
    // const requests = await requestClient.fromIdentity({
    //   type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
    //   value: identityAddress,
    // });
    // const requestDatas = requests.map((request) => request.getData());
    // console.log(requestDatas);
    const fetchedRequestData = await requestClient.fromRequestId(
          "01bb88b4970aa01b00e14f4bdf14297f5f742379b01b4900acc94b00370b2da968",
        );
    const requestData = fetchedRequestData.getData();
    console.log(requestData);
    const signer = provider.getSigner();
    const paymentTx = await payRequest(requestData, signer);
    await paymentTx.wait(2);

  }

  async function checkIfRequestIsPaid() {
    const web3Provider = new Web3SignatureProvider(window.ethereum);
    const requestClient = new RequestNetwork({
      nodeConnectionConfig: { 
        baseURL: "https://sepolia.gateway.request.network/",
      },
      signatureProvider: web3Provider,
    });
    const request = await requestClient.fromRequestId("01bb88b4970aa01b00e14f4bdf14297f5f742379b01b4900acc94b00370b2da968");
    let requestData = request.getData();

    while (requestData.balance?.balance < requestData.expectedAmount) {
    requestData = await request.refresh();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    console.log("should be paid");
  }

  async function logRequestIdData() {
    const web3Provider = new Web3SignatureProvider(window.ethereum);
    const requestClient = new RequestNetwork({
      nodeConnectionConfig: { 
        baseURL: "https://sepolia.gateway.request.network/",
      },
      signatureProvider: web3Provider,
    });
    const request = await requestClient.fromRequestId("01bb88b4970aa01b00e14f4bdf14297f5f742379b01b4900acc94b00370b2da968");
    let requestData = request.getData();
    console.log(requestData);
  }

  return (
    <><button className={styles.button} onClick={handleRequest}>
      Create Request and mark paid
    </button><br />
    <button className={styles.button} onClick={payRequestFromId}>
    Pay Request from Request ID
    </button><br />
    <button className={styles.button} onClick={checkIfRequestIsPaid}>
    Check if Request is paid
    </button><br />
    <button className={styles.button} onClick={logRequestIdData}>
    Log Request ID data
    </button>
    </>
  );
};

export default RequestHandler;
