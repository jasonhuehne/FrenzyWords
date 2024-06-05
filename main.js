"use strict";
var FrenzyWords;
(function (FrenzyWords) {
    window.addEventListener("load", hndLoad);
    let body;
    let startOverlay;
    let playButton;
    let gameArea;
    let wordArea;
    let letterArea;
    let letter;
    function hndLoad() {
        body = document.querySelector("body");
        startOverlay = document.getElementById("StartOverlay");
        playButton = document.getElementById("playButton");
        gameArea = document.getElementById("GameArea");
        wordArea = document.getElementById("WordArea");
        letterArea = document.getElementById("LetterArea");
        letter = document.querySelector(".Letter");
        playButton.addEventListener("click", hndStart);
        document.addEventListener("keydown", (_r) => hndReset());
    }
    function hndStart() {
        body.removeChild(startOverlay);
        for (let index = 0; index < 8; index++) {
            gameArea.appendChild(letter);
            letter.innerHTML = `${index}`;
            letter.classList.add("Letter");
        }
    }
    function hndReset() {
        body.prepend(startOverlay);
    }
})(FrenzyWords || (FrenzyWords = {}));
//# sourceMappingURL=main.js.map