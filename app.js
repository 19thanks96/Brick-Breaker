import * as PIXI from './node_modules/pixi.js/dist/pixi.mjs'
import { Container } from './node_modules/pixi.js/dist/pixi.mjs'
import { brick, velocity } from './gameElement.js'
import { addKeybordMovement, movePad } from './keyboardPad.js'
import { player } from './pad.js'

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
let elapsed = 0.0
let wall = []
const ball = new PIXI.Graphics()
ball.x = 460
ball.y = 640
ball.width = 10
ball.height = 10
ball.beginFill(0xff0000)
ball.drawCircle(0, 0, 10)
ball.endFill()
ball.position.set(ball.x, ball.y)
container.addChild(ball)
container.addChild(player)
generateBlocks()
const endGameTextStyle = new PIXI.TextStyle({
    fill: ['#ffffff', '#00ff99'],
})
let sec = 0
let text = new PIXI.Text(sec, endGameTextStyle)
text.x = 10 + text.width
text.y = 0 + text.width
container.addChild(text)
let velocityCollisionPad
let lives = 5
const life = new PIXI.Text(lives, endGameTextStyle)
life.x = screen.width - 20 - 10
life.y = 0 + life.width
container.addChild(life)

const heart = PIXI.Sprite.from('./heart.png')
heart.width = 20
heart.height = 20
heart.x = screen.width - heart.width - 20 - 10
heart.y = 0 + heart.width
container.addChild(heart)

addKeybordMovement(app)
function step(delta) {
    elapsed += delta
    movePad()
    moveBall()
    finish(elapsed)
    life.text = lives
}

function generateBlocks() {
    for (let row = 0; row < brick.rows; row++) {
        for (let column = 0; column < brick.column; column++) {
            const myBrick = new PIXI.Graphics()
            myBrick.beginFill(0xffff00)
            myBrick.x = 100 + row * 100
            myBrick.y = 100 / 2 + column * 100
            myBrick.size = 30
            //myBrick.lineStyle(5, 0xff0000)
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

    if (ball.y >= 690) {
        lives -= 1
    }

    if (
        ball.x + ball.width / 2 > player.x &&
        ball.x < player.x + player.width &&
        ball.y + ball.height / 2 > player.y &&
        ball.y < player.y + player.height / 2
    ) {
        if (velocity.x < 0 && velocity.y > 0) {
            velocityCollisionPad =
                (player.x - ball.x + player.width / 2 + 2) * 0.05 * -1
            console.log(velocityCollisionPad)
            velocity.x += velocityCollisionPad
            velocity.y *= -1
        }
        if (velocity.x > 0 && velocity.y > 0) {
            velocityCollisionPad =
                (player.x - ball.x + player.width / 2 + 2) * 0.05 * -1
            console.log(velocityCollisionPad)
            velocity.x += velocityCollisionPad
            velocity.y *= -1
        }
    }
    let newWall = wall.filter((bricks) => {
        if (
            bricks.x + bricks.width > ball.x - ball.width / 2 &&
            bricks.x < ball.x + ball.width / 2 &&
            bricks.y + bricks.height > ball.y - ball.height / 2 &&
            bricks.y < ball.y + ball.height / 2
        ) {
            if (bricks.x < ball.x && ball.x < bricks.x + bricks.width) {
                velocity.y *= -1
                container.removeChild(bricks)
                return false
            }
            if (bricks.y < ball.y && ball.y < bricks.y + bricks.width) {
                velocity.x *= -1
                container.removeChild(bricks)
                return false
            } 
            velocity.y *= -1
            velocity.x *= -1
                container.removeChild(bricks)
                return false
        }
        return true
    })
    wall = newWall
}


function finish(elapsed) {
    sec = Math.floor(elapsed / 60)

    if (wall.length === 0) {
        text.y = screen.height / 2
        ;text.text = `You Win after ${sec} second and have ${lives} lives`
        text.x = screen.width / 2 - text.width/2
        app.ticker.stop()
    } else {
        text.text = sec
    }
}

app.ticker.add(step)
