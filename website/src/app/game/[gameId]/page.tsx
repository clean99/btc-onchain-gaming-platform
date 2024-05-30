"use client";
import { fetchCollection, fetchInscriptions } from "@/app/lib/data";
import InscriptionButton from "@/components/create-inscription";
import { Collection, Inscription } from "@/types";
import { Button, Card, CardBody, CardFooter, Progress } from "@nextui-org/react"
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params : {gameId} }: { params: { gameId: string } }) {
    const router = useRouter();

    const [collection, setCollection] = useState<Collection>();
    const [inscriptions, setInscriptions] = useState<Inscription[]>([]);
    useEffect(() => {
        fetchCollection(gameId).then(setCollection);
        fetchInscriptions(gameId).then(setInscriptions);
    }, [gameId]);
    
    return <div className="flex flex-col items-center w-full min-h-screen bg-black p-4 sm:p-16 ">
        {/* description */}
        <div className="flex gap-12 w-full flex-col sm:flex-row justify-between">
            {/* game photo */}
            <div>
                <Image src={`/game/${collection?.id}.png`} alt={collection?.name ?? ''} width={600} height={600} />
                <div className="flex flex-row justify-between">
                <Button size="lg" color="primary" variant="light" startContent={<Image src="/flash.svg" alt="game icon" width={20} height={20} />}>
                    Randomize
                </Button>
                <Button size="lg" color="primary" variant="light" startContent={<Image src="/play.svg" alt="game icon" width={20} height={20} />}>
                    Play
                </Button>
                <InscriptionButton gameId={collection?.collection_id ?? ''} variationId="1" receiveAddress={'tb1pe3snlln0x3ah77ewn4r30fqyl40lx03srhkp64nqlunueugmtprq96ruyf'} />
                <Button size="lg" color="primary" variant="light" startContent={<Image src="/fire.svg" alt="game icon" width={20} height={20} />}>
                    Reload  
                </Button>
               </div>
            </div>
            <div className="flex flex-col gap-6 flex-grow">
                <h1 className="text-4xl font-bold text-white">{collection?.name} <span className="text-sm font-light">BY: {collection?.author}</span></h1>
                <div>
                 <Progress aria-label="Loading..." value={inscriptions?.length} maxValue={collection?.number} className="max-w-md" size="lg" />
                 <span className="text-sm font-light text-white">{inscriptions?.length} / {collection?.number} minted</span>
                </div>
                <div className="text-white">
                    Inscription ID: {collection?.collection_id}
                </div>
                <div className="text-white">
                    Mint Price: {collection?.price ? collection?.price + 'Sats' : 'Free'}
                </div>
                <div className="text-white">
                    Current Phrase: {collection?.status}
                </div>
                <div className="text-white">
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
            {inscriptions.map((item, index) => (
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