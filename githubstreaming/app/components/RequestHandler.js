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
        console.log(account);
        const web3Provider = new Web3SignatureProvider(window.ethereum);
        const requestClient = new RequestNetwork({
          nodeConnectionConfig: {
            baseURL: 'https://sepolia.gateway.request.network/',
          },
          signatureProvider: web3Provider,
          
        });
        console.log("Signature/Web3 provider", web3Provider);

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
        console.log(requestCreateParameters.signer);

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

  async function fetchDetails() {
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
          "014cdf7d6a3d4f2c5c4b2a6b50149fc4acff9986c36020c8307ea2a7f17a023131",
        );
    const requestData = fetchedRequestData.getData();
    console.log(requestData);
    const signer = provider.getSigner();
    const paymentTx = await payRequest(requestData, signer);
    await paymentTx.wait(2);

  }

  async function checkItOut() {
    //const provider = new ethers.providers.Web3Provider(window.ethereum);
    const web3Provider = new Web3SignatureProvider(window.ethereum);
    const requestClient = new RequestNetwork({
      nodeConnectionConfig: { 
        baseURL: "https://sepolia.gateway.request.network/",
      },
      signatureProvider: web3Provider,
    });
    const request = await requestClient.fromRequestId("014cdf7d6a3d4f2c5c4b2a6b50149fc4acff9986c36020c8307ea2a7f17a023131");
    let requestData = request.getData();

    while (requestData.balance?.balance < requestData.expectedAmount) {
    requestData = await request.refresh();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    console.log("should be paid");
  }

  async function logIdData() {
    const web3Provider = new Web3SignatureProvider(window.ethereum);
    const requestClient = new RequestNetwork({
      nodeConnectionConfig: { 
        baseURL: "https://sepolia.gateway.request.network/",
      },
      signatureProvider: web3Provider,
    });
    const request = await requestClient.fromRequestId("016ca6d20edfe7a315b398bc5a49f44386a0238e76dc7abc7b6d4b01e47fc09ee8");
    let requestData = request.getData();
    console.log(requestData);
  }

  return (
    <><button className={styles.button} onClick={handleRequest}>
      Handle Request
    </button><br />
    <button className={styles.button} onClick={fetchDetails}>
    Fetch Request ID details
    </button><br />
    <button className={styles.button} onClick={checkItOut}>
    Check It Out
    </button><br />
    <button className={styles.button} onClick={logIdData}>
    Log ID data
    </button>
    </>
  );
};

export default RequestHandler;
