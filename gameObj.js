import * as PIXI from '../node_modules/pixi.js/dist/pixi.mjs'
import { screen } from './gameElement.js'

export const ball = new PIXI.Graphics()
ball.x = Math.floor(Math.random()*800)
ball.y = 680
ball.width = 10
ball.height = 10
ball.beginFill(0xff0000)
ball.drawCircle(0, 0, 10)
ball.endFill()
ball.position.set(ball.x, ball.y)

export const endGameTextStyle = new PIXI.TextStyle({
    fill: ['#ffffff', '#00ff99'],
})


export let text = new PIXI.Text('0.0', endGameTextStyle)
text.x = 10 + text.width
text.y = 0 + text.width



export const heart = PIXI.Sprite.from('./heart.png')
heart.width = 20
heart.height = 20
heart.x = screen.width - heart.width - 20 - 10
heart.y = 0 + heart.width