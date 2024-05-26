"use client";
import React from "react";
import {Card, CardBody, CardFooter, CardHeader, Image} from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Cards() {
    const router = useRouter();
    const list = [
        {
            id: 1,
            title: "SKYWIRE",
            img: "/game2.png",
        },
        {
            id: 2,
            title: "SPIED POKER",
            img: "/game3.png",
        },
    ];

    return (
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {list.map((item, index) => (
            <Card shadow="sm" key={index} isPressable onPress={() => {
                router.push("/game/" + item.id);
            }}>
            <CardBody className="overflow-visible p-0">
                <Image
                width="100%"
                alt={item.title}
                className="w-full object-cover"
                src={item.img}
                />
            </CardBody>
            <CardFooter className="text-small justify-between">
                <p className="text-default-500">{item.title}</p>
            </CardFooter>
            </Card>
        ))}
        </div>
    );
}
