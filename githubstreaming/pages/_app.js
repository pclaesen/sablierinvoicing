// pages/_app.js
import '../app/globals.css';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [account, setAccount] = useState('');

  return (
    <Component 
      {...pageProps} 
      account={account} 
      setAccount={setAccount} 
    />
  );
}

export default MyApp;
