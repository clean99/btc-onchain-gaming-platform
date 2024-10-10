"use client";
import {Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import {ChevronDownIcon} from './down-arrow';
import { useReactWalletStore, WalletConnectReact } from 'btc-connect/dist/react';
import "btc-connect/dist/style/index.css";


const config = {
  network: 'testnet', // or 'testnet'
  defaultConnectorId: 'unisat', // or 'okx'
};

const AddressButton = () => {
  const walletStore = useReactWalletStore();

  const disconnect = () => {
    walletStore.disconnect();
  };

  return (<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '180px'}}>
    {
        walletStore.address ? (
            // 省略号表示省略的部分
        <Dropdown placement="bottom-end" className="w-full">
        <DropdownTrigger>
          <Button isIconOnly className="w-full">
             <div className='mr-2'>
             {walletStore.address.slice(0, 4) + '...' + walletStore.address.slice(-4)}
             </div>
            <ChevronDownIcon  />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Merge options"
          selectionMode="single"
          className="max-w-[160px]"
        >
          <DropdownItem key="merge" onClick={() => {
            disconnect();
          }}>
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
          ) : (
            <WalletConnectReact
              // @ts-ignore
              config={config}
              onConnectSuccess={(btcWallet) => {
                // Handle successful connection
                console.log(btcWallet);
              }}
              theme="dark"
              onConnectError={(error) => {
                // Handle connection error
              }}
              onDisconnectSuccess={() => {
                // Handle successful disconnection
              }}
              onDisconnectError={(error) => {
                // Handle disconnection error
              }}
            />
          )
    }
  </div>)
};

export default AddressButton;
