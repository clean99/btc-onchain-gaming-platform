'use client'
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const useUnisatWallet = () => {
  const [address, setAddress] = useState<string | null>(null);

  const disconnect = () => {
    setAddress(null);
  }

  const connect = async () => {
    try {
        // @ts-ignore
      let accounts = await window?.unisat?.getAccounts?.();
      if (accounts.length === 0) {
        // @ts-ignore
        accounts = await window?.unisat?.requestAccounts?.();
      }
      setAddress(accounts[0]);
    } catch (error) {
      console.error('Error interacting with Unisat Wallet:', error);
      toast.error('An error occurred while interacting with Unisat Wallet.');
    }
  }

  useEffect(() => {
    const checkUnisatWallet = async () => {
        if (typeof window === "undefined") {
            // Client-side-only code
            return;
        }
        // @ts-ignore
      if (typeof window.unisat === 'undefined') {
        toast.error('Please install the Unisat Wallet.');
        return;
      }
      // @ts-ignore
      const chain = (await window.unisat?.getChain?.())?.enum;
        if (chain !== 'FRACTAL_BITCOIN_TESTNET') {
            // @ts-ignore
            await window.unisat?.switchChain?.('FRACTAL_BITCOIN_TESTNET');
        }
    };

    checkUnisatWallet();
  }, []);

  return {
    address,
    connect,
    setAddress,
    disconnect,
  };
};

export default useUnisatWallet;
