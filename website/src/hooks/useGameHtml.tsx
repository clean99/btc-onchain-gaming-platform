import React, { useEffect, useState } from "react";



export function useGameHtml(gameId: string, variationId: string) {
    const [gameHtml, setGameHtml] = useState<string | null>(null);

    useEffect(() => {
        fetch(`/bird.html`)
        .then((response) => response.text())
        .then((html) =>setGameHtml(html));
    }, [gameId, variationId]);

    return gameHtml;
}