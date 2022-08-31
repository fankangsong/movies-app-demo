import React, { useEffect, useState } from 'react';
import './App.css';



const MetaMaskButton = () => {
  const [accounts, setAccounts] = useState<string>('');
  const [chainId, setChainId] = useState<string>('');

  const connectWallet = async () => {
    // Check if MetaMask is installed on user's browser
    if(window?.ethereum) {
     const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
     const chainId = await window.ethereum.request({ method: 'eth_chainId'});
     
     setAccounts(accounts);
     setChainId(chainId);
      
    } else {
      // Show alert if Ethereum provider is not detected
      alert("Please install Mask");
    }
  }

  useEffect(() => {
    connectWallet()
  }, [])

  return <>
    {
      !accounts && <div className="metamask-button" onClick={connectWallet}>Connect MetaMask Wallet</div>
    }
    {
      accounts && <div className="metamask-button" onClick={connectWallet}>MetaMask Wallet Connected(
        {  chainId === '0x1' && 'Mainnet' }
        {  chainId === '0x3' && 'Ropsten' }
        {  chainId === '0x4' && 'Rinkeby' }
        {  chainId === '0x5' && 'Goerli' }
        {  chainId === '0x5' && 'Kovan' }
        )
      </div>
    }
  </>
}

export default MetaMaskButton;