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


const passCardNewTemplate = (tokenHash: string, gameScript: string) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Cubrix Cascade</title>

<link type="text/css" href="/game-script/passcard/css/all.css" media="screen" rel="stylesheet" />

<style>
#container{margin:0 auto;text-align:center;}
.cyr{text-align:center;}
</style>

<SCRIPT type="text/javascript" src="/game-script/passcard/js/logic_min2.js"></SCRIPT>

</head>
<body style="visibility: visible; ">
<DIV id="passcard">
  <DIV id="content">
    <DIV id="loading" style="display: none; "><IMG src="/game-script/passcard/js/loading.gif" alt="" style="width:16px;height:16px;vertical-align:top;"> Loading game...</DIV>
    <SCRIPT type="text/javascript"><!--
if (!window.CanvasRenderingContext2D)
{
   document.getElementById('loading').innerHTML = 'Your browser doesn\'t support canvas, if you are using IE then the <a href="v1/">older version</a> will likely work.<br>I suggest you download a standards compliant browser such as <a href="http://www.opera.com/">Opera</a>.';
}
else
{
    document.getElementById('loading').innerHTML = '<img src="/public/game-script/passcard/img/loading.gif" alt="" style="width:16px;height:16px;vertical-align:top;"> Loading game...';
}
--></SCRIPT>
    <DIV id="container" style="visibility: visible; ">
      <DIV id="menu" style="display:none; ">
        <DIV id="menu_area">
          <DIV id="screen0">
            <DIV id="helpBox">
              <P><B>玩法</B><BR>
                Use the arrow keys to guide the falling blocks, spacebar and the up-arrow will rotate the block in opposite directions.
                Alternatively the keys A,W,S and D can be used as arrow keys for the same purpose.<BR>
                <BR>
                When a complete horizontal ring of 15 blocks is occupied by pieces the row will collapse and earn 100 points.
                If multiple rows are cleared at a time you will earn bonus points. </P></DIV>
      
            <DIV id="but_main0" class="but"></DIV>
          </DIV>
          <DIV id="screen2">
            <DIV id="go1" class="but"></DIV>
            <DIV id="go2" class="nonstick"></DIV>
            <DIV id="go3" class="nonstick"></DIV>
            <DIV id="but_main1" class="but"></DIV>
          </DIV>
          <DIV id="screen1">
            <DIV id="quote">"A <B>circle</B> may be small, yet it may be as mathematically beautiful and perfect as a large one."<BR>
              <SPAN>- Isaac Disraeli</SPAN></DIV>
            <DIV id="but_play" class="but"></DIV>
            <DIV id="but_settings" class="but"></DIV>
            <DIV id="but_high" class="but"></DIV>
            <DIV id="but_help" class="but"></DIV>
          </DIV>
          <DIV id="screen3">
            <SELECT id="bestType">
              <OPTION>Traditional</OPTION>
              <OPTION>Time Attack</OPTION>
              <OPTION>Garbage</OPTION>
            </SELECT>
            <DIV id="best1"><B>Traditional</B><BR>
              1. Empty (0)<BR>
              2. Empty (0)<BR>
              3. Empty (0)</DIV>
            <DIV id="best2"><B>Time Attack</B><BR>
              1. Empty (0)<BR>
              2. Empty (0)<BR>
              3. Empty (0)</DIV>
            <DIV id="best3"><B>Garbage</B><BR>
              1. Empty (59:59)<BR>
              2. Empty (59:59)<BR>
              3. Empty (59:59)</DIV>
            <DIV id="but_main2" class="but"></DIV>
          </DIV>
          <DIV id="screen4">
            <DIV id="div_base">
              <LABEL>Skin:
                <SELECT id="set_base">
                  <OPTION>Glass</OPTION> 
                </SELECT>
              </LABEL>
            </DIV>
            <DIV id="div_ghost">
              <LABEL>
                <INPUT id="set_ghost" type="checkbox">
                Show ghost</LABEL>
            </DIV>
            <DIV id="but_main3" class="but"></DIV>
          </DIV>
        </DIV>
      </DIV>
      <DIV id="out"></DIV>
      <DIV id="playing" style="background-image: url(/game-script/passcard/img/base0.svg); ">
        <CANVAS id="canvas" width="200" height="400" style="opacity: 0; "></CANVAS>
        <DIV id="paused" style="opacity: 1; display: block; ">
          <DIV id="but_resume" class="but"></DIV>
          <DIV id="but_restart" class="but"></DIV>
          <DIV id="but_quit" class="but"></DIV>
        </DIV>
        <DIV id="panel" style="display: none; ">
          <DIV id="title1" style="display: block; "></DIV>
          <DIV id="title2" style="display: none; "></DIV>
          <DIV id="title3" style="display: none; "></DIV>
          <DIV id="score">0</DIV>
          <DIV id="time">0:00</DIV>
          <DIV id="next" style="background-position: -240px 0px; "></DIV>
          <DIV id="but_pause" class="but"></DIV>
        </DIV>
        <DIV id="gameover" style="display: block; ">
          <DIV id="winner" style="display: block; ">
            <FORM id="high_form">
              You have achieved a high score, please enter your name:<BR>
              <INPUT type="text" id="high_name" maxlength="20">
              <INPUT type="submit" value="OK">
            </FORM>
          </DIV>
          <DIV id="newgame" style="display: none; ">
            <DIV id="sorryText"></DIV>
            <DIV id="skull"></DIV>
            <DIV id="but_restart2" class="but"></DIV>
            <DIV id="but_main4" class="but"></DIV>
          </DIV>
        </DIV>
      </DIV>
      <DIV id="close" class="nonstick" style="left: 435px; top: 185px; "></DIV>
    </DIV>
  </DIV>
  
</DIV>
</BODY>
</HTML>
`;


export function useGameHtml(gameId: string, variationId: string) {
    const [gameHtml, setGameHtml] = useState<string | null>(null);

    useEffect(() => {
        fetch(`/game-script/${gameId}.js`)
        .then((response) => response.text())
        .then((data) => {
            if(gameId === '6c43433d861400abcbc848635db53f33a740eb30aff6bc7733937f5c09356191i0') {
                setGameHtml(passCardNewTemplate(variationId, data));
            } else {
                setGameHtml(htmlTemplate(variationId.toString().padEnd(66, '0'), data));
            }
        });
    }, [gameId, variationId]);

    return gameHtml;
}


