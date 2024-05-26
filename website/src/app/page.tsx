"use client";
import React, { useEffect } from "react";
import InscriptionButton from "@/components/create-inscription";
import {useInscription} from "@/hooks/useInscription";
import { Logo } from "@/components/logo";
import Image from "next/image";
import BackgroundContainer from "@/components/background-container";
import Cards from "@/components/card";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center w-full h-screen bg-black p-16 xl:p-96" style={{height: `calc(100vh - 64px)`}}>
        <Logo style={{ width: "60%" }} />
        <div className="text-center text-xl mt-8" style={{
          color: 'rgba(182, 182, 182, 1)'
        }}>
        Transform game issuance through coded generative art.
        </div>
      </div>
      <div className="w-full h-screen p-16 bg-orange-400">
       <div className="flex flex-col gap-4">
        <div className="flex">
          <div className="text-white flex flex-col gap-4">
            <h1 className="text-4xl font-bold">
                SEASON I
              </h1>
              <div>
                Explore six curated games, each perfectly designed. 
              </div>
              <div>
                Mint and own a unique gaming experience.
              </div>
          </div>
          <Image src="/btc.svg" alt="btc" width={138} height={138} />
        </div>
        <Cards />
        </div>
      </div>
      <div className="flex flex-col items-start justify-start w-full h-screen bg-black p-16 sm:p-72" style={{
        backgroundImage: "url('/section3.svg')",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
      
      }}>
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-6xl font-bold text-white">
            LEADER BOARD
          </h1>
          <div className="text-center text-xl mt-8" style={{
            color: 'rgba(182, 182, 182, 1)'
          }}>
          See where you stand. Track top players and climb the rankings!
          </div>
          <div className="flex align-center gap-4" style={{
            color: 'rgba(182, 182, 182, 1)'
          }}>
          Reveal Soon <Image src="/section3-logo.svg" alt="soon" width={14} height={14} />
          </div>
        </div>
      </div>
    </main>
  );
}
