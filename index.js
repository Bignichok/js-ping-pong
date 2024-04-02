import Ball from "./Ball.js"
import Paddle from "./Paddle.js"


const playerScore = document.getElementById("player-score")
const computerScore = document.getElementById("computer-score")

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))

let lastTime
const update = (time) => {
	if (lastTime != null) {
		const delta = time - lastTime
		ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
		computerPaddle.update(delta, ball.y)
		playerPaddle.update(delta, ball.y)
		const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))
		document.documentElement.style.setProperty("--hue", hue + delta * 0.01)
		if (isLose()){
			handleLose()
		} 
	}

	lastTime = time
	window.requestAnimationFrame(update)
}

const isLose = () => {
	const rect = ball.rect()
	return rect.right >= window.innerWidth || rect.left <= 0
}

const handleLose = () => {
	const rect = ball.rect()
	if (rect.right >= window.innerWidth) {
		playerScore.textContent = parseInt(playerScore.textContent) + 1
	} else {
		computerScore.textContent = parseInt(computerScore.textContent) + 1
	}
	ball.reset()
	computerPaddle.reset()
}

// document.addEventListener("mousemove", e => {
// 	playerPaddle.position = (e.y / window.innerHeight) * 100
// })

window.requestAnimationFrame(update)
