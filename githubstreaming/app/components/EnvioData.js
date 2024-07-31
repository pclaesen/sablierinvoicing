import axios from "axios";
import { ethers } from "ethers";

export const getEnvioData = async (account) => {
  let account32Bytes;
  if (ethers.utils.isAddress(account)) {
    // Remove the '0x' prefix
    const addressWithoutPrefix = account.slice(2);

    // Pad the address to 32 bytes (64 hex characters) with leading zeros
    account32Bytes = '0x' + addressWithoutPrefix.padStart(64, '0');
    //console.log("32-byte hex value of the address:", account32Bytes);
  } else {
    console.log("Invalid address");
    return;
  }

  const data = {
    from_block: 5779939,
    logs: [
      {
        address: [
         "0x3E435560fd0a03ddF70694b35b673C25c65aBB6C" //contract address LockupLinear
        ],
        topics: [
          [
            "0x40b88e5c41c5a97ffb7b6ef88a0a2d505aa0c634cf8a0275cb236ea7dd87ed4d"
          ],
          [],
          [
            account32Bytes
          ]
        ]
      }
    ],
    field_selection: {
      block: [
        "number",
        "timestamp",
        "hash"
      ],
      log: [
        "block_number",
        "log_index",
        "transaction_index",
        "transaction_hash",
        "data",
        "address",
        "topic0",
        "topic1",
        "topic2",
        "topic3",
      ]
    }
  };
  //returned values:
    //topic0: withdrawal action
    //topic1: stream ID
    //topic2: recipient
    //topic3: asset address
    //data: amount

  try {
    let withdrawalsForAccount = await axios.post('https://sepolia.hypersync.xyz/query', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    //console.log(withdrawalsForAccount);

    const combinedData = [];

    withdrawalsForAccount.data.data.forEach((entry) => {
      const blocks = entry.blocks;
      const logs = entry.logs;

      if (!blocks || !logs) {
        console.log("No blocks or logs found in the response data");
        return;
      }

      logs.forEach((log) => {
        const block = blocks.find(b => b.number === log.block_number);
        combinedData.push({
          ...block,
          ...log
        });
      });
    });

    //console.log(combinedData);
    return combinedData;
  } catch (error) {
    console.error('Error fetching withdrawals for account:', error);
  }
}
