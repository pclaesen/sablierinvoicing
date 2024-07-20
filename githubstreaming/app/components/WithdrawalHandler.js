import React, { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import styles from '../page.module.css';
import { sablierLockupLinearABI } from '../abi/SablierLockupLinearABI';
import { Web3SignatureProvider } from '@requestnetwork/web3-signature';
import { RequestNetwork, Types, Utils } from '@requestnetwork/request-client.js';
import { getBlockExplorerByName, getChainName } from './ChainLibrary';

const WithdrawalHandler = ({ account, setStreamId, setConfirmedRequestData, setTxHash, setBlockExplorer, confirmedRequestData }) => {
  const [localStreamId, setLocalStreamId] = useState('');
  const [withdrawalInProgress, setWithdrawalInProgress] = useState(false); // State to track withdrawal progress

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalStreamId(value);
    setStreamId(value); // Update the state in the parent component
  };

  const withdraw = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Set withdrawal in progress to true
        setWithdrawalInProgress(true);

        const sablierContractAddress = "0x3E435560fd0a03ddF70694b35b673C25c65aBB6C";
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const underlyingSablierAddress = new ethers.Contract(sablierContractAddress, sablierLockupLinearABI, signer);

        const currentChain = await provider.getNetwork();
        const currentChainId = currentChain.chainId;
        const chainName = getChainName(currentChainId);
        const blockExplorer = getBlockExplorerByName(chainName);
        setBlockExplorer(blockExplorer);

        let withdrawTx = await underlyingSablierAddress.withdrawMax(localStreamId, account);
        console.log(`Withdrawing from stream ID ${localStreamId} for account: ${account}`);
        const receipt = await withdrawTx.wait();
        console.log(`Withdrawal of stream ID ${localStreamId} for account: ${account} completed`);
        //console.log(receipt);
        const withdrawnAmountRaw = ethers.BigNumber.from(receipt.events[0].data);
        //console.log(withdrawnAmountRaw);
        const withdrawnAmount = withdrawnAmountRaw.toString();
        setTxHash(receipt.transactionHash); // Pass txHash up to the parent
        //console.log('Withdrawn Amount:', withdrawnAmountRaw.toString());

        await handleRequestHandler(withdrawnAmount, localStreamId, receipt.transactionHash);
      } catch (error) {
        console.error('Request handling failed', error);
      } finally {
        // Set withdrawal in progress to false regardless of success or failure
        setWithdrawalInProgress(false);
      }
    }
  };

  const handleRequestHandler = async (withdrawnAmount, streamId, txHash, blockExplorer) => {
    // console.log('Calling RequestHandler with withdrawnAmount:', withdrawnAmount);
    // console.log('Withdrawal transaction hash: ', txHash);
    // console.log('Test explorer', blockExplorer);

    //Get date
    const currentDate = new Date(Date.now());
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(currentDate.getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;

    if (typeof window.ethereum !== 'undefined') {
      try {
        const web3Provider = new Web3SignatureProvider(window.ethereum);
        //console.log(withdrawnAmount);

        const sablierContractAddress = "0x3E435560fd0a03ddF70694b35b673C25c65aBB6C";
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const underlyingSablierAddress = new ethers.Contract(sablierContractAddress, sablierLockupLinearABI, signer);

        let streamIdDetails = await underlyingSablierAddress.getStream(Number(streamId));
        //console.log("Stream ID details:", streamIdDetails);

        let amountToPassInRequestTemp = ethers.utils.parseUnits(withdrawnAmount, 6);
        //console.log("Temp amount", amountToPassInRequestTemp);
        let amountToPassInRequestString = BigNumber.from(amountToPassInRequestTemp).toString();
        //console.log("String and BN:", amountToPassInRequestString);

        const streamIdObject = {
          sender: streamIdDetails[0],
          recipient: streamIdDetails[1],
          tokenAddress: streamIdDetails[5]
        };
        //console.log(streamIdObject);

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
            expectedAmount: withdrawnAmount,
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
            dueDate: date,
          },
          signer: {
            type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
            value: payeeIdentity,
          },
        };

        const request = await tempRequestClient.createRequest(requestCreateParameters);
        const confirmedRequestData = await request.waitForConfirmation();
        console.log("Successfully created the request");
        //console.log(confirmedRequestData);

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
        value={localStreamId}
        onChange={handleInputChange}
        className={styles.input}
        placeholder="Enter stream ID"
      />
      <button
        onClick={withdraw}
        className={styles.button}
        disabled={!account || !localStreamId || withdrawalInProgress} // Disable when withdrawing or no account/streamId
        style={{
          backgroundColor: !account || !localStreamId || withdrawalInProgress ? 'grey' : '', // Grey out when disabled
          cursor: !account || !localStreamId || withdrawalInProgress ? 'not-allowed' : 'pointer', // Change cursor
        }}
      >
        {withdrawalInProgress ? 'Withdrawing...' : 'Withdraw'}
      </button>
    </div>
  );
};

export default WithdrawalHandler;
