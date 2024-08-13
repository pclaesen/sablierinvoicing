import { useSetChain } from '@web3-onboard/react';

// Define your chain ID to chain name mapping
const chainNames = {
    1: 'mainnet',
    11155111: 'sepolia'
    // Add more chains as needed
};

const blockExplorers = {
    sepolia: 'https://sepolia.etherscan.io/',
    mainnet: 'https://etherscan.io/'
};

// Function to retrieve chain name based on chain ID
export const getChainName = (chainId) => {
    return chainNames[chainId] || 'Unknown'; // Return chain name or 'Unknown' if not found
};

export const getBlockExplorerByName = (chainName) => {
    return blockExplorers[chainName] || 'Unknown'; // Return block explorer URL or 'Unknown' if not found
};

// UseSetChain hook from web3-onboard
// const [
//   {
//     chains, // the list of chains that web3-onboard was initialized with
//     connectedChain, // the current chain the user's wallet is connected to
//     settingChain // boolean indicating if the chain is in the process of being set
//   },
//   setChain // function to call to initiate user to switch chains in their wallet
// ] = useSetChain();

// // Function to switch to Sepolia
// export const switchChain = async () => {
//     try {
//         await setChain({ chainId: '0xAA36A7' }); // Sepolia chainId in hexadecimal
//         console.log('Switched to Sepolia network');
//     } catch (error) {
//         console.error('Failed to switch network:', error);
//     }
// };
