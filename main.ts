namespace FrenzyWords {
    window.addEventListener("load", hndLoad);
    let body: HTMLBodyElement;
    let startOverlay: HTMLDivElement;
    let playButton: HTMLButtonElement;
    let swapButton: HTMLButtonElement;
    let playWordButton: HTMLButtonElement;
    export let gameArea: HTMLDivElement;
    export let wordArea: HTMLDivElement;
    export let letterArea: HTMLDivElement;
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

    function hndLoad() {
        body = <HTMLBodyElement>document.querySelector("body");
        startOverlay = <HTMLDivElement>document.getElementById("StartOverlay");
        playButton = <HTMLButtonElement>document.getElementById("playButton");
        swapButton = <HTMLButtonElement>document.getElementById("swapButton");
        playWordButton = <HTMLButtonElement>document.getElementById("playWordButton");
        gameArea = <HTMLDivElement>document.getElementById("GameArea");
        wordArea = <HTMLDivElement>document.getElementById("WordArea");
        letterArea = <HTMLDivElement>document.getElementById("LetterArea");
        playButton.addEventListener("click", hndStart);
        swapButton.addEventListener("click", hndSwapLetters);
        playWordButton.addEventListener("click", hndPlayWord);
    }

    function hndStart() {
        body.removeChild(startOverlay);
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
    function createContainers(){
      selectedLetters.forEach(Letter => {
        containers.push(new Container(Letter))
      });
    }
    function hndSwapLetters() {
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
      selectLetters(swapAmount)
      createContainers();
  }
  
  
  

    function hndPlayWord() {
        let playedWord: string = ""
            for (let index = 0; index < lettersPlayed.length; index++) {
                playedWord += lettersPlayed[index].letter.indicator
                }
            lettersPlayed = []
            console.log(playedWord)
    }
}
