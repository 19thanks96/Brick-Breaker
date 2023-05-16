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
container.width = screen.width
container.height = screen.height
app.stage.addChild(container)
let wall = [];

const ball = new PIXI.Graphics()
ball.x = 460
ball.y = 640
ball.width = 10
ball.beginFill(0xff0000)
ball.drawCircle(0, 0, 10)
ball.endFill()
ball.position.set(ball.x, ball.y)
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
            myBrick.beginFill(0xffff00);
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

function generatePad() {
    let graphics = new PIXI.Graphics()
    graphics.beginFill(0xffff00)

    //graphics.lineStyle(5, 0xff0000)
    graphics.drawRect(pad.x, pad.y, pad.width, pad.height)
    container.addChild(graphics)
}

function generateBall() {}

function moveBall() {
    console.log(ball.y + ball.height)
    console.log(app.screen.height)

    ball.x -= velocity.x
    ball.y -= velocity.y
    if (ball.x + ball.width/2 > app.screen.width || ball.x < ball.width/2) {
        velocity.x *= -1; 
        }
      if (ball.y + ball.height/2 > app.screen.height || ball.y < ball.width/2) {
        velocity.y *= -1; 
      }
    }

app.ticker.add(step)
