window.addEventListener("load",()=> {
    const canvas = document.getElementById("gameCanva")
    const ctx = canvas.getContext("2d")
    canvas.width = 800
    canvas.height = 720
    
    class Player {
        constructor(gameHeight, gameWidth) { 
            this.gameHeight = gameHeight
            this.gameWidth = gameWidth
            this.width = 200
            this.height = 200
            this.img = document.getElementById("player")
            this.x = 0
            this.y = this.gameHeight - this.height
            this.speed = 0
            
        }
        draw(context) {
            context.fillStyle = "red"
            context.fillRect(this.x,this.y,this.height,this.width)
            // context.drawImage(this.img,this.x,this.y)
        }
        update(input) {
            if(input.keys.includes("d")) {
                this.speed = 3
            }  else {
                this.speed = 0
            }
            this.x += this.speed

            if(input.keys.includes("a")) {
                this.speed = 3
            }  else {
                this.speed = 0
            }
            this.x -= this.speed
            
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
        // Eventlistener który doda do keys naciśnięty klawisz 
        // Eventlistener który usunie klawisz który puścisz
        // "onkeydown" "onkeyup" 
    }
    const input = new InputHandler()
    const player = new Player(canvas.height, canvas.width)
    function animate() {
        ctx.clearRect(0,0,canvas.width,canvas.height)
        player.draw(ctx)
        player.update(input)
        requestAnimationFrame(animate)

    }
    
    animate()
    
})  

