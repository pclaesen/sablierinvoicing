import { ethers } from 'ethers';
import { ERC20ABI } from '../abi/ERC20ABI';

export const getTokenDetails = async (tokenAddress) => {
  if (!ethers.utils.isAddress(tokenAddress)) {
    throw new Error('Invalid token address');
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const tokenContract = new ethers.Contract(tokenAddress, ERC20ABI, provider);

  try {
    const [symbol, decimals] = await Promise.all([
      tokenContract.symbol(),
      tokenContract.decimals()
    ]);
    return { 
      address: tokenAddress,
      symbol, 
      decimals: Number(decimals)
    };
  } catch (error) {
    console.error('Error fetching token details:', error);
  }
};