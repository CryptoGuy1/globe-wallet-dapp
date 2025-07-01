import React, { useEffect, useState, createContext } from 'react';
import {
  BrowserProvider,
  Contract,
  parseEther
} from 'ethers';
import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = createContext({});

// Safely get the Ethereum provider
const getEthereumContract = async (): Promise<Contract> => {
  if (!window.ethereum) throw new Error('MetaMask not installed');

  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new Contract(contractAddress, contractABI, signer);
};

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  interface FType {
    addressTo: string;
    amount: string;
    message: string;
  }

  const [currentAccount, setCurrentAccount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(() => {
    const stored = localStorage.getItem('transactionCount');
    return stored ? parseInt(stored) : 0;
  });

  const [formData, setFormData] = useState<FType>({
    addressTo: '',
    amount: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };

  const checkWallet = async () => {
    if (!window.ethereum) return alert('Please install MetaMask');

    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) return alert('Please install MetaMask');

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const sendTransaction = async () => {
    if (!window.ethereum) return alert('Please install MetaMask');

    try {
      const { addressTo, amount, message } = formData;
      const contract = await getEthereumContract();
      const parsedAmount = parseEther(amount);

      // Send ETH via MetaMask
      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: '0x5208',
          value: parsedAmount.toString(),
        }],
      });

      const transactionHash = await contract.addToBlockchain(addressTo, parsedAmount, message);

      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);

      await transactionHash.wait();

      setIsLoading(false);
      setFormData({ addressTo: '', amount: '', message: '' });

      const count = await contract.getTransactionCount();
      setTransactionCount(Number(count));
      localStorage.setItem('transactionCount', count.toString());

      console.log(`Success - ${transactionHash.hash}`);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    checkWallet();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        isLoading,
        sendTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
