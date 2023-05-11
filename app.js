import * as PIXI from './node_modules/pixi.js/dist/pixi.mjs'
import { Container } from './node_modules/pixi.js/dist/pixi.mjs'

//import { Application, Assets, Sprite } from './node_modules/pixi.js/dist/pixi.mjs';
const screen = {
    width: 1000,
    height: 700,
}

let brick = {
    rows: 8,
    column: 4,
    height: 30,
    width: 30,
    backdown: 100,
}

let app = new PIXI.Application({ width: screen.width, height: screen.height })
document.body.appendChild(app.view)
app.ticker.add(step)

const container = new Container()
app.stage.addChild(container)

function step() {
    generateBlocks()
    generatePad()
    generateBall()
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
            graphics.drawRect(360, 650, 100, 10)
            container.addChild(graphics)
}

function generateBall() {
    const gr  = new PIXI.Graphics();
gr.beginFill(0xffffff);
gr.drawCircle(410, 645, 5);
gr.endFill();
container.addChild(gr)
}