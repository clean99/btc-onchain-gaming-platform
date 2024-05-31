"use client";
import React, { useContext, useEffect, useLayoutEffect } from "react";
import { SkeletonCardGroup } from "@/components/skeleton";
import useLocalStorage from "@/utils/storage";
import { Button, Card, CardBody, CardFooter, Progress, Spinner } from "@nextui-org/react"
import Image from "next/image"
import { redirect, useRouter } from "next/navigation";
import { fetchMineInscriptions } from "../lib/actions";
import { Inscription } from "@/types";
import { toast } from "react-toastify";
import { useAuthStore } from "@/states/auth";
export default function Page() {
    const [address] = useAuthStore((state) => [state.address]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [inscriptions, setInscriptions] = React.useState<Inscription[]>([]);

    useEffect(() => {
        setTimeout(() => {
            if (!isLoading && !address) {
                toast.error("Please connect your wallet first!");
                redirect("/");
            }
        });
    }, [isLoading]);

    useEffect(() => {
        fetchMineInscriptions(address?.[1] ?? '').then(setInscriptions).finally(() => setIsLoading(false));
    }, [address]);
    const router = useRouter();

    if(isLoading) {
        return <div className="flex flex-col items-center justify-center  w-full min-h-screen bg-black p-4 sm:p-16 "><Spinner color="primary" /></div>
    }


    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-black p-4 sm:p-16 ">
        {/* description */}
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
                    alt={item.inscription_id}
                    className="w-full object-cover"
                    src={item.img_url}
                    />
                </CardBody>
                <CardFooter className="text-small justify-start p-0 py-2">
                    <Button size="sm" color="primary" variant="light" startContent={<Image src="/play.svg" alt="game icon" width={10} height={10} />} onClick={() => router.push(`/game/${item.collection_id}/${item.inscription_id}`)}>
                        Play
                    </Button>
                </CardFooter>
                </Card>
            ))}
        </div>
        </div>
        </div>
        </div>
    );
}