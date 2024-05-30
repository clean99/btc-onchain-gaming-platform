"use client";
import React from "react";
import {Card, CardBody, CardFooter, CardHeader, Image} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { fetchCollections } from "@/app/lib/data";
import { Collection, GameStatus } from "@/types";


export default function Cards() {
    const router = useRouter();
    const [collections, setCollections] = React.useState<Collection[]>([]);
    React.useEffect(() => {
        fetchCollections().then(setCollections);
    }, []);

    return (
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {collections.map((item: Collection, index: number) => (
            <Card shadow="sm" key={index} isPressable onPress={() => {
                router.push("/game/" + item.collection_id);
            }}>
            <CardBody className="overflow-visible p-0">
                <Image
                width="100%"
                alt={item.name}
                className="w-full object-cover"
                src={`/game/${item.id}.png`}
                />
            </CardBody>
            <CardFooter className="text-small justify-between">
                <p className="text-default-500">{item.name}</p>
            </CardFooter>
            </Card>
        ))}
        </div>
    );
}
