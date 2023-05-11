import * as PIXI from './node_modules/pixi.js/dist/pixi.mjs'

//import { Application, Assets, Sprite } from './node_modules/pixi.js/dist/pixi.mjs';
const screen = {
  width: 1000,
  height: 700,
}

let app = new PIXI.Application({ width: screen.width, height: screen.height })
document.body.appendChild(app.view)

setInterval(step, 1000)

function step() {
    
}
