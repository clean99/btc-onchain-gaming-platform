'use client'
import React, { useEffect, useRef } from "react";
import { useGameHtml } from "@/hooks/useGameHtml";
import { InscriptionIdLink } from "@/components/inscriptionid-link";

export default function Page({ params }: { params: { gameId: string, variationId: string } }) {
    const gameHtml = useGameHtml(params.gameId, params.variationId);
    const iframeRef = useRef(null);

    return (
        <div className="flex flex-col justify-center items-center w-ful bg-black p-4 sm:p-12" style={{ height: 'calc(100vh - 64px)' }}>
                <div className="text-white text-2xl font-bold">
                    Inscription ID: <InscriptionIdLink inscriptionId={params.variationId} />
                </div>
                  {/* @ts-ignore */}
                <iframe srcDoc={gameHtml} ref={iframeRef} className="w-full h-full mt-2 max-w-[800px] max-h-[800px]" />
               
            </div>
    );
}