export default class MazeBoard {
  constructor() {
    this.isAppended = false;

    this.canvas = document.createElement("canvas");
    this.setSizeScreen();
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
}
