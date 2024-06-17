"use strict";
var FrenzyWords;
(function (FrenzyWords) {
    window.addEventListener("load", hndLoad);
    let body;
    let startOverlay;
    let playButton;
    let swapButton;
    let playWordButton;
    FrenzyWords.lettersPlayed = [];
    let containers = [];
    FrenzyWords.transitioning = false;
    let gameStarted = false;
    let letters = [
        { letter: { indicator: "E", baseValue: 1 }, amount: 15 },
        { letter: { indicator: "N", baseValue: 1 }, amount: 9 },
        { letter: { indicator: "S", baseValue: 1 }, amount: 7 },
        { letter: { indicator: "I", baseValue: 1 }, amount: 6 },
        { letter: { indicator: "R", baseValue: 1 }, amount: 6 },
        { letter: { indicator: "T", baseValue: 1 }, amount: 6 },
        { letter: { indicator: "U", baseValue: 1 }, amount: 6 },
        { letter: { indicator: "A", baseValue: 1 }, amount: 5 },
        { letter: { indicator: "D", baseValue: 1 }, amount: 4 },
        { letter: { indicator: "H", baseValue: 2 }, amount: 4 },
        { letter: { indicator: "G", baseValue: 2 }, amount: 3 },
        { letter: { indicator: "L", baseValue: 2 }, amount: 3 },
        { letter: { indicator: "O", baseValue: 2 }, amount: 3 },
        { letter: { indicator: "M", baseValue: 3 }, amount: 4 },
        { letter: { indicator: "B", baseValue: 3 }, amount: 2 },
        { letter: { indicator: "W", baseValue: 3 }, amount: 1 },
        { letter: { indicator: "Z", baseValue: 3 }, amount: 1 },
        { letter: { indicator: "C", baseValue: 4 }, amount: 2 },
        { letter: { indicator: "F", baseValue: 4 }, amount: 2 },
        { letter: { indicator: "K", baseValue: 4 }, amount: 2 },
        { letter: { indicator: "P", baseValue: 4 }, amount: 1 },
        { letter: { indicator: "Ä", baseValue: 6 }, amount: 1 },
        { letter: { indicator: "J", baseValue: 6 }, amount: 1 },
        { letter: { indicator: "Ü", baseValue: 6 }, amount: 1 },
        { letter: { indicator: "V", baseValue: 6 }, amount: 1 },
        { letter: { indicator: "Ö", baseValue: 8 }, amount: 1 },
        { letter: { indicator: "X", baseValue: 8 }, amount: 1 },
        { letter: { indicator: "Q", baseValue: 10 }, amount: 1 },
        { letter: { indicator: "Y", baseValue: 10 }, amount: 1 },
    ];
    FrenzyWords.selectedLetters = [];
    FrenzyWords.deck = [];
    function hndLoad() {
        body = document.querySelector("body");
        startOverlay = document.getElementById("StartOverlay");
        playButton = document.getElementById("playButton");
        swapButton = document.getElementById("swapButton");
        playWordButton = document.getElementById("playWordButton");
        FrenzyWords.gameArea = document.getElementById("GameArea");
        FrenzyWords.wordArea = document.getElementById("WordArea");
        FrenzyWords.letterArea = document.getElementById("LetterArea");
        playButton.addEventListener("click", hndStart);
        swapButton.addEventListener("click", hndSwapLetters);
        playWordButton.addEventListener("click", hndPlayWord);
    }
    function hndStart() {
        body.removeChild(startOverlay);
        fillDeck();
        selectLetters(8);
        createContainers();
        console.log(FrenzyWords.deck);
        document.addEventListener("mousemove", (e) => {
            containers.forEach((container) => {
                container.followMouse(e);
            });
        });
    }
    function fillDeck() {
        for (let letter of letters) {
            for (let i = 0; i < letter.amount; i++) {
                FrenzyWords.deck.push(letter.letter);
            }
        }
    }
    function selectLetters(amount) {
        let newSelectedLetters = [];
        for (let i = 0; i < amount; i++) {
            if (FrenzyWords.deck.length === 0) {
                console.warn("Keine Buchstaben mehr im Deck!");
                break;
            }
            const randomIndex = Math.floor(Math.random() * FrenzyWords.deck.length);
            newSelectedLetters.push(FrenzyWords.deck[randomIndex]);
            FrenzyWords.deck.splice(randomIndex, 1);
        }
        FrenzyWords.selectedLetters = newSelectedLetters;
    }
    function createContainers() {
        FrenzyWords.selectedLetters.forEach(Letter => {
            containers.push(new FrenzyWords.Container(Letter));
        });
    }
    function hndSwapLetters() {
        let swapAmount = 0;
        // Durchlaufe rückwärts, um Elemente sicher zu entfernen
        for (let i = containers.length - 1; i >= 0; i--) {
            if (containers[i].selected) {
                // Hier füge deine Logik ein, um das DOM-Element zu entfernen
                let containerToRemove = containers[i];
                // Beispiel für das Entfernen des DOM-Elements
                containerToRemove.div.parentNode?.removeChild(containerToRemove.div);
                // Entferne das Element aus dem Array
                containers.splice(i, 1);
                swapAmount++;
            }
        }
        selectLetters(swapAmount);
        createContainers();
    }
    function hndPlayWord() {
        let playedWord = "";
        for (let index = 0; index < FrenzyWords.lettersPlayed.length; index++) {
            playedWord += FrenzyWords.lettersPlayed[index].letter.indicator;
        }
        console.log(playedWord);
    }
})(FrenzyWords || (FrenzyWords = {}));
//# sourceMappingURL=main.js.map