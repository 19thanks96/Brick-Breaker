import * as PIXI from './node_modules/pixi.js/dist/pixi.mjs';
import { Container } from './node_modules/pixi.js/dist/pixi.mjs';
import { screen,  velocity } from './gameElement.js';
import { ball, text, endGameTextStyle, heart } from './gameObj.js';
import { addKeybordMovement, movePad } from './keyboardPad.js';
import { player } from './pad.js';
import { moveBall, generateBlocks, wall, lives} from './ballCollision.js'

let app = new PIXI.Application({ width: screen.width, height: screen.height });
document.body.appendChild(app.view);

const container = new Container();
container.width = screen.width;
container.height = screen.height;
app.stage.addChild(container);

let elapsed = 0.0;
let sec = 0;

container.addChild(ball);

container.addChild(player);

generateBlocks(container);

container.addChild(text);


addKeybordMovement(app);

const life = new PIXI.Text(0, endGameTextStyle);
life.x = screen.width - 20 - 10;
life.y = 0 + life.width;
container.addChild(life);

container.addChild(heart);

function step(delta) {
    elapsed += delta;
    movePad();
    moveBall(app, container);
    finish(elapsed);
    life.text = lives;
}


function finish(elapsed) {
    sec = Math.floor(elapsed / 60);

    if (wall.length === 0) {
        text.y = screen.height / 2;
        text.text = `You Win after ${sec} second and have ${lives} lives`;
        text.x = screen.width / 2 - text.width / 2;
        app.ticker.stop();
    } else {
        text.text = sec;
    }
}

app.ticker.add(step);
