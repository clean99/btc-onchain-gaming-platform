'use client'
import { Button, Card, CardBody, CardFooter, Progress } from "@nextui-org/react"
import Image from "next/image"

enum GameStatus {
    Pending = "Pending",
    Started = "Started",
    Ended = "Ended",
}
const mockData = {
    id: "1",
    inscriptionId: "1",
    title: "Game Title",
    author: "Author",
    description: "Game Description",
    photo: "/game1.png",
    price: 0.001,
    status: GameStatus.Started,
    number: 1000,
    minted: 100,
    homepage: "https://example.com",
    mintedVariations: [ // inscription id
        "1",
        "2",
        "3",
        "4",
    ],
    rank: [
        {
            id: "1",
            name: "Player 1",
            score: 100,
        },
        {
            id: "2",
            name: "Player 2",
            score: 90,
        },
        {
            id: "3",
            name: "Player 3",
            score: 80,
        },
        {
            id: "4",
            name: "Player 4",
            score: 70,
        },
    
    ]
}

const list = [
    {
        id: 1,
        img: "/game2.png",
        inscriptionId: "1",
        gameInscriptionId: "1",
    },
    {
        id: 2,
        img: "/game2.png",
        inscriptionId: "2",
        gameInscriptionId: "1",
    },
    {
        id: 3,
        img: "/game2.png",
        inscriptionId: "3",
        gameInscriptionId: "1",
    },
    {
        id: 4,
        img: "/game2.png",
        inscriptionId: "4",
        gameInscriptionId: "1",
    }
];

export default function Page({ params : {gameId} }: { params: { gameId: string } }) {
    return <div className="gap-2 grid grid-cols-2 sm:grid-cols-3 w-full h-screen bg-black p-4 sm:p-16">
           <div className="flex flex-col gap-4 items-center border-white border-2 p-4 rounded-md">
            <div className="flex gap-4 flex-wrap justify-start w-full">
                <Image src={mockData.photo} alt="game" width={200} height={300} />
                <div className="flex flex-col gap-6 flex-grow">
                    <h1 className="text-white text-2xl font-bold">{mockData.title}</h1>
                    <p className="text-white text-sm">{mockData.description}</p>
                </div>
            </div>
                <div className="w-full">
                    <div className="flex flex-col gap-4 mt-4">
                            <div key={0} className="flex justify-between border-b border-white py-2">
                                <span className="text-white">Username</span>
                                <span className="text-white">Rank</span>
                                <span className="text-white">Score</span>
                            </div>
                        {mockData.rank.map((player, index) => (
                            <div key={player.id} className="flex justify-between border-b border-white py-2">
                                <span className="text-white">{player.name}</span>
                                <span className="text-white">{index + 1}</span>
                                <span className="text-white">{player.score}</span>
                            </div>
                        ))}
                    </div>
                </div>
           </div>
    </div>
}