'use client'
import React, { useEffect, useRef } from "react";
import { useGameHtml } from "@/hooks/useGameHtml";
import { InscriptionIdLink } from "@/components/inscriptionid-link";

export default function Page({ params }: { params: { gameId: string, variationId: string } }) {
    const gameHtml = useGameHtml(params.gameId, params.variationId);
    const iframeRef = useRef(null);
    useEffect(() => {
      const handleFocus = () => {
          document.body.style.overflow = 'hidden';
      };

      const handleBlur = () => {
          document.body.style.overflow = '';
      };

      const iframe = iframeRef.current;
      if (iframe) {
          // @ts-ignore
          iframe.onload = () => {
              // @ts-ignore
              iframe.contentWindow.focus();
          };
          // @ts-ignore
          iframe.contentWindow.addEventListener('focus', handleFocus);
          // @ts-ignore
          iframe.contentWindow.addEventListener('blur', handleBlur);
      }

      return () => {
          if (iframe) {
              // @ts-ignore
              iframe.contentWindow.removeEventListener('focus', handleFocus);
              // @ts-ignore
              iframe.contentWindow.removeEventListener('blur', handleBlur);
          }
      };
  }, [iframeRef.current]);


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