"use strict";
var FrenzyWords;
(function (FrenzyWords) {
    window.addEventListener("load", hndLoad);
    let body;
    let startOverlay;
    let playButton;
    let swapButton;
    let playWordButton;
    FrenzyWords.shopOpen = false;
    let shopButton;
    let shop;
    let doubleLong;
    let doubleLongActive = false;
    let doubleShort;
    let doubleShortActive = false;
    let doubleDouble;
    FrenzyWords.doubleDoubleActive = false;
    let plusOne;
    let plusOneActive = false;
    let plusTwo;
    let plusTwoActive = false;
    let plusThree;
    let plusThreeActive = false;
    let plusRare;
    let plussFour = false;
    let germanWords;
    // Überprüfung Wort deutsch
    async function loadWordList() {
        const response = await fetch('https://gist.githubusercontent.com/MarvinJWendt/2f4f4154b8ae218600eb091a5706b5f4/raw/36b70dd6be330aa61cd4d4cdfda6234dcb0b8784/wordlist-german.txt');
        const text = await response.text();
        const wordsArray = text.split(/\r?\n/).map(word => word.toLowerCase()); // Wörter in Kleinbuchstaben umwandeln
        return new Set(wordsArray);
    }
    async function isGermanWord(word) {
        return germanWords.has(word.toLowerCase()); // Eingabewort in Kleinbuchstaben umwandeln
    }
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
    async function hndLoad() {
        body = document.querySelector("body");
        startOverlay = document.getElementById("StartOverlay");
        playButton = document.getElementById("playButton");
        swapButton = document.getElementById("swapButton");
        playWordButton = document.getElementById("playWordButton");
        FrenzyWords.scoreArea = document.getElementById("score");
        FrenzyWords.gameArea = document.getElementById("GameArea");
        FrenzyWords.wordArea = document.getElementById("WordArea");
        FrenzyWords.letterArea = document.getElementById("LetterArea");
        shopButton = document.getElementById("shopButton");
        shop = document.getElementById("Shop");
        doubleLong = document.getElementById("doubeLong");
        doubleShort = document.getElementById("doubleShort");
        doubleDouble = document.getElementById("doubleDouble");
        plusOne = document.getElementById("plusOne");
        plusTwo = document.getElementById("plusTwo");
        plusThree = document.getElementById("plusThree");
        plusRare = document.getElementById("plusRare");
        playButton.addEventListener("click", function () { if (!FrenzyWords.shopOpen) {
            hndStart();
        } });
        swapButton.addEventListener("click", function () { if (!FrenzyWords.shopOpen) {
            hndSwapLetters();
        } });
        playWordButton.addEventListener("click", function () { if (!FrenzyWords.shopOpen) {
            hndPlayWord(), lastPlayed = playedWord;
        } });
        shop.style.display = "none";
        shopButton.addEventListener("click", function (event) {
            event.stopPropagation();
            if (!FrenzyWords.shopOpen) {
                const scoreSet = document.getElementById("score");
                // Batch style changes
                scoreSet.style.cssText = "top: 5%; transform: none;";
                shopButton.innerHTML = "X";
                shop.style.display = "block";
                FrenzyWords.shopOpen = true;
                // Add event listener to handle clicks outside the shop
                document.addEventListener("click", closeShopOnOutsideClick);
            }
            else {
                const scoreSet = document.getElementById("score");
                scoreSet.style.cssText = "top: 45%; transform: translate(-50%, -50%);";
                shopButton.innerHTML = "SHOP";
                shop.style.display = "none";
                FrenzyWords.shopOpen = false;
                document.removeEventListener("click", closeShopOnOutsideClick);
            }
        });
        doubleDouble.addEventListener('click', () => {
            const nextElement = doubleDouble.nextElementSibling;
            if (nextElement && nextElement.innerHTML != "") {
                const amount = parseFloat(nextElement.innerHTML);
                if (FrenzyWords.Scorelist.remove(amount)) {
                    console.log("bought");
                    FrenzyWords.doubleDoubleActive = true;
                    doubleDouble.classList.add("bought");
                    nextElement.innerHTML = "";
                }
            }
        });
        doubleShort.addEventListener('click', () => {
            const nextElement = doubleShort.nextElementSibling;
            if (nextElement && nextElement.innerHTML != "") {
                const amount = parseFloat(nextElement.innerHTML);
                if (FrenzyWords.Scorelist.remove(amount)) {
                    console.log("bought");
                    FrenzyWords.doubleDoubleActive = true;
                    doubleDouble.classList.add("bought");
                }
            }
        });
        function closeShopOnOutsideClick(event) {
            if (!shop.contains(event.target) && event.target !== shopButton) {
                const scoreSet = document.getElementById("score");
                scoreSet.style.cssText = "top: 50%; transform: none;";
                shopButton.innerHTML = "SHOP";
                shop.style.display = "none";
                FrenzyWords.shopOpen = false;
                document.removeEventListener("click", closeShopOnOutsideClick);
            }
        }
        // Lade die Wortliste einmalig
        germanWords = await loadWordList();
    }
    function hndStart() {
        body.removeChild(startOverlay);
        FrenzyWords.Scorelist = new FrenzyWords.Score(1);
        shopButton.style.display = ("flex");
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
        FrenzyWords.selectedLetters.forEach(letter => {
            containers.push(new FrenzyWords.Container(letter));
        });
    }
    function hndSwapLetters() {
        FrenzyWords.lettersPlayed = [];
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
    let playedWord = "";
    let lastPlayed = "";
    async function hndPlayWord() {
        playedWord = "";
        console.log(playedWord);
        for (let index = 0; index < FrenzyWords.lettersPlayed.length; index++) {
            playedWord += FrenzyWords.lettersPlayed[index].letter.indicator;
        }
        const isGerman = await isGermanWord(playedWord);
        console.log(`${playedWord} ist ${isGerman ? "korrekt" : "nicht korrekt"}`);
        if (isGerman && !FrenzyWords.Scorelist.scoring) {
            const hasDoubles = await hasDoubleLetter(playedWord);
            let delay;
            if (hasDoubles.hasDoubleLetters && FrenzyWords.doubleDoubleActive) {
                delay = 1300;
            }
            else {
                delay = 1000;
            }
            FrenzyWords.Scorelist.scoring = true;
            await hndCorrectWord(FrenzyWords.lettersPlayed);
            setTimeout(() => {
                hndSwapLetters();
                FrenzyWords.transitioning = false;
                FrenzyWords.Scorelist.scoring = false;
            }, selectLetters.length * delay);
        }
    }
    async function hndCorrectWord(_words) {
        for (let index = 0; index < _words.length; index++) {
            const hasDouble = await hasDoubleLetter(lastPlayed);
            console.log(hasDouble.letters);
            if (_words[index].letter.indicator == hasDouble.letters[0]) {
                _words[index].fancy = true;
            }
            const container = _words[index];
            await container.hndCorrect();
        }
    }
    async function hasDoubleLetter(word) {
        let letters = [];
        // Regulärer Ausdruck, um Doppelbuchstaben zu finden
        let regex = /([a-zA-Z])\1/g;
        let match;
        // Mit regex.exec alle Treffer finden und die doppelten Buchstaben speichern
        while ((match = regex.exec(word)) !== null) {
            // Speichern des doppelten Buchstabens
            letters.push(match[1]);
        }
        // Prüfen, ob Doppelbuchstaben gefunden wurden
        let hasDoubleLetters = letters.length > 0;
        return { hasDoubleLetters, letters };
    }
})(FrenzyWords || (FrenzyWords = {}));
//# sourceMappingURL=main.js.map