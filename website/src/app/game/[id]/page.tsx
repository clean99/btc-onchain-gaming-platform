"use client";
import { Button, Card, CardBody, CardFooter, Progress } from "@nextui-org/react"
import Image from "next/image"
import { useRouter } from "next/navigation";

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

export default function Page({ params }: { params: { id: string } }) {
    const router = useRouter();
    return <div className="flex flex-col items-center w-full h-screen bg-black p-4 sm:p-16 ">
        {/* description */}
        <div className="flex gap-12 w-full flex-col sm:flex-row justify-between">
            {/* game photo */}
            <div>
                <Image src={mockData.photo} alt={mockData.title} width={600} height={600} />
                <div className="flex flex-row justify-between">
                <Button size="lg" color="primary" variant="light" startContent={<Image src="/flash.svg" alt="game icon" width={20} height={20} />}>
                    Randomize
                </Button>
                <Button size="lg" color="primary" variant="light" startContent={<Image src="/play.svg" alt="game icon" width={20} height={20} />}>
                    Play
                </Button>
                <Button size="lg" color="primary" variant="light" startContent={<Image src="/fire.svg" alt="game icon" width={20} height={20} />}>
                    Reload  
                </Button>
                </div>
            </div>
            <div className="flex flex-col gap-6 flex-grow">
                <h1 className="text-4xl font-bold text-white">{mockData.title} <span className="text-sm font-light">BY: {mockData.author}</span></h1>
                <div>
                 <Progress aria-label="Loading..." value={mockData.minted} maxValue={mockData.number} className="max-w-md" size="lg" />
                 <span className="text-sm font-light text-white">{mockData.minted} / {mockData.number} minted</span>
                </div>
                <div className="text-white">
                    Inscription ID: {mockData.inscriptionId}
                </div>
                <div className="text-white">
                    Mint Price: {mockData.price ? mockData.price + 'BTC' : 'Free'}
                </div>
                <div className="text-white">
                    Current Phrase: {mockData.status}
                </div>
                <div className="text-white">
                    Description: {mockData.description}
                </div>
                <div className="text-white">
                    Homepage: <a href={mockData.homepage} target="_blank" rel="noreferrer">{mockData.homepage}</a>
                </div>
            </div>
            
        </div>
        <div className="w-full flex flex-col gap-4 mt-16">
            <h1 className="text-4xl font-bold text-white">Minted Variations</h1>
            <div className="gap-4 grid grid-cols-2 sm:grid-cols-4">
            {list.map((item, index) => (
                <Card shadow="sm" key={index} className="bg-black">
                <CardBody className="overflow-visible p-0">
                    <Image
                     width={250}
                     height={250}
                    alt={item.gameInscriptionId}
                    className="w-full object-cover"
                    src={item.img}
                    />
                </CardBody>
                <CardFooter className="text-small justify-start p-0 py-2">
                    <Button size="sm" color="primary" variant="light" startContent={<Image src="/play.svg" alt="game icon" width={10} height={10} />}>
                        Play
                    </Button>
                </CardFooter>
                </Card>
            ))}
        </div>
        </div>
    </div>
}