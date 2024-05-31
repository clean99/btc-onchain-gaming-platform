"use client";
import { createInscriptionAction } from "@/app/lib/actions";
import { useAuthStore } from "@/states/auth";
import { getScreenShot } from "@/utils/getScreenShot";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { BitcoinNetworkType, createInscription } from "sats-connect";
import { toast } from "react-toastify";
const contentType = "application/json";
const payloadType = "PLAIN_TEXT";
const suggestedMinerFeeRate = 11;

interface InscriptionButtonProps {
  appFee?: number;
  appFeeAddress?: string;
  variationId: string;
  gameId: string;
  receiveAddress: string;
  refresh: (txid?: string) => void;
  startMinting: () => void;
}

const InscriptionButton: React.FC<InscriptionButtonProps> = ({ appFee = 0, appFeeAddress = "2MtuQnXGukJhyahSVPLRyFwGxgpwaL6mrc3", variationId, gameId, receiveAddress, refresh, startMinting }) => {
  const content = JSON.stringify({ gameId, variationId });
  const address = useAuthStore((state) => state.address);
  console.log(appFee, appFeeAddress, variationId, gameId, receiveAddress, content);
  const createInscriptionSubmit = async () => {
    createInscription({
        payload: {
          network: {
            type: BitcoinNetworkType.Testnet,
          },
          contentType,
          content,
          payloadType,
          appFeeAddress: appFee === 0 ? undefined : appFeeAddress,
          appFee: appFee === 0 ? undefined : appFee,
          suggestedMinerFeeRate,
        },
        // @ts-ignore
        onFinish: async (response: {
          txId: string;
        }) => {
          try {
            startMinting();
            const form = new FormData();
            // // @ts-ignore
            form.append('inscription_id', response.txId);
            form.append('collection_id', gameId);
            form.append('content', content);
            form.append('address', receiveAddress);
            form.append('img_url', await getScreenShot());
            await createInscriptionAction(form);
            refresh(response.txId);
          } catch (error: any) {
            toast.error(error?.message);
          }
        },
        onCancel: () => {
          toast.info("Transaction Cancelled!");
          // refresh();
        }
      });
  };

  return (
    <Button disabled={!address} isDisabled={!address} size="lg" color="primary" variant="light" startContent={<Image src="/fire.svg" alt="game icon" width={20} height={20} />} onClick={createInscriptionSubmit}>
        Mint
    </Button>
  );
};

export default InscriptionButton;
