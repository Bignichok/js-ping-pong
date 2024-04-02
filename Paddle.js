
const SPEED = 0.02

export default class Paddle {
	constructor(paddleRef) {
		this.paddleRef = paddleRef
		this.reset()
	}

	get position() {
		return parseFloat(getComputedStyle(this.paddleRef).getPropertyValue("--position"))
	}

	set position(value) {
		this.paddleRef.style.setProperty("--position", value)
	}

	rect() {
		return this.paddleRef.getBoundingClientRect()
	}

	reset() {
		this.position = 50
	}

	update(delta, ballHeight) {
		this.position += SPEED * delta * (ballHeight - this.position)
	}
}
