namespace FrenzyWords {
    window.addEventListener("load", hndLoad);
    let body: HTMLBodyElement;
    let startOverlay: HTMLDivElement;
    let playButton: HTMLButtonElement;
    let swapButton: HTMLButtonElement;
    let playWordButton: HTMLButtonElement;
    export let scoreArea: HTMLDivElement;
    export let gameArea: HTMLDivElement;
    export let wordArea: HTMLDivElement;
    export let letterArea: HTMLDivElement;
    export let shopOpen: boolean = false;
    let shopButton: HTMLButtonElement;
    let shop: HTMLDivElement;
    let doubleLong: HTMLButtonElement;
    let doubleLongActive: boolean = false;
    let doubleShort: HTMLButtonElement;
    let doubleShortActive: boolean = false;
    let doubleDouble: HTMLButtonElement;
    export let doubleDoubleActive: boolean = false;
    
    let plusOne: HTMLButtonElement;
    let plusOneActive: boolean = false;
    let plusTwo: HTMLButtonElement;
    let plusTwoActive: boolean = false;
    let plusThree: HTMLButtonElement;
    let plusThreeActive: boolean = false;
    let plusRare: HTMLButtonElement;
    let plussFour: boolean = false;
    let germanWords: Set<string>;
    export let Scorelist: Score
        // Überprüfung Wort deutsch
    async function loadWordList(): Promise<Set<string>> {
        const response = await fetch('https://gist.githubusercontent.com/MarvinJWendt/2f4f4154b8ae218600eb091a5706b5f4/raw/36b70dd6be330aa61cd4d4cdfda6234dcb0b8784/wordlist-german.txt');
        const text = await response.text();
        const wordsArray = text.split(/\r?\n/).map(word => word.toLowerCase()); // Wörter in Kleinbuchstaben umwandeln
        return new Set(wordsArray);
    }

    async function isGermanWord(word: string): Promise<boolean> {
        return germanWords.has(word.toLowerCase()); // Eingabewort in Kleinbuchstaben umwandeln
    }
 

    export let lettersPlayed: Container[] = [];
    let containers: Container[] = [];
    interface Letters {
        letter: Letter;
        amount: number;
    }
    export interface Letter {
        indicator: string;
        baseValue: number;
    }
    export let transitioning: boolean = false;
    let gameStarted: boolean = false;
    let letters: Letters[] = [
        { letter: {indicator: "E", baseValue: 1 }, amount: 15 },
        { letter: {indicator: "N", baseValue: 1 }, amount: 9 },
        { letter: {indicator: "S", baseValue: 1 }, amount: 7 },
        { letter: {indicator: "I", baseValue: 1 }, amount: 6 },
        { letter: {indicator: "R", baseValue: 1 }, amount: 6 },
        { letter: {indicator: "T", baseValue: 1 }, amount: 6 },
        { letter: {indicator: "U", baseValue: 1 }, amount: 6 },
        { letter: {indicator: "A", baseValue: 1 }, amount: 5 },
        { letter: {indicator: "D", baseValue: 1 }, amount: 4 },
        { letter: {indicator: "H", baseValue: 2 }, amount: 4 },
        { letter: {indicator: "G", baseValue: 2 }, amount: 3 },
        { letter: {indicator: "L", baseValue: 2 }, amount: 3 },
        { letter: {indicator: "O", baseValue: 2 }, amount: 3 },
        { letter: {indicator: "M", baseValue: 3 }, amount: 4 },
        { letter: {indicator: "B", baseValue: 3 }, amount: 2 },
        { letter: {indicator: "W", baseValue: 3 }, amount: 1 },
        { letter: {indicator: "Z", baseValue: 3 }, amount: 1 },
        { letter: {indicator: "C", baseValue: 4 }, amount: 2 },
        { letter: {indicator: "F", baseValue: 4 }, amount: 2 },
        { letter: {indicator: "K", baseValue: 4 }, amount: 2 },
        { letter: {indicator: "P", baseValue: 4 }, amount: 1 },
        { letter: {indicator: "Ä", baseValue: 6 }, amount: 1 },
        { letter: {indicator: "J", baseValue: 6 }, amount: 1 },
        { letter: {indicator: "Ü", baseValue: 6 }, amount: 1 },
        { letter: {indicator: "V", baseValue: 6 }, amount: 1 },
        { letter: {indicator: "Ö", baseValue: 8 }, amount: 1 },
        { letter: {indicator: "X", baseValue: 8 }, amount: 1 },
        { letter: {indicator: "Q", baseValue: 10 }, amount: 1 },
        { letter: {indicator: "Y", baseValue: 10 }, amount: 1 },
    ];
    export let selectedLetters: Letter[] = [];
    export let deck: Letter[] = [];

    async function hndLoad() {
        body = <HTMLBodyElement>document.querySelector("body");
        startOverlay = <HTMLDivElement>document.getElementById("StartOverlay");
        playButton = <HTMLButtonElement>document.getElementById("playButton");
        swapButton = <HTMLButtonElement>document.getElementById("swapButton");
        playWordButton = <HTMLButtonElement>document.getElementById("playWordButton");
        scoreArea = <HTMLDivElement>document.getElementById("score")
        gameArea = <HTMLDivElement>document.getElementById("GameArea");
        wordArea = <HTMLDivElement>document.getElementById("WordArea");
        letterArea = <HTMLDivElement>document.getElementById("LetterArea");
        shopButton = <HTMLButtonElement> document.getElementById("shopButton")
        shop =<HTMLDivElement>document.getElementById("Shop")    
        doubleLong= <HTMLButtonElement> document.getElementById("doubeLong") 
        doubleShort= <HTMLButtonElement>document.getElementById("doubleShort")  
        doubleDouble=<HTMLButtonElement>document.getElementById("doubleDouble")  
        plusOne= <HTMLButtonElement>  document.getElementById("plusOne")
        plusTwo= <HTMLButtonElement>  document.getElementById("plusTwo")
        plusThree= <HTMLButtonElement>  document.getElementById("plusThree")
        plusRare= <HTMLButtonElement>  document.getElementById("plusRare")
        playButton.addEventListener("click", function(){if(!shopOpen){hndStart()}});
        swapButton.addEventListener("click", function(){if(!shopOpen){hndSwapLetters()}});
        playWordButton.addEventListener("click", function(){if(!shopOpen){hndPlayWord(), lastPlayed = playedWord}});

        shop.style.display = "none"
        shopButton.addEventListener("click", function(event) {
            event.stopPropagation();
            if (!shopOpen) {
                const scoreSet = <HTMLElement>document.getElementById("score");
            
                // Batch style changes
                scoreSet.style.cssText = "top: 5%; transform: none;";
            
                shopButton.innerHTML = "X";
                shop.style.display = "block";
                shopOpen = true;
            
                // Add event listener to handle clicks outside the shop
                document.addEventListener("click", closeShopOnOutsideClick);
            }
             else {
                const scoreSet = <HTMLElement>document.getElementById("score");
                scoreSet.style.cssText = "top: 45%; transform: translate(-50%, -50%);";
                shopButton.innerHTML = "SHOP"
                shop.style.display = "none";
                shopOpen = false;
                document.removeEventListener("click", closeShopOnOutsideClick);
            }
        });
        doubleDouble.addEventListener('click', () => {
            const nextElement = <HTMLElement> doubleDouble.nextElementSibling;
            if (nextElement && nextElement.innerHTML != "") {
                const amount = parseFloat(nextElement.innerHTML);
                if(Scorelist.remove(amount))
                    {console.log("bought"); 
                    doubleDoubleActive = true; 
                    doubleDouble.classList.add("bought"); 
                    nextElement.innerHTML = ""
                doubleDouble.style.color="white";
            doubleDouble.style.cursor="auto"}
        }
                })
        doubleShort.addEventListener('click', () => {
            const nextElement = doubleShort.nextElementSibling;
            if (nextElement && nextElement.innerHTML != "") {const amount = parseFloat(nextElement.innerHTML);if(Scorelist.remove(amount)){console.log("bought"); doubleDoubleActive = true; doubleDouble.classList.add("bought")}}})

        function closeShopOnOutsideClick(event: any) {
            if (!shop.contains(event.target) && event.target !== shopButton) {
                const scoreSet = <HTMLElement>document.getElementById("score");
                scoreSet.style.cssText = "top: 45%; transform: translate(-50%, -50%);";
                    shopButton.innerHTML = "SHOP"
                shop.style.display = "none";
                shopOpen = false;
                document.removeEventListener("click", closeShopOnOutsideClick);
            }
        }
        // Lade die Wortliste einmalig
        germanWords = await loadWordList();
    }

    function hndStart() {
        body.removeChild(startOverlay);
        Scorelist = new Score(1)
        shopButton.style.display = ("flex");
        fillDeck();
        selectLetters(8);
        createContainers();
        console.log(deck);
        document.addEventListener("mousemove", (e) => {
            containers.forEach((container) => {
                container.followMouse(e);
            });
        });
    }

    function fillDeck() {
        for (let letter of letters) {
            for (let i = 0; i < letter.amount; i++) {
                deck.push(letter.letter);
            }
        }
    }

    function selectLetters(amount: number) {
        let newSelectedLetters: Letter[] = [];
        for (let i = 0; i < amount; i++) {
            if (deck.length === 0) {
                console.warn("Keine Buchstaben mehr im Deck!");
                break;
            }
            const randomIndex = Math.floor(Math.random() * deck.length);
            newSelectedLetters.push(deck[randomIndex]);
            deck.splice(randomIndex, 1);
        }
        selectedLetters = newSelectedLetters;
    }

    function createContainers() {
        selectedLetters.forEach(letter => {
            containers.push(new Container(letter));
        });
    }

    function hndSwapLetters() {
        lettersPlayed = [];
        let swapAmount: number = 0;
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
    let playedWord: string = "";
    let lastPlayed: string = "";
    export let doubleTrue: boolean = false;
    async function hndPlayWord() {
        playedWord = ""
        console.log(playedWord)
        for (let index = 0; index < lettersPlayed.length; index++) {
            playedWord += lettersPlayed[index].letter.indicator;
        }
    
        const isGerman = await isGermanWord(playedWord);
        console.log(`${playedWord} ist ${isGerman ? "korrekt" : "nicht korrekt"  }`);
        if (isGerman&&!Scorelist.scoring) {
            const hasDoubles = await hasDoubleLetter(playedWord)
            let delay: number
            if (hasDoubles.hasDoubleLetters && doubleDoubleActive){
                doubleTrue = true;
                delay = 1300
            } else {
                doubleTrue = false;
                delay = 1000
            }
            Scorelist.scoring = true;
            await hndCorrectWord(lettersPlayed);
            setTimeout(() => {
                hndSwapLetters();
                transitioning= false
                Scorelist.scoring = false;
  
                 
            }, selectLetters.length*delay);
        }
    }
    
    async function hndCorrectWord(_words: Container[]) {
        for (let index = 0; index < _words.length; index++) {
            const hasDouble = await hasDoubleLetter(lastPlayed)
            console.log(hasDouble.letters)
                if (_words[index].letter.indicator == hasDouble.letters[0]){
                    _words[index].fancy = true;
                }
            const container = _words[index];
            await container.hndCorrect();
        }
    }
    async function hasDoubleLetter(word: string): Promise<{ hasDoubleLetters: boolean, letters: string[] }> {
        let letters: string[] = [];
    
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
    }
