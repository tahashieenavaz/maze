export default class MazeBoard {
  constructor() {
    this.isAppended = false;

    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.size = 400;

    this.setSizeScreen();

    this.isArrowRightDown = false;
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
  }

  drawRectangle() {
    this.context.save();
    this.context.translate(
      innerWidth / 2 - this.size / 2,
      innerHeight / 2 - this.size / 2,
    );
    this.context.transform(1, -0.1, 0, 1, 0, 0);
    this.context.fillStyle = "red";
    this.context.fillRect(0, 0, this.size, this.size);
    this.context.restore();
  }

  addKeyboardEvents() {
    window.addEventListener("keydown", (e) => {
      if (e.code == "ArrowDown") {
        this.isArrowRightDown = true;
      }
    });
    window.addEventListener("keyup", (e) => {
      if (e.code == "ArrowDown") {
        this.isArrowRightDown = false;
      }
    });
  }
}
