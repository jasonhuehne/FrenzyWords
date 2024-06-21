namespace FrenzyWords {
    export class Score{
        score: number;
        scoreSpan: HTMLSpanElement;
        scoring: boolean = false;
        factor: number
        scoreRect: DOMRect
        boughtLetter: boolean
        constructor(_factor: number){
            this.score = 0;
            this.factor = _factor
            this.scoreSpan = document.createElement("span")
            this.scoreSpan.innerHTML = `${this.score}`
            scoreArea.appendChild(this.scoreSpan)
        }
        add(_addAmount: number) {
            if (this.scoring = true){
               const oldScore: number = parseInt(this.scoreSpan.innerHTML)
               const newScore: number = oldScore + _addAmount
               this.score = newScore
               this.scoreSpan.innerHTML = `${newScore}`

            }
        }
        remove(_removeAmount: number){
            const oldScore: number = parseInt(this.scoreSpan.innerHTML)
               const newScore: number = oldScore - _removeAmount
               this.score = newScore
               if (!(this.score <= 0)){
               this.scoreSpan.innerHTML = `${newScore}`
               }
        }
        update() {

        }
    }
}