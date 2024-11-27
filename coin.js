import { SFX } from "./constants.js"


export default class Coin {
        constructor(x,y,width,height, score) {
            this.x = x
            this.y = y
            this.width = width
            this.height = height 
            this.img = document.getElementById("coins")
            this.sWidth = 16
            this.sHeight = 18
            this.dWidth = width 
            this.dHeight = height
            this.collected = false
            this.score = score
        }
        draw(context) {
            if(!this.collected) {
                context.drawImage(
                    this.img,
                    0, 0,
                    this.sWidth,
                    this.sHeight,
                    this.x,
                    this.y,
                    this.dWidth,
                    this.dHeight
                )
            }
            
        }

        collect(gameWidth, gameHeight, score) {
            if(!this.collected) {
                this.collected = true
                SFX.collect.play()
                score.increaseScore()
                this.changePosition(gameWidth, gameHeight)
            }

        }

        changePosition(gameWidth, gameHeight) {
            this.x = Math.floor(Math.random() * (gameWidth - this.width))
            this.y = Math.floor(Math.random() * (gameHeight - this.height))
            this.collected = false
        }
    }