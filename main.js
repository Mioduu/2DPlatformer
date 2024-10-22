window.addEventListener("load",()=> {
    const canvas = document.getElementById("gameCanva")
    const ctx = canvas.getContext("2d")
    canvas.width = 800
    canvas.height = 720
    const BASE_SPRITE_X_OFFSET = 10
    const BASE_SPRITE_Y_OFFSET = 30
    class Player {
        constructor(gameHeight, gameWidth) { 
            this.gameHeight = gameHeight
            this.gameWidth = gameWidth
            this.width = 90
            this.height = 120
            this.img = document.getElementById("player")
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
        }

        
        

        isOnGround()  {
            return this.y === this.gameHeight - this.height 
        }

        draw(context) {
            context.fillStyle = "red"
            context.drawImage(
                this.myImg,
                this.frameX * this.dWidth + BASE_SPRITE_X_OFFSET, 
                this.frameY * this.dHeight + BASE_SPRITE_Y_OFFSET, 
                this.sWidth,
                this.sHeight,
                this.x,
                this.y,
                this.dWidth,
                this.dHeight)
        }
        isColliding(platform) {
            if(
                (this.x + this.width / 4 >= platform.position.x - platform.width / 2) &&
                (this.x - this.width / 2 <= platform.position.x + platform.width / 2) &&
                (this.y + this.height >= platform.position.y - platform.height / 2) &&
                (this.y + this.height <= platform.position.y + platform.height / 2)
            ) {
                return true
            }
            return false
            
        }            

        update(input) {
            if(input.keys.includes("d")) {
                this.vx = 3
                this.frameX = 0
                this.frameY = 3
            }  else if((input.keys.includes("a"))) {
                this.vx = -3
                this.frameX = 1
                this.frameY = 2
            }
               else {
                this.vx = 0
                this.frameX = 0
                this.frameY = 0
            }
            this.x += this.vx
             
            if(input.keys.includes("w")) {
                this.vy = -25
                this.frameX = 1
                this.frameY = 0
            }  else {
                this.vy = 0
            }

            if(this.x<0) {
                this.x = 0
            } else if(this.x>this.gameWidth - this.width) {
                this.x = this.gameWidth - this.width
            }

            if(this.y > this.gameHeight - this.height) {
                this.y = this.gameHeight - this.height
            }
            if(!this.isOnGround() && !this.isColliding(platform)) {
                this.vy += this.weight
                this.weight += 1
            } else if(this.isOnGround() || this.isColliding(platform)) {
                this.weight = 1
                
            }
            this.y += this.vy
        }        
    }
    class InputHandler {
        constructor() {
            this.keys = [] 
            document.body.addEventListener("keydown", (e) => {
                if((e.key === "w" || e.key === "a" || e.key === "d") && this.keys.indexOf(e.key) === -1 ) {
                    this.keys.push(e.key)
                    console.log(this.keys)
                }
            
         
            })    
            document.body.addEventListener("keyup", (e) => {
                if((e.key === "w" || e.key === "a" || e.key === "d") && this.keys.indexOf(e.key) !== -1) {
                    this.keys.splice(this.keys.indexOf(e.key),1)
                    console.log(this.keys)
                }
            })
            
        }
    }
    class Platform {
        constructor() {
            this.position = {
                x: 400,
                y: 500
            }
            this.width = 150
            this.height = 20
        }
        draw() {
            ctx.fillStyle = "red"
            ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
        }
    }

    const platform = new Platform()
    const input = new InputHandler()
    const player = new Player(canvas.height, canvas.width)
    function animate() {
        ctx.clearRect(0,0,canvas.width,canvas.height)
        player.draw(ctx)
        player.update(input)
        platform.draw()
        
        requestAnimationFrame(animate)

    }
    animate()
    
})  

