import * as PIXI from './node_modules/pixi.js/dist/pixi.mjs'
import { Container } from './node_modules/pixi.js/dist/pixi.mjs'
import { brick,  velocity } from './gameElement.js'
import { addKeybordMovement, movePad } from './keyboardPad.js'
import { player } from './pad.js'

//import { Application, Assets, Sprite } from './node_modules/pixi.js/dist/pixi.mjs';
const screen = {
    width: 1000,
    height: 700,
}
let app = new PIXI.Application({ width: screen.width, height: screen.height })
document.body.appendChild(app.view)

const container = new Container()
container.width = screen.width
container.height = screen.height
app.stage.addChild(container)
let wall = []

const ball = new PIXI.Graphics()
ball.x = 460
ball.y = 640
ball.width = 10
ball.beginFill(0xff0000)
ball.drawCircle(0, 0, 10)
ball.endFill()
ball.position.set(ball.x, ball.y)
container.addChild(ball)
container.addChild(player)
generateBlocks()


addKeybordMovement(app)
function step() {
    movePad()
    moveBall()
}

function generateBlocks() {
    for (let row = 0; row < brick.rows; row++) {
        for (let column = 0; column < brick.column; column++) {
            const myBrick = new PIXI.Graphics()
            myBrick.beginFill(0xffff00)
            myBrick.x = 100 + row * 100
            myBrick.y = 100 / 2 + column * 100
            myBrick.size = 30
            myBrick.lineStyle(5, 0xff0000)
            myBrick.drawRect(0, 0, myBrick.size, myBrick.size)
            myBrick.endFill()
            myBrick.position.set(myBrick.x, myBrick.y)
            container.addChild(myBrick)
            wall.push(myBrick)
        }
    }
}

function moveBall() {
    ball.x += velocity.x
    ball.y += velocity.y
    if (ball.x + ball.width / 2 > app.screen.width || ball.x < ball.width / 2) {
        velocity.x *= -1
    }
    if (
        ball.y + ball.height / 2 > app.screen.height ||
        ball.y < ball.width / 2
    ) {
        velocity.y *= -1
    }
    if (ball.x + ball.width/2 > player.x && 
        ball.x < player.x + player.width &&
        ball.y + ball.height/2 > player.y &&
        ball.y < player.y + player.height/2
    ) {
        if(velocity.x < 0 && velocity.y > 0 ) {
            velocity.y *= -1
        }
        if(velocity.x > 0 && velocity.y > 0) {
            velocity.y *= -1
        }
    }
    wall.forEach((bricks, i) => {
        if(
            bricks.x + 30 > ball.x - ball.width/2&&
            bricks.x - 0 < ball.x + ball.width/2 &&
            bricks.y + 30 > ball.y - ball.height/2 &&
            bricks.y - 0 < ball.y + ball.height/2
        ) {
            if (bricks.x+5 < ball.x && ball.x > bricks.x-5) {
                velocity.x *= -1
            } 
            if (bricks.y+5 < ball.y && ball.y > brick.x-5) {
                velocity.y *= -1
            }
                //container.removeChild(bricks)
            
        }
    })
}
app.ticker.add(step)
