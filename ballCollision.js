import * as PIXI from '../node_modules/pixi.js/dist/pixi.mjs'
import {  velocity, brick, } from './gameElement.js';
import { ball, } from './gameObj.js';
import { player } from './pad.js';

export let lives = 5;
export let wall = [];
let velocityCollisionPad;

export function generateBlocks(container) {
    for (let row = 0; row < brick.rows; row++) {
        for (let column = 0; column < brick.column; column++) {
            const myBrick = new PIXI.Graphics();
            myBrick.beginFill(0xffff00);
            myBrick.x = 100 + row * 100;
            myBrick.y = 100 / 2 + column * 100;
            myBrick.size = 30;
            //myBrick.lineStyle(5, 0xff0000)
            myBrick.drawRect(0, 0, myBrick.size, myBrick.size);
            myBrick.endFill();
            myBrick.position.set(myBrick.x, myBrick.y);
            container.addChild(myBrick);
            wall.push(myBrick);
        }
    }
}

export function moveBall(app, container) {
    ball.x += velocity.x;
    ball.y += velocity.y;

    collisionScreenAndBall();
    collisionPlatformAndBall();
    ballFell();

    let newWall = wall.filter(collisionBrickAndBall);
    wall = newWall;


function collisionPlatformAndBall() {
    if (
        ball.x + ball.width / 2 > player.x &&
        ball.x < player.x + player.width &&
        ball.y + ball.height / 2 > player.y &&
        ball.y < player.y + player.height / 2
    ) {
        if (velocity.x < 0 && velocity.y > 0) {
            velocityCollisionPad =
                (player.x - ball.x + player.width / 2 + 2) * 0.05 * -1;
            velocity.x += velocityCollisionPad;
            velocity.y *= -1;
        }
        if (velocity.x > 0 && velocity.y > 0) {
            velocityCollisionPad =
                (player.x - ball.x + player.width / 2 + 2) * 0.05 * -1;
            velocity.x += velocityCollisionPad;
            velocity.y *= -1;
        }
    }
}
function ballFell() {
    if (ball.y >= 690) {
        lives -= 1;
    }
}

function collisionScreenAndBall() {
    if (ball.x + ball.width / 2 > app.screen.width || ball.x < ball.width / 2) {
        velocity.x *= -1;
    }
    if (
        ball.y + ball.height / 2 > app.screen.height ||
        ball.y < ball.width / 2
    ) {
        velocity.y *= -1;
    }
}
function collisionBrickAndBall(bricks) {
    if (
        bricks.x + bricks.width > ball.x - ball.width / 2 &&
        bricks.x < ball.x + ball.width / 2 &&
        bricks.y + bricks.height > ball.y - ball.height / 2 &&
        bricks.y < ball.y + ball.height / 2
    ) {
        if (bricks.x < ball.x && ball.x < bricks.x + bricks.width) {
            velocity.y *= -1;
            container.removeChild(bricks);
            return false;
        }
        if (bricks.y < ball.y && ball.y < bricks.y + bricks.width) {
            velocity.x *= -1;
            container.removeChild(bricks);
            return false;
        }
        velocity.y *= -1;
        velocity.x *= -1;
        container.removeChild(bricks);
        return false;
    }
    return true;
}
}