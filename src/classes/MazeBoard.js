export default class MazeBoard {
  constructor() {
    this.isAppended = false;

    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.size = 400;

    this.setSizeScreen();

    this.isArrowRightDown = false;
    this.isArrowLeftDown = false;

    // Renamed from skew to tilt, and tracking degrees
    this.tiltY = 0;
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

    // Apply a CSS 3D transformation to the canvas DOM element
    // perspective() gives it realistic depth. rotateY tilts it on the vertical axis.
    this.canvas.style.transform = `perspective(800px) rotateY(${this.tiltY}deg)`;
  }

  addKeyboardEvents() {
    window.addEventListener("keydown", (e) => {
      if (e.code == "ArrowRight") {
        this.isArrowRightDown = true;
      } else if (e.code == "ArrowLeft") {
        this.isArrowLeftDown = true;
      }
    });
    window.addEventListener("keyup", (e) => {
      if (e.code == "ArrowRight") {
        this.isArrowRightDown = false;
      } else if (e.code == "ArrowLeft") {
        this.isArrowLeftDown = false;
      }
    });
  }

  animationLoop() {
    const loopCallback = () => {
      if (this.isArrowRightDown && this.tiltY < 30) {
        this.tiltY += 1.5;
      }
      if (this.isArrowLeftDown && this.tiltY > -30) {
        this.tiltY -= 1.5;
      }

      if (!this.isArrowRightDown && !this.isArrowLeftDown) {
        this.tiltY *= 0.9;
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
