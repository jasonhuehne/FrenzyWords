namespace FrenzyWords{
    export class Letter {
        container: Container
        baseValue: number
        addedValue: number
        played: boolean
        constructor(_letter: string, _baseValue: number) {
            let container: Container = new Container()
            this.container = container
            this.container.letter.innerHTML = _letter
            this.baseValue = _baseValue
            this.container.value.innerHTML = `${_baseValue}`
            letterArea.append(this.container.div)
        }
        update(){

            this.container
        }
    }
    
}