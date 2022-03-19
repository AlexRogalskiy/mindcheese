import MindCheese from "./MindCheese";
import { EventType } from "./MindmapConstants";

export default class UndoManager {
  private readonly mindCheese: MindCheese;
  private undoStack: any[];
  private readonly undoStackLimit: number;

  constructor(jm: MindCheese, undoStackLimit = 10000) {
    this.mindCheese = jm;
    this.undoStack = [];
    this.undoStackLimit = undoStackLimit;
  }

  init(): void {
    this.mindCheese.addEventListener(EventType.BeforeEdit, this.recordSnapshot.bind(this));
  }

  recordSnapshot() {
    if (this.undoStack.length > this.undoStackLimit) {
      console.log(`UndoManager: callback event. too much stacks.`);
      this.undoStack.shift();
    }

    console.log(`UndoManager: callback event pushing.`);
    this.undoStack.push(this.mindCheese.getNodeTree());
  }

  undo(): void {
    const item = this.undoStack.pop();
    if (item) {
      const data = item;
      console.log(`UndoManager: undo. data=${data}`);
      this.mindCheese.showNodeTree(data);
    } else {
      console.log(`UndoManager: undo. stack is empty.`);
    }
  }
}
