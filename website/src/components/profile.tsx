"use client";
import {Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import {ChevronDownIcon} from './down-arrow';
import { useReactWalletStore } from 'btc-connect/dist/react';

const AddressButton = () => {
  const { disconnect, address, setModalVisible } = useReactWalletStore();

  return (<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '180px'}}>
    {
        address ? (
            // 省略号表示省略的部分
        <Dropdown placement="bottom-end" className="w-full">
        <DropdownTrigger>
          <Button isIconOnly className="w-full">
             <div className='mr-2'>
             {address.slice(0, 4) + '...' + address.slice(-4)}
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
            <Button onClick={() => setModalVisible(true)} className="w-full">
              Connect Wallet
            </Button>
          )
    }
  </div>)
};

export default AddressButton;
