"use client";
import { useLocalStorage } from 'usehooks-ts'; 
import {AddressPurpose, RpcErrorCode, request} from "sats-connect";
import {Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import {ChevronDownIcon} from './down-arrow';
import WalletIcon from './wallet';
import { toast } from "react-toastify";
import { useAuthStore } from '@/states/auth';


const AddressButton = () => {
  const [address, setAddress, removeAddress] = useAuthStore((state) => [state.address, state.setAddress, state.removeAddress]);
  const connect = async () => {
    try {
      const response = await request('getAccounts', {
        purposes: [AddressPurpose.Payment, AddressPurpose.Ordinals],
        message: 'Cool app wants to know your addresses!',
      });
      console.log("getAccounts ~ response:", response)
      if (response.status === 'success') {
        const paymentAddressItem = response.result.find(
          (address) => address.purpose === AddressPurpose.Payment
        );
        const ordinalsAddressItem = response.result.find(
          (address) => address.purpose === AddressPurpose.Ordinals
        );
        if(!paymentAddressItem || !ordinalsAddressItem) {
            throw new Error('Missing address');
        }
        setAddress([paymentAddressItem?.address, ordinalsAddressItem?.address]);
      } else {
        if (response.error.code === RpcErrorCode.USER_REJECTION) {
          // handle user cancellation error
        } else {
          // handle error
        }
      }
    } catch (err: any) {
        toast.error(err.error.message);
    }
  }

  return (<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '180px'}}>
    {
        address ? (
            // 省略号表示省略的部分
        <Dropdown placement="bottom-end" className="w-full">
        <DropdownTrigger>
          <Button isIconOnly className="w-full">
             <div className='mr-2'>
             {address[0].slice(0, 4) + '...' + address[0].slice(-4)}
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
            removeAddress();
          }}>
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
          ) : (
            <Button variant="bordered" startContent={
                <WalletIcon />
            } onClick={() => connect()}>Connect Address</Button>
          )
    }
  </div>)
};

export default AddressButton;
