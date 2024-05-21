"use client";
import { createInscriptionAction } from "@/app/actions";
import { Button } from "@nextui-org/react";
import { BitcoinNetworkType, createInscription } from "sats-connect";

const contentType = "text/html"; 
const content = "My inscription text";
const payloadType = "PLAIN_TEXT";

const suggestedMinerFeeRate = 10; // suggest a fee rate for the transaction in sats/byte

interface InscriptionButtonProps {
  appFee?: number;
  appFeeAddress?: string;
  content: object;
  collectionId: string;
  address: string;
}

const InscriptionButton: React.FC<InscriptionButtonProps> = ({ appFee = 1000, appFeeAddress = "2MtuQnXGukJhyahSVPLRyFwGxgpwaL6mrc3", content = {
    token: "my-token",
}, collectionId, address}) => {
  const createInscriptionSubmit = async () => {
    // const res = await createInscription({
    //     payload: {
    //       network: {
    //         type: BitcoinNetworkType.Testnet,
    //       },
    //       contentType,
    //       content: JSON.stringify(content),
    //       payloadType,
    //       appFeeAddress,
    //       appFee,
    //       suggestedMinerFeeRate,
    //     },
    //     onFinish: (response) => {
    //       alert(response.txId);
    //     },
    //     onCancel: () => alert("Canceled"),
    //   });

    // mock data
    const res = {
      txid: 'f30e558d8a4bfcae30fa6d72fadeb73b02f0b279400e6333cbd688a6920e3e17i0',
      status: 'success',
      error: null,
    }
      const form = new FormData();
      // @ts-ignore
      form.append('inscription_id', res.txid);
      form.append('collection_id', collectionId);
      form.append('content', JSON.stringify(content));
      form.append('address', address);

    await createInscriptionAction(form);
  };

  return (
    <Button onClick={createInscriptionSubmit}>
        Create Inscription
    </Button>
  );
};

export default InscriptionButton;

