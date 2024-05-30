"use client";
import React, { useEffect, useRef } from "react";
import { useGameHtml } from "@/hooks/useGameHtml";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import InscriptionButton from "@/components/create-inscription";

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
        <div className="flex flex-col items-center w-full h-screen bg-black p-4 sm:p-12">
        {/* @ts-ignore */}
            <iframe srcDoc={gameHtml} ref={iframeRef} className="w-full h-full border-white border-2 rounded-lg" />
            {/* <div className="flex gap-12 items-center">
                <Button size="lg" color="primary" variant="light" startContent={<Image src="/flash.svg" alt="game icon" width={20} height={20} />}>
                    Reload
                </Button>
            </div> */}
        </div>
    );
}