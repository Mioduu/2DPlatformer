window.addEventListener("load", () => {
    const canvas = document.getElementById("gameCanva")
    const ctx = canvas.getContext("2d")
    canvas.width = 800
    canvas.height = 720
    const BASE_SPRITE_X_OFFSET = 10
    const BASE_SPRITE_Y_OFFSET = 30
    let score = 0

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

    class Platform {
        constructor(x, y, width, height,speedX,speedY,limitX,limitY) {
            this.x = x
            this.y = y
            this.width = width
            this.height = height
            this.startX = this.x
            this.startY = this.y
            this.img = document.getElementById("platform")
            this.frameX = 1
            this.frameY = 0
            this.sWidth = 60
            this.sHeight = 100
            this.dWidth = width
            this.dHeight = height
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

        update(input, platforms) {
            let offset = 0
            if (input.keys.includes("d")) {
                this.vx = 5
                this.frameX = 0
                this.frameY = 3
            } else if (input.keys.includes("a")) {
                this.vx = -5
                this.frameX = 1
                this.frameY = 2
            } else {
                this.vx = 0
            }
            this.x += this.vx

            if (input.keys.includes("w") && (this.isOnGround() || this.onPlatform)) {
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
                    platform.y = platform.y - 1
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

    const input = new InputHandler()
    const player = new Player(canvas.height, canvas.width)
    const background = new Background(canvas.width, canvas.height)

    // Definiujemy platformy w starszym stylu bez koloru
    const platforms = [
        new Platform(470, 600, 150, 20),
        new Platform(700, 450, 150, 20),
        new Platform(570, 300, 100, 20),
        new Platform(500, 300, 100, 20),
        new Platform(300, 300, 100, 20),
        new Platform(200, 300, 100, 20),
        new Platform(0, 200, 120, 20)
    ]
    function displayScore(context) {
        context.fillStyle = "black"
        context.font = "40px Bold Font"
        context.fillText("Score: " + score, 20, 50)

    }

    const debugPlayer = document.getElementById("playerDebug")
    const debugBackground = document.getElementById("backgroundDebug")
    const debugPlatform = document.getElementById("platformDebug")
    

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        background.draw(ctx)
        background.update(player)
        player.draw(ctx)
        player.update(input, platforms)
        platforms.forEach((platform) => platform.draw(ctx))
        displayScore(ctx)
        debugPlayer.textContent = Object.keys(player).reduce((acc, curr) => acc += `${curr} = ${player[curr]}, `, '')
        debugBackground.textContent = Object.keys(background).reduce((acc, curr) => acc += `${curr} = ${background[curr]}, `, '')
        debugPlatform.textContent = Object.keys(platforms[0]).reduce((acc, curr) => acc += `${curr} = ${platforms[0][curr]}, `, '')
        requestAnimationFrame(animate)
    }

    animate()
})
