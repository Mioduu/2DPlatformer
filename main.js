document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startGameButton")
    const menu = document.getElementById("menu")
    const gameCanvas = document.getElementById("gameCanva")
    const secondLevel = document.getElementById("level2")

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
    const BASE_SPRITE_X_OFFSET = 10
    const BASE_SPRITE_Y_OFFSET = 30
    let score = 0
    let level = 1

    class Portal {
        constructor(x,y,width,height) {
            this.img = document.getElementById("portal")
            this.x = x
            this.y = y
            this.width = width
            this.height = height 
            this.sWidth = 32
            this.sHeight = 32
            this.dWidth = width
            this.dHeight = height
            this.currentFrame = 0
            this.totalFrames = 3
            this.shown = false
            this.soundPlayed = false
        }

        draw(context) {

            const frameX = (this.currentFrame % 3) * this.sWidth

            if(score >= 15) {
                context.drawImage(
                    this.img,
                    frameX, 0,
                    this.sWidth,
                    this.sHeight,
                    this.x,
                    this.y,
                    this.dWidth,
                    this.dHeight
                )
                if(gameFrame % 10 === 0) {
                this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
                }
                this.shown = true
            }
            
        }
    }
    class Background {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth
            this.gameHeight = gameHeight
            this.image = document.getElementById("background")
            this.x = 0
            this.y = 0
            this.width = 2400
            this.height = 720 
            this.speed = 2
        }
        draw(context) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height) //main
            context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height) //right
            context.drawImage(this.image, this.x - this.width, this.y, this.width, this.height) //left
            context.drawImage(this.image, this.x, this.y + this.height, this.width, this.height) //down
            context.drawImage(this.image, this.x, this.y - this.height, this.width, this.height) //up
            context.drawImage(this.image, this.x + this.width, this.y + this.height, this.width, this.height) // right down corner
            context.drawImage(this.image, this.x - this.width, this.y + this.height, this.width, this.height) // left down corner
            context.drawImage(this.image, this.x + this.width, this.y - this.height, this.width, this.height) // right top corner
            context.drawImage(this.image, this.x - this.width, this.y - this.height, this.width, this.height) // left top corner
        }
        update(player) {
            if(player.vx > 0) {
                this.x -= this.speed
            } else if(player.vx < 0) {
                this.x += this.speed
            }
            if(player.vy > 0 && player.onPlatform) {
                this.y -= this.speed
            } else if(player.vy < 0) {
                this.y += this.speed
            }
        
            if (!player.onPlatform) {
                if (this.y < -this.height) this.y = 0
                if (this.y > 0) this.y = -this.height
            }
            if (this.x < -this.width) this.x = 0
            if (this.x > 0) this.x = -this.width 
        }
        
    }

    class Level2 {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth
            this.gameHeight = gameHeight
            this.image = document.getElementById("secondLevel")
            this.x = 0
            this.y = 0
            this.width = 2400
            this.height = 720 
            this.speed = 2
        }

        draw(context) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height) //main
            context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height) //right
            context.drawImage(this.image, this.x - this.width, this.y, this.width, this.height) //left
            context.drawImage(this.image, this.x, this.y + this.height, this.width, this.height) //down
            context.drawImage(this.image, this.x, this.y - this.height, this.width, this.height) //up
            context.drawImage(this.image, this.x + this.width, this.y + this.height, this.width, this.height) // right down corner
            context.drawImage(this.image, this.x - this.width, this.y + this.height, this.width, this.height) // left down corner
            context.drawImage(this.image, this.x + this.width, this.y - this.height, this.width, this.height) // right top corner
            context.drawImage(this.image, this.x - this.width, this.y - this.height, this.width, this.height) // left top corner
        }

        update(player) {
            if(player.vx > 0) {
                this.x -= this.speed
            } else if(player.vx < 0) {
                this.x += this.speed
            }
            if(player.vy > 0 && player.onPlatform) {
                this.y -= this.speed
            } else if(player.vy < 0) {
                this.y += this.speed
            }
        
            if (!player.onPlatform) {
                if (this.y < -this.height) this.y = 0
                if (this.y > 0) this.y = -this.height
            }
            if (this.x < -this.width) this.x = 0
            if (this.x > 0) this.x = -this.width 
        }

    }



    class Coin {
        constructor(x,y,width,height) {
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
        changePosition(gameWidth, gameHeight) {
            sfx.collect.play()
            this.x = Math.floor(Math.random() * (gameWidth - this.width))
            this.y = Math.floor(Math.random() * (gameHeight - this.height))
            this.collected = false
        }
    }

    class Platform {
        constructor(x, y, width, height) {
            this.x = x
            this.y = y
            this.width = width
            this.height = height
            this.img = document.getElementById("platform")
            this.frameX = 1
            this.frameY = 0
            this.sWidth = 60
            this.sHeight = 100
            this.dWidth = width
            this.dHeight = height
            this.speedY = 1
            this.reseted = false
        }

        resetPosition() {
            this.y = -this.height
            this.x = Math.floor(Math.random() * (canvas.width - this.width)) 
        }
    
        update(gameHeight) {
            this.y += this.speedY
    
            if (this.y > gameHeight) {
                this.resetPosition()
            }
        }

        draw(context) {
            context.drawImage(
                this.img,
                this.frameX * this.dWidth + BASE_SPRITE_X_OFFSET,
                this.frameY * this.dHeight + BASE_SPRITE_Y_OFFSET,
                this.sWidth,
                this.sHeight,
                this.x,
                this.y,
                this.dWidth,
                this.dHeight
            )

        }
    }

    class level2Platform {
        constructor(x, y, width, height) {
            this.x = x
            this.y = y
            this.width = width
            this.height = height
            this.img = document.getElementById("platform")
            this.frameX = 1
            this.frameY = 0
            this.sWidth = 60
            this.sHeight = 100
            this.dWidth = width
            this.dHeight = height
            this.speedY = 1
            this.reseted = false
        }

        resetPosition() {
            this.y = -this.height
            this.x = Math.floor(Math.random() * (canvas.width - this.width)) 
        }
    
        update(gameHeight) {
            this.y += this.speedY
    
            if (this.y > gameHeight) {
                this.resetPosition()
            }
        }

        draw(context) {
            context.drawImage(
                this.img,
                this.frameX * this.dWidth + BASE_SPRITE_X_OFFSET,
                this.frameY * this.dHeight + BASE_SPRITE_Y_OFFSET,
                this.sWidth,
                this.sHeight,
                this.x,
                this.y,
                this.dWidth,
                this.dHeight
            )

        }
    }

    class Player {
        constructor(gameHeight, gameWidth) {
            this.gameHeight = gameHeight
            this.gameWidth = gameWidth
            this.width = 90
            this.height = 120
            this.x = 0
            this.y = this.gameHeight - this.height
            this.vx = 0
            this.vy = 0
            this.weight = 1
            this.frameX = 0
            this.frameY = 0
            this.sWidth = 90
            this.sHeight = 132
            this.dWidth = 102
            this.dHeight = 153
            this.myImg = document.getElementById("player")
            this.onPlatform = false
            this.onLevel = 1
        }

            checkCollision(coin) {
                return (
                    this.x < coin.x + coin.width &&
                    this.x + this.width > coin.x &&
                    this.y < coin.y + coin.height &&
                    this.y + this.height > coin.y
                )
            }

        isOnGround() {
            this.onGround = true
            return this.y === this.gameHeight - this.height
        }

        isOnPlatform(platform) {
            return (
                this.x + this.width > platform.x &&
                this.x < platform.x + platform.width &&
                this.y + this.height <= platform.y &&
                this.y + this.height + this.vy >= platform.y
            )
        }

        draw(context) {
            context.drawImage(
                this.myImg,
                this.frameX * this.dWidth + BASE_SPRITE_X_OFFSET,
                this.frameY * this.dHeight + BASE_SPRITE_Y_OFFSET,
                this.sWidth,
                this.sHeight,
                this.x,
                this.y,
                this.dWidth,
                this.dHeight
            )
        }

        checkCollision(portal) {
            return (
                this.x < portal.x + portal.width &&
                this.x + this.width > portal.x &&
                this.y < portal.y + portal.height &&
                this.y + this.height > portal.y 
            )
        }

        update(input, platforms = [], coins = []) {
            let offset = 0
            if (input.keys.includes("d")) {
                this.vx = 5
                this.frameX = 0
                this.frameY = 3
                if(gameFrame % staggerFrame === 0){
                    if(this.frameX<3){
                        this.frameX++
                    }else{
                        this.frameX = 0
                    }
                }
            } else if (input.keys.includes("a")) {
                this.vx = -5
                this.frameX = 1
                this.frameY = 2
                if(gameFrame % staggerFrame === 0){
                    if(this.frameX<3) {
                        this.frameX++
                    }else {
                        this.frameX = 0
                    }
                }
            } else {
                this.vx = 0
            }

            this.x += this.vx

            if (input.keys.includes("w") && (this.isOnGround() || this.onPlatform)) {
                sfx.jump.play()
                this.vy = -25
                this.frameX = 1
                this.frameY = 0
            }
            if(this.vx === 0 && this.vy === 0) {
                this.frameX = 0
                this.frameY = 0
            }

            this.onPlatform = false
            if(this.y < this.gameHeight / 3) {
                offset = 2
            }
            platforms.forEach((platform) => {
                platform.y += offset
                if (this.isOnPlatform(platform)) {
                    this.onPlatform = true
                    this.vy = 0
                    platform.y = platform.y - 2
                    this.y  = platform.y - this.height 
                }
            })

            if (!this.isOnGround() && !this.onPlatform) {
                this.vy += this.weight
            }

            this.y += this.vy

            if (this.x < 0) this.x = 0
            else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width

            if (this.y > this.gameHeight - this.height) {
                this.y = this.gameHeight - this.height
            }

            coins.forEach((coin) => {
                if(this.checkCollision(coin) && !coin.collected) {
                    score+=1
                    coin.changePosition(this.gameWidth, this.gameHeight) 
                }
            })

            if (!this.soundPlayed && portal.shown === true) {
                sfx.spawn.play()
                this.soundPlayed = true
            }

            if(this.checkCollision(portal) && portal.shown === true) {
                player.onLevel = 2
                platforms.length = 0
                coins.length = 0
            }
        }
    }

    class InputHandler {
        constructor() {
            this.keys = []
            document.body.addEventListener("keydown", (e) => {
                if (["w", "a", "d"].includes(e.key) && this.keys.indexOf(e.key) === -1) {
                    this.keys.push(e.key)
                }
            })
            document.body.addEventListener("keyup", (e) => {
                if (["w", "a", "d"].includes(e.key) && this.keys.indexOf(e.key) !== -1) {
                    this.keys.splice(this.keys.indexOf(e.key), 1)
                }
            })
        }
    }
    let gameFrame = 0
    const staggerFrame = 5

    const input = new InputHandler()
    const player = new Player(canvas.height, canvas.width)
    const background = new Background(canvas.width, canvas.height)
    const level2 = new Level2(canvas.width, canvas.height)

    const platforms = [
        new Platform(100, 400, 100, 20),
        new Platform(700, 450, 100, 20),
        new Platform(570, 300, 100, 20),
        
    ]

    const coins = [
        new Coin(470, 550, 50, 50),
        new Coin(700, 400, 50, 50),
    ]

    const portal = new Portal(300, 525, 200, 200)
    
    

    let sfx = {
        jump: new Howl({
            src: '/2DPlatformer/sfx/cartoon-jump-6462.mp3',
            volume: 0.5
        }),
        collect: new Howl({
            src: '/2DPlatformer/sfx/coin-257878.mp3',
            volume: 0.5
        }),
        spawn: new Howl({
            src: '/2DPlatformer/sfx/portal-phase-jump-6355.mp3',
            volume: 0.6
        })

    }

    function displayScore() {
        const scoreDisplay = document.getElementById("scoreDisplay")
        scoreDisplay.textContent = "Score: " + score
    }

    function displayGoal() {
        const goalDisplay = document.getElementById("goalScore")
        goalDisplay.textContent = "Goal: Collect 15 coins"
    }

    const debugPlayer = document.getElementById("playerDebug")
    const debugBackground = document.getElementById("backgroundDebug")
    const debugPlatform = document.getElementById("platformDebug")
    const debugLevel2 = document.getElementById("level2Debug")
    
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        if(player.onLevel === 1) {
            background.draw(ctx)
            background.update(player)
            platforms.forEach((platform) => {
                platform.update(canvas.height) 
                platform.draw(ctx) 
            })
            player.draw(ctx)
            player.update(input, platforms, coins, portal)
        
            
            coins.forEach((coin) => coin.draw(ctx))
            if(score >= 15) {
            portal.draw(ctx)
            }
        }
        if(player.onLevel === 2) {

            const level2Platforms = [
                new level2Platform(100, 400, 100, 20),
                new level2Platform(400, 100, 100, 20),
                new level2Platform(600, 300, 100, 20),
            ]

            ctx.clearRect(0, 0, canvas.width, canvas.height)
            level2.draw(ctx)
            level2.update(player)

            level2Platforms.forEach((platform) => {
                platform.update(canvas.height)
                platform.draw(ctx)
            })
            player.draw(ctx)
            player.update(input, level2Platforms,)
        }

        debugPlayer.textContent = Object.keys(player).reduce((acc, curr) => acc += `${curr} = ${player[curr]}, `, '')
        debugBackground.textContent = Object.keys(background).reduce((acc, curr) => acc += `${curr} = ${background[curr]}, `, '')
        if(platforms.length > 0) {
        debugPlatform.textContent = Object.keys(platforms[0]).reduce((acc, curr) => acc += `${curr} = ${platforms[0][curr]}, `, '')
        }
        debugLevel2.textContent = Object.keys(level2).reduce((acc, curr) => acc += `${curr} = ${level2[curr]}, `, '')

        displayGoal()
        displayScore()
        requestAnimationFrame(animate)
        gameFrame++
    }

    animate()
}