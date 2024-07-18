// Define your chain ID to chain name mapping
const chainNames = {
    1: 'Mainnet',
    11155111: 'sepolia'
    // Add more chains as needed
};

const blockExplorers = {
    sepolia: 'https://sepolia.etherscan.io/',
    mainnet: 'https://etherscan.io/'
}
  
// Function to retrieve chain name based on chain ID
export const getChainName = (chainId) => {
    return chainNames[chainId] || 'Unknown'; // Return chain name or 'Unknown' if not found
};

export const getBlockExplorerByName = (chainName) => {
    return blockExplorers[chainName] || 'Unknown'; //Return block explorer UL or 'Unknown' if not found
}