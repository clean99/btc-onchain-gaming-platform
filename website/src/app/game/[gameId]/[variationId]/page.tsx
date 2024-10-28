'use client'
import React, { useEffect, useRef } from "react";
import { useGameHtml } from "@/hooks/useGameHtml";
import { InscriptionIdLink } from "@/components/inscriptionid-link";

export default function Page({ params }: { params: { gameId: string, variationId: string } }) {
    const gameHtml = useGameHtml(params.gameId, params.variationId);
    const iframeRef = useRef(null);

  useEffect(() => {
    // Function to stop propagation of keyboard events on the parent page
    const stopPropagation = (e: KeyboardEvent) => {
      e.stopPropagation();
    };

    // Add event listeners to the parent document
    document.addEventListener('keydown', stopPropagation, true);
    document.addEventListener('keyup', stopPropagation, true);
    document.addEventListener('keypress', stopPropagation, true);

    // Ensure cleanup on component unmount
    return () => {
      document.removeEventListener('keydown', stopPropagation, true);
      document.removeEventListener('keyup', stopPropagation, true);
      document.removeEventListener('keypress', stopPropagation, true);
    };
  }, []);

  useEffect(() => {
    // Focus the iframe to ensure it receives keyboard events
    const iframe = iframeRef.current;
    if (iframe) {
        // @ts-ignore
      iframe.onload = () => {
        // @ts-ignore
        iframe.contentWindow.focus();
      };
    }
  }, []);

    return (
        <div className="flex flex-col justify-center items-center w-full h-screen bg-black p-4 sm:p-12">
                <div className="text-white text-2xl font-bold">
                    TxID: <InscriptionIdLink inscriptionId={params.variationId} />
                </div>
                  {/* @ts-ignore */}
                <iframe srcDoc={gameHtml} ref={iframeRef} className="w-full h-full mt-2 max-w-[800px] max-h-[800px]" />
               
            </div>
    );
}