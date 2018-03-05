import Task from "./task";
export class TasksDB {
  static get() {
    let array = JSON.parse(localStorage.getItem("Key"));

    let tasks = [];
    for (let i = 0; i < array.length; i++) {
      let item = array[i];
      tasks.push(new Task(item._isCompleted, item._name, item._id));
    }
    return tasks;
  }

  static set(tasks) {
    localStorage.setItem("Key", JSON.stringify(tasks));
  }
}
