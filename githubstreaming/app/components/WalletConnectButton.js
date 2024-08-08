import React, { useEffect } from 'react';
import { init, useConnectWallet } from '@web3-onboard/react';
import injectedModule from '@web3-onboard/injected-wallets';
import styles from '../../styles/page.module.css';

const RPC_URL = process.env.NEXT_PUBLIC_SEPOLIA_ALCHEMY_URL;
const apiKey = '1730eff0-9d50-4382-a3fe-89f0d34a2070';
const ethereumSepolia = {
  id: 11155111,
  token: 'ETH',
  label: 'Sepolia',
  rpcUrl: RPC_URL,
};

const injected = injectedModule();
const chains = [ethereumSepolia];

init({
  apiKey,
  wallets: [injected],
  chains,
  appMetadata: {
    name: 'sablierStreaming',
    icon: '<svg>App Icon</svg>',
    description: 'A demo of Sablier streaming.',
  },
});

const WalletConnectButton = ({ onAccountChange }) => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  useEffect(() => {
    if (wallet) {
      const account = wallet.accounts[0].address;
      onAccountChange(account);
    }
  }, [wallet, onAccountChange]);

  return (
    <div>
      <button
        className={styles.button}
        disabled={connecting}
        onClick={() => (wallet ? disconnect(wallet) : connect())}
      >
        {connecting ? 'Connecting...' : wallet ? 'Disconnect' : 'Connect Wallet'}
      </button>
    </div>
  );
};

export default WalletConnectButton;
