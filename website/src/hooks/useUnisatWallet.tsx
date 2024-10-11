'use client'
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const useUnisatWallet = () => {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const checkUnisatWallet = async () => {
        if (typeof window === "undefined") {
            // Client-side-only code
            return;
        }
      if (typeof window.unisat === 'undefined') {
        toast.error('Please install the Unisat Wallet.');
        return;
      }

      try {
        // @ts-ignore
        const chain = (await window.unisat?.getChain?.())?.enum;
        if (chain !== 'FRACTAL_BITCOIN_TESTNET') {
            // @ts-ignore
          await window.unisat?.switchChain?.('FRACTAL_BITCOIN_TESTNET');
        }
        // @ts-ignore
        const accounts = await window.unisat?.getAccounts?.();
        if (accounts.length === 0) {
          toast.error('Please login to your Unisat Wallet.');
        } else {
          setAddress(accounts[0]);
        }
      } catch (error) {
        console.error('Error interacting with Unisat Wallet:', error);
        toast.error('An error occurred while interacting with Unisat Wallet.');
      }
    };

    checkUnisatWallet();
  }, []);

  const disconnect = () => {
    setAddress(null);
  }

  const connect = async () => {
    try {
        // @ts-ignore
      const accounts = await window?.unisat?.getAccounts?.();
      if (accounts.length === 0) {
        toast.error('Please login to your Unisat Wallet.');
      } else {
        setAddress(accounts[0]);
      }
    } catch (error) {
      console.error('Error interacting with Unisat Wallet:', error);
      toast.error('An error occurred while interacting with Unisat Wallet.');
    }
  }

  return {
    address,
    connect,
    setAddress,
    disconnect,
  };
};

export default useUnisatWallet;
