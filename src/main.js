import "./style.css";
import MazeBoard from "./classes/MazeBoard.js";

const board = new MazeBoard();
board.append();
board.drawRectangle();
board.addKeyboardEvents();
