import * as PIXI from './node_modules/pixi.js/dist/pixi.mjs'
import { Container } from './node_modules/pixi.js/dist/pixi.mjs'
import { brick, pad,  } from './gameElement.js'

//import { Application, Assets, Sprite } from './node_modules/pixi.js/dist/pixi.mjs';
const screen = {
    width: 1000,
    height: 700,
}
let app = new PIXI.Application({ width: screen.width, height: screen.height })
window.addEventListener('click', () => {
    document.body.appendChild(app.view)
    app.ticker.add(step)
})
const container = new Container()
app.stage.addChild(container)

let ball = {
    x: 460,
    y: 645,
    radius: 5,
}
generateBall(ball)
function step() {
    generateBlocks()
    generatePad()
    //renderball(firstBall)
    

    moveBall(ball)
}

function generateBlocks() {
    for (let row = 0; row < brick.rows; row++) {
        for (let column = 0; column < brick.column; column++) {
            let graphics = new PIXI.Graphics()
            graphics.beginFill(0xffff00)
            graphics.lineStyle(5, 0xff0000)
            graphics.drawRect(
                brick.backdown + row * brick.backdown,
                brick.backdown / 2 + column * brick.backdown,
                brick.height,
                brick.width
            )
            container.addChild(graphics)
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

function generateBall(ball) {
    const circle = new PIXI.Graphics()
    circle.beginFill(0xffffff)
    circle.drawCircle(ball.x, ball.y, ball.radius)
    circle.endFill()
    container.addChild(circle)
    container.circle = circle
}

function renderball(ball) {
    
}

function moveBall() {
    let vx = 1
    container.circle.x += vx
    container.circle.y -= vx
    console.log(container.circle.x > ball.x)
    console.log(container.circle.x)
    console.log(ball.x)
    if(container.circle.x > ball.x) {
        vx *= -1;
    }

}