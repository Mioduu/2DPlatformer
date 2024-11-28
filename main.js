import InputHandler from "./inputHandler.js"
import Player from "./player.js"
import Background from "./background.js"
import Coin from "./coin.js"
import Portal from "./portal.js"
import Platform from "./platform.js"
import Score from "./score.js"
import { BASE_SPRITE_X_OFFSET, BASE_SPRITE_Y_OFFSET } from "./constants.js"

    function displayGoal() {
        const goalDisplay = document.getElementById("goalScore")
        goalDisplay.textContent = "Goal: Collect 15 coins"
    }

document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startGameButton")
    const menu = document.getElementById("menu")
    const gameCanvas = document.getElementById("gameCanva")
    const secondLevel = document.getElementById("secondLevel")
    

startButton.addEventListener("click", () => {
    menu.style.display = "none"
    gameCanvas.style.display = "block"
    startGame()
   })
})
function startGame() {
    const canvas = document.getElementById("gameCanva")
    const ctx = canvas.getContext("2d")

    canvas.width = 800
    canvas.height = 720  
    let level = 1 
    const input = new InputHandler()
    const player = new Player(canvas.height, canvas.width)
    const background = new Background(canvas.width, canvas.height)
    const score = new Score("scoreDisplay")

    const platforms = [
        new Platform(100, 400, 100, 20),
        new Platform(700, 450, 100, 20),
        new Platform(570, 300, 100, 20),        
    ]

    const coins = [
        new Coin(470, 550, 50, 50,() => score.increaseScore()),
        new Coin(700, 400, 50, 50, () => score.increaseScore()),
    ]

    const portal = new Portal(300, 525, 200, 200) 

    const debugPlayer = document.getElementById("playerDebug")
    const debugBackground = document.getElementById("backgroundDebug")
    const debugPlatform = document.getElementById("platformDebug")
    
    

    function animate(gameFrame, score, level) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        if(player.onLevel === 1) {
            background.draw(ctx)
            background.update(player)
            platforms.forEach((platform) => {
                platform.update(canvas.height) 
                platform.draw(ctx) 
            })
            player.draw(ctx)
            player.update(input,gameFrame, platforms, coins, portal, score)
        
            
            coins.forEach((coin) => coin.draw(ctx))
            if(score.getScore() >= 15) {
            portal.draw(ctx)
            }
        }
        console.log(score)
        score.display()
        debugPlayer.textContent = Object.keys(player).reduce((acc, curr) => acc += `${curr} = ${player[curr]}, `, '')
        debugBackground.textContent = Object.keys(background).reduce((acc, curr) => acc += `${curr} = ${background[curr]}, `, '')
        if(platforms.length > 0) {
        debugPlatform.textContent = Object.keys(platforms[0]).reduce((acc, curr) => acc += `${curr} = ${platforms[0][curr]}, `, '')
        }

        displayGoal()
        
        requestAnimationFrame(() => animate(gameFrame, score, level))
        gameFrame++
    }

    animate(0, score, 1)
}