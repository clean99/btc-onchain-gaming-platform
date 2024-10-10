'use client'
import React from "react";
import {Card, CardBody, CardFooter, Image, Spinner} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { fetchCollections } from "@/app/lib/data";
import { Collection, GameStatus } from "@/types";

export default function PassCard() {
    const router = useRouter();
    const [collection, setCollection] = React.useState<Collection>();
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    React.useEffect(() => {
        fetchCollections().then((collections) => {
            const passcard = collections.find((item) => item.name === 'Passcard');
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
                router.push("/game/" + collection.collection_id);
            }}>
            
            <CardBody className="overflow-visible p-0" >
                <Image
                width="100%"
                alt={collection.name}
                className="w-full object-cover"
                src={`/game/6c43433d861400abcbc848635db53f33a740eb30aff6bc7733937f5c09356191i0.png`}
                />
            </CardBody>
            </Card>
            ) : null
        }
        </div>
    );
}
