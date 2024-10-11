'use client'
import { fetchCollection, fetchInscriptions } from "@/app/lib/data";
import InscriptionButton from "@/components/create-inscription";
import { InscriptionIdLink } from "@/components/inscriptionid-link";
import { MintLoadingDrawer } from "@/components/mint-loading-drawer";
import { RECEIVE_ADDRESS } from "@/constants";
import { useGameHtml } from "@/hooks/useGameHtml";
import useUnisatWallet from "@/hooks/useUnisatWallet";
import { Collection, GameStatus, Inscription } from "@/types";
import { Button, Card, CardBody, CardFooter, Progress, Spinner, useDisclosure } from "@nextui-org/react"
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function Page({ params : {gameId} }: { params: { gameId: string } }) {
    const router = useRouter();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [collection, setCollection] = useState<Collection>();
    const [inscriptions, setInscriptions] = useState<Inscription[]>([]);
    const [currentInscriptionId, setCurrentInscriptionId] = useState<string>(uuidv4());
    const [refreshSignal, setRefreshSignal] = useState<number>(0);
    const [isMinting, setIsMinting] = useState<boolean>(false);
    const [txid, setTxid] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const gameHtml = useGameHtml(gameId, currentInscriptionId);
    const iframeRef = useRef(null);
    const { address } = useUnisatWallet();


    const refresh = (txid?: string) => {
        setIsLoading(true);
        setCurrentInscriptionId(uuidv4());
        setRefreshSignal(refreshSignal + 1);
        setIsMinting(false);
        if (txid) {
            setTxid(txid);
        }
    }

    const startMinting = () => {
        setIsMinting(true);
        onOpen();
    }

    useEffect(() => {
        // Function to stop propagation of keyboard events on the parent page
        const stopPropagation = (e: KeyboardEvent) => {
        e.stopPropagation();
        };

        const handleKeyDown = (event: any) => {
            const key = event.key;
            if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
              event.preventDefault();
              event.stopPropagation();
            }
        };
      
        window.addEventListener('keydown', handleKeyDown);

        // Add event listeners to the parent document
        window.addEventListener('keydown', stopPropagation, true);
        window.addEventListener('keyup', stopPropagation, true);
        window.addEventListener('keypress', stopPropagation, true);

        // Ensure cleanup on component unmount
        return () => {
        window.removeEventListener('keydown', stopPropagation, true);
        window.removeEventListener('keyup', stopPropagation, true);
        window.removeEventListener('keypress', stopPropagation, true);
        window.removeEventListener('keydown', handleKeyDown);
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
    useEffect(() => {
        fetchCollection(gameId).then(setCollection);
        fetchInscriptions(gameId).then(setInscriptions).finally(() => setIsLoading(false));
    }, [gameId, refreshSignal]);
    

    if(isLoading) {
        return <div className="flex flex-col items-center w-full h-screen bg-black p-4 sm:p-16">
            <Spinner />
        </div>
    }
    
    return <div className="flex flex-col items-center w-full min-h-screen bg-black p-4 sm:p-16 ">
        <MintLoadingDrawer isMinting={isMinting} title={isMinting ? "Minting..." : "Mint Result"} description={isMinting ? "Please wait for a moment..." : <>
            {
                `Minted successfully! Your inscription id is:`} <InscriptionIdLink inscriptionId={txid} />{`. You can play the game on the platform right now. It might take some time to sync to your wallet.`
            }
        </>} isOpen={isOpen} onOpenChange={onOpenChange} />
        
        {/* description */}
        <div className="flex gap-12 w-full flex-col lg:flex-row justify-between flex-wrap items-center md:items-start">
            {/* game photo */}
            <div>
            <div className="flex flex-col">
                 {/* @ts-ignore */}
                <iframe srcDoc={gameHtml} ref={iframeRef} className="h-[360px] w-[360px] lg:h-[600px] lg:w-[600px] border-white border-2 rounded-lg" />
                
            </div>
            <div className="flex flex-row justify-between">
                <Button size="lg" color="primary" variant="light" startContent={<Image src="/flash.svg" alt="game icon" width={20} height={20} />} onClick={() => {
                    setCurrentInscriptionId(uuidv4());
                }}>
                    Randomize
                </Button>
                <InscriptionButton startMinting={startMinting} refresh={refresh} gameId={collection?.collection_id ?? ''} variationId={currentInscriptionId} receiveAddress={address?.[1] ?? '' as string} appFeeAddress={RECEIVE_ADDRESS} appFee={collection?.price} />
               </div>
            </div>
            <div className="flex flex-col gap-6 flex-grow w-full lg:w-[600px]">
                <h1 className="text-4xl font-bold text-white">{collection?.name} <span className="text-sm font-light">BY: {collection?.author}</span></h1>
                <div>
                 <Progress aria-label="Loading..." value={inscriptions?.length} maxValue={collection?.number} className="max-w-md" size="lg" />
                 <span className="text-sm font-light text-white">{inscriptions?.length} / {collection?.number} minted</span>
                </div>
                <div className="text-white">
                    Inscription ID: <InscriptionIdLink inscriptionId={collection?.collection_id ?? ''} isProd={true} />
                </div>
                <div className="text-white">
                    Mint Price: {collection?.price ? collection?.price + 'Sats' : 'Free'}
                </div>
                <div className="text-white">
                    Current Phrase: {collection?.status === GameStatus.Pending ? 'Pending' : collection?.status === GameStatus.Started ? 'Live' : 'Completed'}
                </div>
                <div className="text-white max-w-[500px] lg:max-w-[680px]">
                    Description: {collection?.description}
                </div>
                <div className="text-white">
                    Homepage: <a href={collection?.homepage} target="_blank" rel="noreferrer">{collection?.homepage}</a>
                </div>
            </div>
            
        </div>
        <div className="w-full flex flex-col gap-4 mt-16">
            <h1 className="text-4xl font-bold text-white">Minted Variations</h1>
            <div className="gap-4 grid grid-cols-2 sm:grid-cols-4">
            { isLoading
             ? <Spinner />
                : inscriptions.map((item, index) => (
                <Card shadow="sm" key={index} className="bg-black">
                <CardBody className="overflow-visible p-0">
                    <Image
                     width={250}
                     height={250}
                    alt={item.inscription_id}
                    className="w-full object-cover"
                    src={item.img_url}
                    />
                </CardBody>
                <CardFooter className="text-small justify-start p-0 py-2">
                    <Button size="sm" color="primary" variant="light" startContent={<Image src="/play.svg" alt="game icon" width={10} height={10} />} onClick={() => router.push(`/game/${gameId}/${item.inscription_id}`)}>
                        Play
                    </Button>
                </CardFooter>
                </Card>
            ))}
        </div>
        </div>
    </div>
}