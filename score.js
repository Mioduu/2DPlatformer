export default class Score {
    constructor(elementId) {
        this.element = document.getElementById(elementId)
        this.score = 0
        console.log(`Działa elegancko, ID = "${elementId}"`)
    }

    increaseScore(points = 1) {
        this.score += points
        this.display()
    }

    reset() {
        this.score = 0
        this.display()
    }

    getScore() {
        return this.score 
    }
    
    display() {
        if(this.element) {
            this.element.textContent = "Score: " + this.score
        } else {
            console.log("Element został niezaładowany")
        }
    }
}