"use strict";
var FrenzyWords;
(function (FrenzyWords) {
    window.addEventListener("load", hndLoad);
    let body;
    let startOverlay;
    let playButton;
    let gameArea;
    let wordArea;
    const containers = [];
    const maxTilt = 20; // Maximaler Neigungswinkel in Grad
    function hndLoad() {
        body = document.querySelector("body");
        startOverlay = document.getElementById("StartOverlay");
        playButton = document.getElementById("playButton");
        gameArea = document.getElementById("GameArea");
        wordArea = document.getElementById("WordArea");
        FrenzyWords.letterArea = document.getElementById("LetterArea");
        playButton.addEventListener("click", hndStart);
        document.addEventListener("keydown", (_k) => hndReset());
        function hndStart() {
            body.removeChild(startOverlay);
            for (let index = 0; index < 8; index++) {
                let letter = new FrenzyWords.Letter("A", 2);
                containers.push(letter);
            }
            document.addEventListener('mousemove', (e) => {
                containers.forEach(Letter => {
                    const rect = Letter.container.div.getBoundingClientRect();
                    const containerX = rect.left + rect.width / 2;
                    const containerY = rect.top + rect.height / 2;
                    const deltaX = e.clientX - containerX;
                    const deltaY = e.clientY - containerY;
                    const percentageX = deltaX / (window.innerWidth / 2);
                    const percentageY = deltaY / (window.innerHeight / 2);
                    const tiltX = percentageY * maxTilt;
                    const tiltY = -percentageX * maxTilt;
                    Letter.container.div.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
                    Letter.container.div.style.boxShadow = `${tiltY / 2}px ${-tiltX / 2}px 15px 1px rgb(125, 125, 125), inset 10px 10px 10px -5px #6fc6ff`;
                    Letter.container.value.style.textShadow = `${tiltY / 7.5}px ${-tiltX / 7.5}px 2px rgb(75, 75, 75)`;
                });
                containers.forEach(Letter => {
                    Letter.container.div.addEventListener('mouseover', () => {
                        Letter.container.div.style.rotate = '-2deg';
                    });
                    Letter.container.div.addEventListener('mouseout', () => {
                        Letter.container.div.style.rotate = '0deg';
                    });
                    Letter.container.div.addEventListener('click', () => {
                        if (Letter.container.div.style.top == "10vh")
                            Letter.container.div.style.top = '50vh';
                        else
                            Letter.container.div.style.top = '10vh';
                    });
                });
            });
        }
        function hndReset() {
            body.prepend(startOverlay);
        }
    }
})(FrenzyWords || (FrenzyWords = {}));
//# sourceMappingURL=main.js.map