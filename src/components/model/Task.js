export default class Task {
  constructor(isCompleted, name, id) {
    this._isCompleted = isCompleted;
    this._name = name;
    this._id = id;
  }

  get isCompleted() {
    return this._isCompleted;
  }

  set isCompleted(isCompleted) {
    this._isCompleted = isCompleted;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  get id() {
    return this._id;
  }

  toString() {
    return `${this.name} ${this.isCompleted} ${this.id}`;
  }
}
