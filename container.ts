namespace FrenzyWords {
    export class Container {
        div: HTMLDivElement
        letter: Letter;
        spanLetter: HTMLSpanElement
        spanValue: HTMLSpanElement
        selected: boolean
        rect: DOMRect
        transitioning: boolean;
        constructor(_letter: Letter){
            this.draw(_letter)
        }
        draw (_letter: Letter){
            this.transitioning = false;
            this.letter = _letter   
            this.div = document.createElement("div")
            this.div.classList.add("Container")
            this.spanLetter = document.createElement("span")
            this.div.append(this.spanLetter)
            this.spanLetter.classList.add("Letter")
            this.spanLetter.innerHTML = this.letter.indicator
            this.spanValue = document.createElement("span")
            this.div.append(this.spanValue)
            this.spanValue.classList.add("Value")
            this.spanValue.innerHTML = `${this.letter.baseValue}`
            this.selected = false;
            letterArea.append(this.div) 

            this.div.addEventListener('click', () => {
                this.select();
            });
        }
        select() {
            if (!this.selected) {
                this.transitioning = true;
                lettersPlayed.push(this);
                const pseudoContainer = document.createElement('div');
                pseudoContainer.classList.add("Container");
                pseudoContainer.style.opacity = "0";
                gameArea.appendChild(pseudoContainer);
        
                // Logik für das LetterArea-Element (ähnlich wie für das GameArea-Element)
                const gameAreaRect = document.getElementById('GameArea')!.getBoundingClientRect();
                const gameAreaTop = gameAreaRect.top + window.scrollY;
                const gameAreaLeft = gameAreaRect.right + window.scrollX;
        
                const currentRect = this.div.getBoundingClientRect();
                const currentTop = currentRect.top + window.scrollY;
                const currentLeft = currentRect.right + window.scrollX;
                this.div.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease, background-color 0.5s ease';
                this.div.style.width ="7vw"
                this.div.style.height="7vw"
                this.div.style.backgroundColor =     "#0e5686";
                this.div.style.transform = `translate(${gameAreaLeft - currentLeft}px, ${gameAreaTop - currentTop}px) rotate(-360deg)`;
        
                this.div.addEventListener('transitionend', () => {
                    gameArea.removeChild(pseudoContainer);
                    this.div.style.transition = 'none';
                    this.div.style.transform = 'none';
                    this.div.style.boxShadow = '5px 5px 15px 1px rgb(125, 125, 125), inset 10px 10px 10px -5px #6fc6ff';
                    this.spanValue.style.textShadow = '1px 1px 2px rgb(75, 75, 75)';
        
                    document.getElementById('GameArea')!.appendChild(this.div);
                    this.selected = true;
                    this.transitioning = false;
                }, { once: true });
            } else {
                this.transitioning = true;

        
                const letterAreaRect = document.getElementById('LetterArea')!.getBoundingClientRect();
                const letterAreaTop = letterAreaRect.top + window.scrollY;
                const letterAreaLeft = letterAreaRect.right + window.scrollX;
        
                const currentRect = this.div.getBoundingClientRect();
                const currentTop = currentRect.top + window.scrollY;
                const currentLeft = currentRect.left + window.scrollX;
        
                this.div.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.5s ease, width 2s ease-in, height 2s ease-in';
                this.div.style.width ="6vw"
                this.div.style.height="6vw"
                this.div.style.backgroundColor =     "#3498db";
                this.div.style.transform = `translate(${letterAreaLeft - currentLeft}px, ${letterAreaTop - currentTop}px)`;
                this.div.style.boxShadow = "box-shadow: 5px 5px 15px 1px rgb(125, 125, 125), inset 10px 10px 10px -5px #6fc6ff;"
                lettersPlayed.splice(lettersPlayed.indexOf(this), 1);
                const pseudoContainer = document.createElement('div');
                pseudoContainer.classList.add("Container");
                pseudoContainer.style.opacity = "0";
                letterArea.appendChild(pseudoContainer);
                this.div.addEventListener('transitionend', () => {
                    letterArea.removeChild(pseudoContainer);
                    this.div.style.transition = 'none';
                    this.div.style.transform = 'none';
                    document.getElementById('LetterArea')!.appendChild(this.div);
                    this.selected = false;
                    this.transitioning = false;
                }, { once: true });
            }
        }
        
        
        
        
        
        
        followMouse (_e: MouseEvent) {
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
            this.div.style.boxShadow = `${tiltY / 2}px ${-tiltX / 2}px 15px 1px rgb(125, 125, 125), inset 10px 10px 10px -5px #6fc6ff`
            this.spanValue.style.textShadow = `${tiltY / 7.5}px ${-tiltX / 7.5}px 2px rgb(75, 75, 75)`
            }
        }

    }
}