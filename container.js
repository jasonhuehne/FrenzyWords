"use strict";
var FrenzyWords;
(function (FrenzyWords) {
    class Container {
        div;
        letter;
        spanLetter;
        spanValue;
        selected;
        rect;
        transitioning;
        constructor(_letter) {
            this.draw(_letter);
        }
        draw(_letter) {
            this.transitioning = false;
            this.letter = _letter;
            this.div = document.createElement("div");
            this.div.classList.add("Container");
            this.spanLetter = document.createElement("span");
            this.div.append(this.spanLetter);
            this.spanLetter.classList.add("Letter");
            this.spanLetter.innerHTML = this.letter.indicator;
            this.spanValue = document.createElement("span");
            this.div.append(this.spanValue);
            this.spanValue.classList.add("Value");
            this.spanValue.innerHTML = `${this.letter.baseValue}`;
            this.selected = false;
            FrenzyWords.letterArea.append(this.div);
            this.div.addEventListener('click', () => {
                this.select();
            });
        }
        select() {
            if (!this.selected) {
                this.transitioning = true;
                FrenzyWords.lettersPlayed.push(this);
                const pseudoContainer = document.createElement('div');
                pseudoContainer.classList.add("Container");
                pseudoContainer.style.opacity = "0";
                FrenzyWords.gameArea.appendChild(pseudoContainer);
                // Logik für das LetterArea-Element (ähnlich wie für das GameArea-Element)
                const gameAreaRect = document.getElementById('GameArea').getBoundingClientRect();
                const gameAreaTop = gameAreaRect.top + window.scrollY;
                const gameAreaLeft = gameAreaRect.right + window.scrollX;
                const currentRect = this.div.getBoundingClientRect();
                const currentTop = currentRect.top + window.scrollY;
                const currentLeft = currentRect.right + window.scrollX;
                this.div.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease, background-color 0.5s ease';
                this.div.style.boxShadow = 'none';
                this.div.style.backgroundColor = "#0e5686";
                this.div.style.transform = `translate(${gameAreaLeft - currentLeft}px, ${gameAreaTop - currentTop}px) rotate(-360deg)`;
                this.div.addEventListener('transitionend', () => {
                    FrenzyWords.gameArea.removeChild(pseudoContainer);
                    this.div.style.transition = 'none';
                    this.div.style.transform = 'none';
                    this.transitioning = false;
                    this.spanValue.style.textShadow = '1px 1px 2px rgb(75, 75, 75)';
                    document.getElementById('GameArea').appendChild(this.div);
                    this.selected = true;
                }, { once: true });
            }
            else {
                this.transitioning = true;
                const letterAreaRect = document.getElementById('LetterArea').getBoundingClientRect();
                const letterAreaTop = letterAreaRect.top + window.scrollY;
                const letterAreaLeft = letterAreaRect.right + window.scrollX;
                const currentRect = this.div.getBoundingClientRect();
                const currentTop = currentRect.top + window.scrollY;
                const currentLeft = currentRect.left + window.scrollX;
                this.div.style.transition = 'transform 0.3s ease, background-color 0.3s ease';
                this.div.style.backgroundColor = "#3498db";
                this.div.style.transform = `translate(${letterAreaLeft - currentLeft}px, ${letterAreaTop - currentTop}px) rotate(360deg)`;
                FrenzyWords.lettersPlayed.splice(FrenzyWords.lettersPlayed.indexOf(this), 1);
                const pseudoContainer = document.createElement('div');
                pseudoContainer.classList.add("Container");
                pseudoContainer.style.opacity = "0";
                FrenzyWords.letterArea.appendChild(pseudoContainer);
                this.div.addEventListener('transitionend', () => {
                    FrenzyWords.letterArea.removeChild(pseudoContainer);
                    this.transitioning = false;
                    this.div.style.transition = 'none';
                    this.div.style.transform = 'none';
                    document.getElementById('LetterArea').appendChild(this.div);
                    this.selected = false;
                }, { once: true });
            }
        }
        followMouse(_e) {
            if (!this.transitioning) {
                this.rect = this.div.getBoundingClientRect();
                const containerX = this.rect.left + this.rect.width / 2;
                const containerY = this.rect.top + this.rect.height / 2;
                const deltaX = _e.clientX - containerX;
                const deltaY = _e.clientY - containerY;
                const percentageX = deltaX / (window.innerWidth / 2);
                const percentageY = deltaY / (window.innerHeight / 2);
                const tiltX = percentageY * 20;
                const tiltY = -percentageX * 20;
                if (!this.selected && !FrenzyWords.transitioning || this.selected && FrenzyWords.transitioning) {
                    this.div.style.transform = `rotateX(${-tiltX / 1.5}deg) rotateY(${-tiltY / 1.5}deg)`;
                    this.div.style.boxShadow = `${tiltY / 2}px ${-tiltX / 2}px 15px 1px rgb(125, 125, 125), inset ${tiltY / 2}px ${-tiltX / 2}px 12px 3px #6fc6ff`;
                    this.spanValue.style.textShadow = `${tiltY / 6.66}px ${-tiltX / 6.66}px 2px rgb(75, 75, 75)`;
                }
                else {
                    this.div.style.boxShadow = `0px 0px 15px 1px rgb(125, 125, 125), inset ${tiltY / 5}px ${-tiltX / 2.5}px 20px -5px #6fc6ff`;
                    this.spanValue.style.textShadow = `${tiltY / 6.66}px ${-tiltX / 6.66}px 2px rgb(75, 75, 75)`;
                }
            }
        }
    }
    FrenzyWords.Container = Container;
})(FrenzyWords || (FrenzyWords = {}));
//# sourceMappingURL=container.js.map