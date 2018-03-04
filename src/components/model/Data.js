import Task from "./Task.js";
const KEY = "key";

export default class Data {
  constructor(storage) {
    this._storage = storage;
    this._listener = {};
  }

  set listener(listener) {
    this._listener = listener;
  }

  add(task) {
    this._storage.push(task);
    console.log("add: " + task.id);
    localStorage.setItem(KEY, JSON.stringify(this._storage));
    this._listener.onDataAdded(task);
  }

  get all() {
    return this._storage;
  }

  delete(taskId) {
    let index = 0;
    let itemIndex = 0;
    this._storage.forEach(function(item) {
      if (item.id == taskId) {
        itemIndex = index;
      }
      index++;
    });

    this._storage.splice(itemIndex, 1);
    let data = JSON.stringify(this._storage);
    localStorage.setItem(KEY, data);
    this._listener.onDataDeleted(taskId);
  }

  deleteAll() {
    return (this._storage = []);
  }

  marks(taskId, checked) {
    var index = 0;

    var itemIndex = 0;
    this._storage.forEach(function(item) {
      if (item.id == taskId) {
        itemIndex = index;
      }
      index++;
    });
    this._storage[itemIndex].isCompleted = checked;
    console.log("mark: " + taskId);
    let data = JSON.stringify(this._storage);
    localStorage.setItem(KEY, data);
    this._listener.onDataMarked(taskId, checked);
  }

  put(array) {
    for (let i = 0; i < array.length; i++) {
      let item = array[i];
      this._storage.push(new Task(item._isCompleted, item._name, item._id));
    }
  }
}
