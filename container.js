"use strict";
var FrenzyWords;
(function (FrenzyWords) {
    class Container {
        div;
        letter;
        value;
        constructor() {
            this.div = document.createElement("div");
            this.div.classList.add("Container");
            this.letter = document.createElement("span");
            this.div.append(this.letter);
            this.letter.classList.add("Letter");
            this.value = document.createElement("span");
            this.div.append(this.value);
            this.value.classList.add("Value");
        }
    }
    FrenzyWords.Container = Container;
})(FrenzyWords || (FrenzyWords = {}));
//# sourceMappingURL=container.js.map