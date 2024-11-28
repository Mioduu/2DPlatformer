import { SFX } from "./constants.js"

export default class Coin {
        constructor(x,y,width,height, increaseScore, gameWidth, gameHeight) {
            this.gameWidth = gameWidth
            this.gameHeight = gameHeight
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
            this.countScore = increaseScore
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
        handleCollision(player, gameWidth, gameHeight) {
            if(
                !this.collected && 
                player.x < this.x + this.width &&
                player.x + player.width > this.x &&
                player.y < this.y + this.height &&
                player.y + player.height > this.y) {
            this.collected = true
            SFX.collect.play()
            this.changePosition(gameWidth, gameHeight)
            this.countScore()
            console.log(`Pozycja X = "${this.x}, Pozycja Y = "${this.y}`)
        }
    }

        changePosition(gameWidth, gameHeight) {
            console.log(`Zmiana pozycji: gameWidth = ${gameWidth}, gameHeight = ${gameHeight}`)
            this.x = Math.floor(Math.random() * (gameWidth - this.width))
            this.y = Math.floor(Math.random() * (gameHeight - this.height))
            console.log(`Nowa pozycja: x = ${this.x}, y = ${this.y}`)
            this.collected = false
        }
    }