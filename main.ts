namespace FrenzyWords {
window.addEventListener("load", hndLoad);
let body: HTMLBodyElement
let startOverlay: HTMLDivElement
let playButton: HTMLButtonElement
let gameArea: HTMLDivElement
let wordArea: HTMLDivElement
let letterArea: HTMLDivElement
let letter: Letter 
let letters: [];
interface Vector {
    x: number
    y: number
}
Letter {
    value: number
    pos: Vector
    container: HTMLDivElement    
}

function hndLoad() {
 body = <HTMLBodyElement> document.querySelector("body");
 startOverlay = <HTMLDivElement> document.getElementById("StartOverlay");
 playButton = <HTMLButtonElement> document.getElementById("playButton");
 gameArea = <HTMLDivElement> document.getElementById("GameArea")
 wordArea = <HTMLDivElement> document.getElementById ("WordArea")
 letterArea = <HTMLDivElement> document.getElementById("LetterArea")
 playButton.addEventListener("click", hndStart);
 document.addEventListener("keydown", (_r) => hndReset())

}
function hndStart () {
    body.removeChild(startOverlay)
        for (let index = 0; index < 8; index++) {

            
        }
         container = <HTMLDivElement>document.getElementById('container');
         maxTilt = 15; // Maximaler Neigungswinkel in Grad

        document.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const containerX = rect.left + rect.width / 2;
            const containerY = rect.top + rect.height / 2;

            const deltaX = e.clientX - containerX;
            const deltaY = e.clientY - containerY;

            const percentageX = deltaX / (window.innerWidth / 2);
            const percentageY = deltaY / (window.innerHeight / 2);

            const tiltX = percentageY * maxTilt;
            const tiltY = -percentageX * maxTilt;

            container.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });        
    }

}
function hndReset () {
    body.prepend(startOverlay)
}
}