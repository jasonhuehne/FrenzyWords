"use strict";
var FrenzyWords;
(function (FrenzyWords) {
    class Letter {
        container;
        baseValue;
        addedValue;
        played;
        constructor(_letter, _baseValue) {
            let container = new FrenzyWords.Container();
            this.container = container;
            this.container.letter.innerHTML = _letter;
            this.baseValue = _baseValue;
            this.container.value.innerHTML = `${_baseValue}`;
            FrenzyWords.letterArea.append(this.container.div);
        }
        update() {
            this.container;
        }
    }
    FrenzyWords.Letter = Letter;
})(FrenzyWords || (FrenzyWords = {}));
//# sourceMappingURL=letter.js.map