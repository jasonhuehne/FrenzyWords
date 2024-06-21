namespace FrenzyWords {
    export class Container {
        div: HTMLDivElement
        letter: Letter;
        spanLetter: HTMLSpanElement
        spanValue: HTMLSpanElement
        selected: boolean
        rect: DOMRect
        fancy: boolean;
        constructor(_letter: Letter){
            this.draw(_letter)
        }
        draw (_letter: Letter){
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
                if (!transitioning){
                this.select()}
            });
        }
        select() {
            if (!this.selected) {
                transitioning = true;
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
                this.div.style.boxShadow = 'none';
                this.div.style.backgroundColor =     "#0e5686";
                this.div.style.transform = `translate(${gameAreaLeft - currentLeft}px, ${gameAreaTop - currentTop}px) rotate(-360deg)`;
                
                this.div.addEventListener('transitionend', () => {
                    gameArea.removeChild(pseudoContainer);
                    this.div.style.transition = 'none';
                    this.div.style.transform = 'none';
                    transitioning = false;
                    this.spanValue.style.textShadow = '1px 1px 2px rgb(75, 75, 75)';
        
                    document.getElementById('GameArea')!.appendChild(this.div);
                    this.selected = true;
                }, { once: true });
            } else {
                transitioning = true;

        
                const letterAreaRect = document.getElementById('LetterArea')!.getBoundingClientRect();
                const letterAreaTop = letterAreaRect.top + window.scrollY;
                const letterAreaLeft = letterAreaRect.right + window.scrollX;
        
                const currentRect = this.div.getBoundingClientRect();
                const currentTop = currentRect.top + window.scrollY;
                const currentLeft = currentRect.left + window.scrollX;
        
                this.div.style.transition = 'transform 0.3s ease, background-color 0.3s ease';
                this.div.style.backgroundColor =     "#3498db";
                this.div.style.transform = `translate(${letterAreaLeft - currentLeft}px, ${letterAreaTop - currentTop}px) rotate(360deg)`;

                lettersPlayed.splice(lettersPlayed.indexOf(this), 1);
                const pseudoContainer = document.createElement('div');
                pseudoContainer.classList.add("Container");
                pseudoContainer.style.opacity = "0";
                letterArea.appendChild(pseudoContainer);
                this.div.addEventListener('transitionend', () => {
                    letterArea.removeChild(pseudoContainer);
                    transitioning = false;
                    this.div.style.transition = 'none';
                    this.div.style.transform = 'none';
                    document.getElementById('LetterArea')!.appendChild(this.div);
                    this.selected = false;
                }, { once: true });
            }
        }
        
        
        
        
        
        
        followMouse (_e: MouseEvent) {
            Scorelist.scoreRect = Scorelist.scoreSpan.getBoundingClientRect();
            if (!transitioning) {
            this.rect = this.div.getBoundingClientRect();
            const containerX = this.rect.left + this.rect.width / 2;
            const containerY = this.rect.top + this.rect.height / 2;

            const deltaX = _e.clientX - containerX;
            const deltaY = _e.clientY - containerY;

            const percentageX = deltaX / (window.innerWidth / 2);
            const percentageY = deltaY / (window.innerHeight / 2);

            const tiltX = percentageY * 20;
            const tiltY = -percentageX * 20;
            if (!this.selected && !transitioning || this.selected && transitioning){    
            this.div.style.transform = `rotateX(${-tiltX / 1.5}deg) rotateY(${-tiltY / 1.5}deg)`;
            this.div.style.boxShadow = `${tiltY / 2}px ${-tiltX / 2}px 15px 1px rgb(125, 125, 125), inset ${tiltY / 2}px ${-tiltX / 2}px 12px 3px #6fc6ff`
            this.spanValue.style.textShadow = `${tiltY / 6.66}px ${-tiltX / 6.66}px 2px rgb(75, 75, 75)`
            } else {
            this.div.style.boxShadow = `0px 0px 15px 1px rgb(125, 125, 125), inset ${tiltY / 5}px ${-tiltX / 2.5}px 20px -5px #6fc6ff`   
            }
        }
        }
        async hndCorrect() {
            transitioning = true;
            
            this.div.style.transition = "background-color 300ms ease-out, color 300ms ease, box-shadow 300ms ease, transform 300ms, opacity 300ms ease-out";
            
            if (doubleDoubleActive && this.fancy) {
                this.div.style.backgroundColor = "#F4F002";
                this.spanValue.style.color = "#f4b302";
                this.spanValue.style.textShadow = " #FC0 1px 0 10px;"
            } else {
                this.div.style.backgroundColor = "#11d111";
                this.spanValue.style.color = "black";
            }
            
            this.div.style.boxShadow = "none";
            
            // Wait for the background and color transitions to end
            await new Promise(resolve => {
                const transitionEndHandler = (event) => {
                    if (event.target === this.div && (event.propertyName === "background-color" || event.propertyName === "color")) {
                        this.div.removeEventListener('transitionend', transitionEndHandler);
                        resolve();
                    }
                };
                this.div.addEventListener('transitionend', transitionEndHandler);
            });
            
            // Handle fancy transition if needed
            if (doubleDoubleActive && this.fancy) {
                // Start der Rotation und Partikelanimation
                this.div.style.transform = "rotate(-15deg) scale(1.05)";
                const particlePromise = startParticleAnimation(this.div);
                
                await new Promise(resolve => {
                    const reverseFancyTransitionEndHandler = (event) => {
                        if (event.target === this.div && event.propertyName === "transform") {
                            this.div.removeEventListener('transitionend', reverseFancyTransitionEndHandler);
                            resolve();
                        }
                    };
                    this.div.addEventListener('transitionend', reverseFancyTransitionEndHandler);
                    this.div.style.transform = "rotate(15deg)";
                });
                
                await new Promise(resolve => {
                    const reverseFancyTransitionEndHandler = (event) => {
                        if (event.target === this.div && event.propertyName === "transform") {
                            this.div.removeEventListener('transitionend', reverseFancyTransitionEndHandler);
                            resolve();
                        }
                    };
                    this.div.addEventListener('transitionend', reverseFancyTransitionEndHandler);
                    this.div.style.transform = "rotate(0deg)";
                });
                
                await particlePromise;  // Warten auf Ende der Partikelanimation
            }
            
            // Calculate the center of the scoreRect
            const scoreRect = Scorelist.scoreRect;
            const targetCenterX = scoreRect.left + scoreRect.width / 2;
            const targetCenterY = scoreRect.top + scoreRect.height / 2;
            
            // Get the current position of the spanValue
            const currentRect = this.spanValue.getBoundingClientRect();
            const currentCenterX = currentRect.left + currentRect.width / 2;
            const currentCenterY = currentRect.top + currentRect.height / 2;
            
            // Calculate the translation values
            const translateX = targetCenterX - currentCenterX;
            const translateY = targetCenterY - currentCenterY;
            
            // Set up the transformation to move spanValue to the center of scoreRect
            this.spanValue.style.transition = 'transform 0.3s ease';
            this.spanValue.style.transform = `translate(${translateX}px, ${translateY}px)`;
            this.div.style.transform = "rotate(0deg)";
            
            // Wait for the transform transition to end
            await new Promise(resolve => {
                this.spanValue.addEventListener('transitionend', resolve, { once: true });
            });
            
            // After the transform transition ends, fade out the spanValue
            this.spanValue.style.transition = "opacity 300ms";
            this.spanValue.style.opacity = "0";
            
            // Wait for the opacity transition to end
            await new Promise(resolve => {
                this.spanValue.addEventListener('transitionend', resolve, { once: true });
            });
            
            // Add the score
            if (doubleDoubleActive && doubleTrue) {
                Scorelist.add(parseInt(this.spanValue.innerHTML) * 2);
            } else {
                Scorelist.add(parseInt(this.spanValue.innerHTML));
            }
            
            transitioning = false;
        }
        
        
        
        
        
        

    }
    async function startParticleAnimation(div) {
        // Erstellen Sie das Canvas-Element
        const particleCanvas = document.createElement('canvas');
        particleCanvas.id = 'particleCanvas';
    
        // Kontext des Canvas
        const ctx = particleCanvas.getContext('2d');
    
        // Größe und Position des Canvas
        const rect = div.getBoundingClientRect();
        const offsetX = window.pageXOffset + rect.left - 50; // X-Offset mit zusätzlichem Bereich
        const offsetY = window.pageYOffset + rect.top - 50; // Y-Offset mit zusätzlichem Bereich
        const canvasWidth = rect.width + 100; // Breite des Canvas mit zusätzlichem Bereich
        const canvasHeight = rect.height + 100; // Höhe des Canvas mit zusätzlichem Bereich
    
        // Canvas positionieren und Größe setzen
        particleCanvas.style.position = 'absolute';
        particleCanvas.style.left = offsetX + 'px';
        particleCanvas.style.top = offsetY + 'px';
        particleCanvas.width = canvasWidth;
        particleCanvas.height = canvasHeight;
    
        // Canvas dem body hinzufügen
        document.body.appendChild(particleCanvas); 
    
        // Partikelanzahl und Eigenschaften
        const particles = [];
        const particleCount = 50;
    
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: particleCanvas.width / 2,  // Startposition X
                y: particleCanvas.height / 2, // Startposition Y
                radius: Math.random() * 5 + 1,  // Radius zwischen 1 und 6
                color: '#f4b302',  // Farbe der Partikel (hier gelb)
                speedX: Math.random() * 6 - 3,  // Geschwindigkeit in X-Richtung
                speedY: Math.random() * 6 - 3,  // Geschwindigkeit in Y-Richtung
                opacity: 1  // Anfangsopazität
            });
        }
    
        // Animation der Partikel
        async function animateParticles() {
            for (let frame = 0; frame < 30; frame++) {  // 60 Frames für die Animation
                ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    
                particles.forEach(particle => {
                    particle.x += particle.speedX;
                    particle.y += particle.speedY;
    
                    particle.opacity -= 1 / 30;  // Opazität verringern
    
                    ctx.globalAlpha = particle.opacity;  // Opazität setzen
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                    ctx.fillStyle = particle.color;
                    ctx.fill();
                });
    
                await new Promise(resolve => requestAnimationFrame(resolve));  // Nächster Frame
            }
    
            // Nach der Animation Canvas wieder entfernen
            particleCanvas.remove();
        }
    
        await animateParticles();
    }
    
    
    
    
    
    
    
    
}