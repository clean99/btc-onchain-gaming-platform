"use client";
import { createInscriptionAction } from "@/app/actions";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { BitcoinNetworkType, createInscription } from "sats-connect";

const contentType = "application/json"; 
const payloadType = "PLAIN_TEXT";


const suggestedMinerFeeRate = 10; // suggest a fee rate for the transaction in sats/byte

interface InscriptionButtonProps {
  appFee?: number;
  appFeeAddress?: string;
  variationId: string;
  gameId: string;
  receiveAddress: string;
}

const InscriptionButton: React.FC<InscriptionButtonProps> = ({ appFee = 1000, appFeeAddress = "2MtuQnXGukJhyahSVPLRyFwGxgpwaL6mrc3", variationId, gameId, receiveAddress }) => {
  const content = JSON.stringify({ gameId, variationId });
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
    //     onFinish: (response) => {
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

    const response = {
      txid: 'f30e558d8a4bfcae30fa6d72fadeb73b02f0b279400e6333cbd688a6920e3e17i0',
    }

    const form = new FormData();
          // @ts-ignore
          form.append('inscription_id', response.txid);
          form.append('collection_id', gameId);
          form.append('content', content);
          form.append('address', receiveAddress);

          createInscriptionAction(form);
  };

  return (
    <Button size="lg" color="primary" variant="light" startContent={<Image src="/fire.svg" alt="game icon" width={20} height={20} />} onClick={createInscriptionSubmit}>
        Mint
    </Button>
  );
};

export default InscriptionButton;

