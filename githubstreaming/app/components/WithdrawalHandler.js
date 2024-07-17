// WithdrawHandler.js
import React, { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import styles from '../page.module.css';
import { sablierLockupLinearABI } from '../abi/SablierLockupLinearABI';
import { Web3SignatureProvider } from '@requestnetwork/web3-signature';
import { RequestNetwork, Types, Utils } from '@requestnetwork/request-client.js';

const WithdrawalHandler = ({ account, setStreamId, setConfirmedRequestData }) => {
  const [streamId, setLocalStreamId] = useState('');
  const [withdrawnAmount, setWithdrawnAmount] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalStreamId(value);
    setStreamId(value); // Update the state in the parent component
  };

  const withdraw = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const sablierContractAddress = "0x3E435560fd0a03ddF70694b35b673C25c65aBB6C";
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const underlyingSablierAddress = new ethers.Contract(sablierContractAddress, sablierLockupLinearABI, signer);

        let withdrawTx = await underlyingSablierAddress.withdrawMax(streamId, account);
        console.log(`Withdrawing from stream ID ${streamId} for account: ${account}`);
        const receipt = await withdrawTx.wait();
        console.log(`Withdrawal of stream ID ${streamId} for account: ${account} completed`);
        console.log(receipt);
        const withdrawnAmountRaw = ethers.BigNumber.from(receipt.events[0].data);
        console.log(withdrawnAmountRaw);
        const withdrawnAmount = withdrawnAmountRaw.toString();
        setWithdrawnAmount(withdrawnAmount); // Update withdrawnAmount state
        console.log('Withdrawn Amount:', withdrawnAmountRaw.toString());

        // Call RequestHandler function after logging withdrawnAmount
        await handleRequestHandler(withdrawnAmount, streamId);
      } catch (error) {
        console.error('Request handling failed', error);
      }
    }
  };

  const handleRequestHandler = async (withdrawnAmount, streamId) => {
    // Implement RequestHandler logic here
    console.log('Calling RequestHandler with withdrawnAmount:', withdrawnAmount);
    if (typeof window.ethereum !== 'undefined') {
      try {
        const web3Provider = new Web3SignatureProvider(window.ethereum);
        console.log(withdrawnAmount);

        const sablierContractAddress = "0x3E435560fd0a03ddF70694b35b673C25c65aBB6C";
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const underlyingSablierAddress = new ethers.Contract(sablierContractAddress, sablierLockupLinearABI, signer);

        let streamIdDetails = await underlyingSablierAddress.getStream(Number(streamId));
        console.log("Stream ID details:", streamIdDetails);

        let amountToPassInRequestTemp = ethers.utils.parseUnits(withdrawnAmount, 6);
        console.log("Temp amount", amountToPassInRequestTemp);
        let amountToPassInRequestString = BigNumber.from(amountToPassInRequestTemp).toString();
        console.log("String and BN:", amountToPassInRequestString);

        const streamIdObject = {
          sender: streamIdDetails[0],
          recipient: streamIdDetails[1],
          // streamIdDetails[2], = deposited amount
          tokenAddress: streamIdDetails[5]
        }
        console.log(streamIdObject);

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
            expectedAmount: amountToPassInRequestString,
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
        console.log("Successfully created the request");
        console.log(confirmedRequestData);

        // Update the state in the parent component with confirmedRequestData
        setConfirmedRequestData(confirmedRequestData);
      } catch (error) {
        console.error('Request handling failed', error);
      }
    } else {
      console.error('No MetaMask connection found, redirecting to connection process...');
    }
  };

  return (
    <div className={styles.withdrawal}>
      <input
        type="number"
        value={streamId}
        onChange={handleInputChange}
        className={styles.input}
        placeholder="Enter stream ID"
      />
      <button
        onClick={withdraw}
        className={styles.button}
        disabled={!account}
        style={{ backgroundColor: !account ? 'grey' : '' }}
      >
        Withdraw
      </button>
    </div>
  );
};

export default WithdrawalHandler;
