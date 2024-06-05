namespace FrenzyWords {
    export class Container {
        div: HTMLDivElement
        letter: HTMLSpanElement
        value: HTMLSpanElement
        constructor(){
            this.div = document.createElement("div")
            this.div.classList.add("Container")
            this.letter = document.createElement("span")
            this.div.append(this.letter)
            this.letter.classList.add("Letter")
            this.value = document.createElement("span")
            this.div.append(this.value)
            this.value.classList.add("Value")
        }

    }
}