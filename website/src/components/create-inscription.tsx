"use client";
import { createInscriptionAction } from "@/app/lib/actions";
import { useAuthStore } from "@/states/auth";
import { getScreenShot } from "@/utils/getScreenShot";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { BitcoinNetworkType, createInscription } from "sats-connect";

const contentType = "application/json";
const payloadType = "PLAIN_TEXT";
const suggestedMinerFeeRate = 11;

interface InscriptionButtonProps {
  appFee?: number;
  appFeeAddress?: string;
  variationId: string;
  gameId: string;
  receiveAddress: string;
  refresh: (txid: string) => void;
  startMinting: () => void;
}

const InscriptionButton: React.FC<InscriptionButtonProps> = ({ appFee = 1000, appFeeAddress = "2MtuQnXGukJhyahSVPLRyFwGxgpwaL6mrc3", variationId, gameId, receiveAddress, refresh, startMinting }) => {
  const content = JSON.stringify({ gameId, variationId });
  const address = useAuthStore((state) => state.address);
  const createInscriptionSubmit = async () => {
    // const res = await createInscription({
    //     payload: {
    //       network: {
    //         type: BitcoinNetworkType.Testnet,
    //       },
    //       contentType,
    //       content,
    //       payloadType,
    //       appFeeAddress,
    //       appFee: 1500,
    //       suggestedMinerFeeRate,
    //     },
    //     onFinish: (response: {
    //       txid: string;
    //     }) => {
    //       const form = new FormData();
    //       // @ts-ignore
    //       form.append('inscription_id', response.txid);
    //       form.append('collection_id', gameId);
    //       form.append('content', content);
    //       form.append('address', receiveAddress);

    //       createInscriptionAction(form);
    //     },
    //     onCancel: () => alert("Canceled"),
    //   });

    startMinting();
    const mockData = {
      id: 1,
      collection_id: gameId,
      inscription_id: variationId,
      content,
      img_url: await getScreenShot(),
    };

    const response = {
      txid: 'f30e558d8a4bfcae30fa6d72fadeb73b02f0b279400e6333cbd688a6920e3e17',
    }

    const form = new FormData();
          // // @ts-ignore
          // form.append('inscription_id', response.txid);
          // form.append('collection_id', gameId);
          // form.append('content', content);
          // form.append('address', receiveAddress);

          form.append('inscription_id', mockData.inscription_id);
          form.append('collection_id', mockData.collection_id);
          form.append('content', JSON.stringify(mockData.content));
          form.append('address', receiveAddress);
          form.append('img_url', mockData.img_url);

      await createInscriptionAction(form);
      refresh(response.txid);
  };

  return (
    <Button disabled={!address} isDisabled={!address} size="lg" color="primary" variant="light" startContent={<Image src="/fire.svg" alt="game icon" width={20} height={20} />} onClick={createInscriptionSubmit}>
        Mint
    </Button>
  );
};

export default InscriptionButton;
