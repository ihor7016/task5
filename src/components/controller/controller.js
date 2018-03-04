import Task from "../model/Task";
export default class Controller {
  constructor(data) {
    this._data = data;
  }

  add(name) {
    this._data.add(new Task(false, name, this.randomId()));
  }

  getAll() {
    return this._data.all;
  }

  delete(taskId) {
    this._data.delete(taskId);
  }

  marks(taskId, checked) {
    this._data.marks(taskId, checked);
  }

  randomId() {
    return Math.floor(Math.random() * 10000000);
  }
}
