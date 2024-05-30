import React, { useEffect, useState } from "react";

const htmlTemplate = (tokenHash: string, gameScript: string) => `
<html lang="en">
    <head>
    <title>Birdy</title>
    <style>
    body {
        background: #000;
        margin: 0;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    </style>
    <style id="gcss"></style>
    </head>
    <body>
    <script>
    var tokenHash = "${tokenHash}";
    // use the tokenHash from the url
    // var urlParams = new URLSearchParams(window.location.search);
    // var tokenHash = urlParams.get('tokenHash') || 'defaultHashIfNone';
        var tokenData = { hash: tokenHash };
    </script>
    <script src="https://btc.genify.xyz/js/genify_random.js"></script>
    <script src="https://lambda.im/lws/QmezioCQ9wBakdHHoVYXEui3nKnRGYTz3fEHsVVoUhFcQ5" id="p5@1.9"></script>
    <div id="cw"></div>
    <script>
    var meta = {
        p: "genify",
        op: "deploy",
        name: "",
        max: 1000,
        desc: "",
        artist: "",
        lib: "p5@1.6",
        res: "1024x1024",
        sats: 50000,
        psats: 0,
    };
    </script>
    <script>
    ${gameScript}
    </script>
    </body>
    </html>
`;

export function useGameHtml(gameId: string, variationId: string) {
    const [gameHtml, setGameHtml] = useState<string | null>(null);
    useEffect(() => {
        fetch(`/game-script/${gameId}.js`)
        .then((response) => response.text())
        .then((data) => {
            setGameHtml(htmlTemplate(variationId, data));
        });
    }, [gameId, variationId]);

    return gameHtml;
}


