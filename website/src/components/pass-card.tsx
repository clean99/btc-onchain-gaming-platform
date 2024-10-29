'use client'
import React from "react";
import {Card, CardBody, CardFooter, Image, Spinner} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { fetchCollections } from "@/app/lib/data";
import { Collection, GameStatus } from "@/types";
import { isPasscard } from "@/utils/utils";
import { useUnisatWallet } from "@/hooks/UnisatWalletContext";
import { toast } from "react-toastify";

export default function PassCard() {
    const router = useRouter();
    const [collection, setCollection] = React.useState<Collection>();
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const { address } = useUnisatWallet();
    React.useEffect(() => {
        fetchCollections().then((collections) => {
            const passcard = collections.find((item) => isPasscard(item));
            setCollection(passcard);
        }).finally(() => setIsLoading(false));
    }, []);

    return (
        <div style={{
            width: '320px',
            height: '240px',
        }}>
        {isLoading 
            ? <Spinner />
            : collection ? (
            <Card shadow="sm" isPressable={collection.status !== GameStatus.Pending} onPress={() => {
                address && router.push("/game/" + collection.collection_id);
                !address && toast.info("Please connect your wallet first!");
            }}>
            
            <CardBody className="overflow-visible p-0" >
                <Image
                width="100%"
                alt={collection.name}
                className="w-full object-cover"
                src={`/game/48c54a857432475daea6fe5da1013525094054e4fc717fd7b38fad1b5611436ai0.png`}
                />
            </CardBody>
            </Card>
            ) : null
        }
        </div>
    );
}
