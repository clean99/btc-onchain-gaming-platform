import React from "react";
import {Link} from "@nextui-org/link";

export const InscriptionIdLink = ({ inscriptionId, isProd }: { inscriptionId: string, isProd?: boolean }) => {
    return <Link isExternal href={isProd ? `https://ordinals.fractalbitcoin.io/content/${inscriptionId}`: `https://ordinals.fractalbitcoin.io/content/${inscriptionId}`} target="_blank" showAnchorIcon className="text-blue-600 w-full lg:max-w-[550px]">
        <span className="break-words w-full">{inscriptionId}</span>
    </Link>;
}