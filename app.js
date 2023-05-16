import * as PIXI from './node_modules/pixi.js/dist/pixi.mjs'
import { Container } from './node_modules/pixi.js/dist/pixi.mjs'
import { brick, pad, velocity } from './gameElement.js'

//import { Application, Assets, Sprite } from './node_modules/pixi.js/dist/pixi.mjs';
const screen = {
    width: 1000,
    height: 700,
}
let app = new PIXI.Application({ width: screen.width, height: screen.height })
document.body.appendChild(app.view)

const container = new Container()
app.stage.addChild(container)
let wall = [];

const ball = new PIXI.Graphics()
ball.x = 230
ball.y = 320
ball.width = 5
ball.beginFill(0xff0000)
ball.drawCircle(ball.x, ball.y, 10)
ball.endFill()
container.addChild(ball)

generateBlocks()
generatePad()
function step() {
    moveBall()
}

function generateBlocks() {
    for (let row = 0; row < brick.rows; row++) {
        for (let column = 0; column < brick.column; column++) {
            const myBrick = new PIXI.Graphics()
            myBrick.beginFill(0xffff00)
            ;(myBrick.x = 50 + row * 50),
                (myBrick.y = 50 / 2 + column * 50),
                (myBrick.size = 30)
            myBrick.lineStyle(5, 0xff0000)
            myBrick.drawRect(myBrick.x, myBrick.y, myBrick.size, myBrick.size)
            container.addChild(myBrick)
            wall.push(myBrick)
        }
    }
}

function generatePad() {
    let graphics = new PIXI.Graphics()
    graphics.beginFill(0xffff00)

    //graphics.lineStyle(5, 0xff0000)
    graphics.drawRect(pad.x, pad.y, pad.width, pad.height)
    container.addChild(graphics)
}

function generateBall() {}

function moveBall() {
    console.log(ball.x)
    ball.x -= velocity.x
    ball.y -= velocity.y
    if (ball.x + ball.width > app.screen.width || ball.x < 0) {
        velocity.x *= -1; 
        }
      if (ball.y + ball.height > app.screen.height || ball.y < 0) {
        velocity.y = -1; 
      }
    }

app.ticker.add(step)
