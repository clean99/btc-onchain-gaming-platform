'use client'
import React from "react";
import { Button, Card, CardBody, CardFooter, Spinner } from "@nextui-org/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useFractalInscription } from "@/hooks/useFractalInscription";
import useUnisatWallet from "@/hooks/useUnisatWallet";

export default function Page() {
    const { address } =
        useUnisatWallet();
    const { data: inscriptions, loading: isLoading, error } = useFractalInscription(address ?? '', 0, 16);
    const router = useRouter();

    React.useEffect(() => {
        if (!isLoading && !address) {
            toast.error("Please connect your wallet first!");
            redirect("/");
        }
    }, [isLoading, address]);

    if (isLoading) {
        return <div className="flex flex-col items-center justify-center w-full min-h-screen bg-black p-4 sm:p-16"><Spinner color="primary" /></div>;
    }

    if (error) {
        return <div className="flex flex-col items-center justify-center w-full min-h-screen bg-black p-4 sm:p-16 text-white">Error loading inscriptions</div>;
    }

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-black p-4 sm:p-16">
            <div className="flex gap-12 w-full flex-col sm:flex-row justify-between">
                <div className="w-full flex flex-col gap-4 mt-16">
                    <h1 className="text-4xl font-bold text-white">My Inscriptions</h1>
                    <div className="gap-4 grid grid-cols-2 sm:grid-cols-4">
                        {
                            !inscriptions?.length ? <div className="text-white"> No inscriptions yet</div> : inscriptions.map((item, index) => (
                                <Card shadow="sm" key={index} className="bg-black">
                                    <CardBody className="overflow-visible p-0">
                                        <Image
                                            width={250}
                                            height={250}
                                            alt={item.collection_id}
                                            className="w-full object-cover"
                                            src={`/game/${item.collection_id}.png`}
                                        />
                                    </CardBody>
                                    <CardFooter className="text-small justify-start p-0 py-2">
                                        <Button size="sm" color="primary" variant="light" startContent={<Image src="/play.svg" alt="game icon" width={10} height={10} />} onClick={() => router.push(`/game/${item.collection_id}/${item.inscription_id}`)}>
                                            Play
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}