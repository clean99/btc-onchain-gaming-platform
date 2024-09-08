import React, { useEffect, useState } from "react";

const passCardTemplate = (tokenHash: string, gameScript: string) => `
<!doctype html>
<html lang=en>

<head>
    <meta charset=utf-8>
    <title>js13k-2018</title>
    <style>
        body {
            margin: 0;
            background: #000;
            color: #fff;
            font-family: Futura, sans-serif;
            -webkit-font-smoothing: antialiased;
            overflow: hidden
        }

        [hidden] {
            display: none !important
        }

        @keyframes f {
            50% {
                opacity: 1
            }

            100% {
                opacity: 0
            }
        }

        .t {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            font-size: 4rem;
            letter-spacing: .5rem;
            animation: f 8s forwards;
            text-shadow: 0 0 .5rem rgba(0, 0, 0, .2)
        }

        .r {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: .5rem;
            height: .5rem;
            border: 2px solid rgba(255, 255, 255, .5);
            border-radius: 50%
        }

        .p {
            position: absolute;
            display: flex;
            bottom: 1.5rem;
            left: 1rem;
            width: calc(50vw - 1rem);
            height: .5rem;
            background: rgba(0, 0, 0, .5);
            border-radius: 9999px
        }

        .p::before {
            content: 'grappling hook (shift)';
            position: absolute;
            bottom: 100%;
            margin-bottom: .5rem;
            text-shadow: 2px 2px rgba(0, 0, 0, .2)
        }

        .p::after {
            content: '';
            width: var(--p-w);
            background: #fff;
            border-radius: 9999px
        }
    </style>
</head>

<body>
    <div class=g><canvas id=c></canvas>
        <div class=t>WANDER</div>
        <div class=r></div>
        <div class=p hidden></div>
    </div>
    <script type=module>
    ${gameScript}
    </script>
</body>

</html>

`;
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
    <script type="module">
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
            if(gameId === '6c43433d861400abcbc848635db53f33a740eb30aff6bc7733937f5c09356191i0') {
                setGameHtml(passCardTemplate(variationId, data));
            } else {
                setGameHtml(htmlTemplate(variationId.toString().padEnd(66, '0'), data));
            }
        });
    }, [gameId, variationId]);

    return gameHtml;
}


