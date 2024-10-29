"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface UnisatWalletContextType {
  address: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

interface ProviderProps {
    children: React.ReactNode;
  }
  

const UnisatWalletContext = createContext<UnisatWalletContextType | undefined>(undefined);

export const UnisatWalletProvider: React.FC<ProviderProps> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);

  const disconnect = () => {
    setAddress(null);
  };

  const connect = async () => {
    try {
      // @ts-ignore
      const accounts = await window?.unisat?.requestAccounts?.();
      setAddress(accounts[0]);
    } catch (error) {
      console.error('Error interacting with Unisat Wallet:', error);
      toast.error('Please install latest version of Unisat Wallet.');
    }
  };

  useEffect(() => {
    const checkUnisatWallet = async () => {
      if (typeof window === "undefined") {
        // Client-side-only code
        return;
      }
      // @ts-ignore
      if (typeof window.unisat === 'undefined') {
        toast.error('Please install latest version of Unisat Wallet.');
        return;
      }
      // @ts-ignore
      const chain = (await window.unisat?.getChain?.())?.enum;
      if (chain !== 'FRACTAL_BITCOIN') {
        // @ts-ignore
        await window.unisat?.switchChain?.('FRACTAL_BITCOIN');
      }
    };

    checkUnisatWallet();
  }, []);

  return (
    <UnisatWalletContext.Provider value={{ address, connect, disconnect }}>
      {children}
    </UnisatWalletContext.Provider>
  );
};

export const useUnisatWallet = () => {
  const context = useContext(UnisatWalletContext);
  if (!context) {
    throw new Error('useUnisatWallet must be used within a UnisatWalletProvider');
  }
  return context;
};