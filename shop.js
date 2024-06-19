"use strict";
var FrenzyWords;
(function (FrenzyWords) {
    class Score {
        score;
        scoreSpan;
        scoring = false;
        factor;
        scoreRect;
        boughtLetter;
        constructor(_factor) {
            this.score = 0;
            this.factor = _factor;
            this.scoreSpan = document.createElement("span");
            this.scoreSpan.innerHTML = `${this.score}`;
            FrenzyWords.scoreArea.appendChild(this.scoreSpan);
        }
        add(_addAmount) {
            if (this.scoring = true) {
                const oldScore = parseInt(this.scoreSpan.innerHTML);
                const newScore = oldScore + _addAmount;
                this.score = newScore;
                this.scoreSpan.innerHTML = `${newScore}`;
            }
        }
        update() {
        }
    }
    FrenzyWords.Score = Score;
})(FrenzyWords || (FrenzyWords = {}));
//# sourceMappingURL=shop.js.map