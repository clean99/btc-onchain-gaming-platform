import React from "react";
import {Link} from "@nextui-org/link";

export const InscriptionIdLink = ({ inscriptionId, isProd }: { inscriptionId: string, isProd?: boolean }) => {
    return <Link isExternal href={isProd ? `https://ordinals.com/inscription${inscriptionId}`: `https://testnet-explorer.ordinalsbot.com/tx/${inscriptionId}`} target="_blank" showAnchorIcon className="text-blue-600">
        <span className="break-words w-full">{inscriptionId}</span>
    </Link>;
}