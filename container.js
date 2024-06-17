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
                // Logik für das LetterArea-Element (ähnlich wie für das GameArea-Element)
                const letterAreaRect = document.getElementById('GameArea').getBoundingClientRect();
                const letterAreaTop = letterAreaRect.top + window.scrollY;
                const letterAreaLeft = letterAreaRect.right + window.scrollX;
                const currentRect = this.div.getBoundingClientRect();
                const currentTop = currentRect.top + window.scrollY;
                const currentLeft = currentRect.right + window.scrollX;
                this.div.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
                this.div.style.transform = `translate(${letterAreaLeft - currentLeft}px, ${letterAreaTop - currentTop}px) rotate(360deg)`;
                this.div.addEventListener('transitionend', () => {
                    this.div.style.transition = 'none';
                    this.div.style.transform = 'none';
                    this.div.style.boxShadow = '5px 5px 15px 1px rgb(125, 125, 125), inset 10px 10px 10px -5px #6fc6ff';
                    this.spanValue.style.textShadow = '1px 1px 2px rgb(75, 75, 75)';
                    document.getElementById('GameArea').appendChild(this.div);
                    this.selected = true;
                    this.transitioning = false;
                }, { once: true });
            }
            else {
                // Logik für das LetterArea-Element (ähnlich wie für das GameArea-Element)
                const letterAreaRect = document.getElementById('LetterArea').getBoundingClientRect();
                const letterAreaTop = letterAreaRect.top + window.scrollY;
                const letterAreaLeft = letterAreaRect.right + window.scrollX;
                const currentRect = this.div.getBoundingClientRect();
                const currentTop = currentRect.top + window.scrollY;
                const currentLeft = currentRect.right + window.scrollX;
                this.div.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
                this.div.style.transform = `translate(${letterAreaLeft - currentLeft}px, ${letterAreaTop - currentTop}px) rotate(360deg)`;
                this.div.addEventListener('transitionend', () => {
                    this.div.style.transition = 'none';
                    this.div.style.transform = 'none';
                    document.getElementById('LetterArea').appendChild(this.div);
                    this.selected = false;
                }, { once: true });
            }
        }
        followMouse(_e) {
            if (this.selected == false && !this.transitioning) {
                this.rect = this.div.getBoundingClientRect();
                const containerX = this.rect.left + this.rect.width / 2;
                const containerY = this.rect.top + this.rect.height / 2;
                const deltaX = _e.clientX - containerX;
                const deltaY = _e.clientY - containerY;
                const percentageX = deltaX / (window.innerWidth / 2);
                const percentageY = deltaY / (window.innerHeight / 2);
                const tiltX = percentageY * 20;
                const tiltY = -percentageX * 20;
                this.div.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
                this.div.style.boxShadow = `${tiltY / 2}px ${-tiltX / 2}px 15px 1px rgb(125, 125, 125), inset 10px 10px 10px -5px #6fc6ff`;
                this.spanValue.style.textShadow = `${tiltY / 7.5}px ${-tiltX / 7.5}px 2px rgb(75, 75, 75)`;
            }
        }
    }
    FrenzyWords.Container = Container;
})(FrenzyWords || (FrenzyWords = {}));
//# sourceMappingURL=container.js.map