export default class MazeBoard {
  constructor() {
    this.isAppended = false;
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.size = 400;

    this.setSizeScreen();

    // Renamed from skew to tilt, and tracking degrees
    this.tiltY = 0;
    this.tiltX = 0;

    this.keydown = new Set();
  }

  setSizeScreen() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  append() {
    if (this.isAppended) {
      return;
    }
    document.body.append(this.canvas);
    this.isAppended = true; // Added this so the check actually works!
  }

  drawRectangle() {
    // Draw the board normally in 2D
    this.context.fillStyle = "red";
    this.context.fillRect(
      window.innerWidth / 2 - this.size / 2,
      window.innerHeight / 2 - this.size / 2,
      this.size,
      this.size,
    );
    this.canvas.style.transform = `perspective(800px) rotateY(${this.tiltY}deg) rotateX(${this.tiltX}deg)`;
  }

  addKeyboardEvents() {
    window.addEventListener("keydown", (e) => {
      this.keydown.add(e.code);
    });
    window.addEventListener("keyup", (e) => {
      this.keydown.delete(e.code);
    });
  }

  isDown(code) {
    return this.keydown.has(code);
  }

  isNotDown(code) {
    return !this.isDown(code);
  }

  animationLoop() {
    const loopCallback = () => {
      if (this.isDown("ArrowRight") && this.tiltY < 30) {
        this.tiltY += 1.5;
      }

      if (this.isDown("ArrowUp") && this.tiltX < 30) {
        this.tiltX += 1.5;
      }

      if (this.isDown("ArrowDown") && this.tiltX > -30) {
        this.tiltX -= 1.5;
      }

      if (this.isDown("ArrowLeft") && this.tiltY > -30) {
        this.tiltY -= 1.5;
      }

      if (this.isNotDown("ArrowRight") && this.isNotDown("ArrowLeft")) {
        this.tiltY *= 0.9;
      }

      if (this.isNotDown("ArrowUp") && this.isNotDown("ArrowDown")) {
        this.tiltX *= 0.9;
      }

      this.cleanBoard();
      this.drawRectangle();

      requestAnimationFrame(loopCallback);
    };
    requestAnimationFrame(loopCallback);
  }

  cleanBoard() {
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
}
