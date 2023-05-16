import { player } from "./pad.js"

export function addKeybordMovement(app) {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    function handleKeyDown(event) {
        console.log('Pressed:')
        if (event.key == 'ArrowLeft' || event.key == 'a') {
            isArrowLeftPressed = true
        }
        if (event.key == 'ArrowRight' || event.key == 'd') {
            isArrowRightPressed = true
        }
    }
}

let isArrowRightPressed = false
let isArrowLeftPressed = false

function handleKeyUp(event) {
    if (event.key == 'ArrowLeft' || event.key == 'a') {
        isArrowLeftPressed = false
    }
    if (event.key == 'ArrowRight'|| event.key == 'd') {
        isArrowRightPressed = false
    }
}

export function movePad() {
    if (isArrowLeftPressed && player.x > 0) {
        player.x -= 10
    }
    if (isArrowRightPressed && player.x < 1000 - player.width) {
        player.x += 10
    }
}
