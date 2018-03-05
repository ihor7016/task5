import Task from "../service/task";
export default class TodoListComponent {
  constructor(mountPoint, clickHandler, tasks) {
    this.mountPoint = mountPoint;
    this.clickHandler = clickHandler;
    this.tasks = tasks;
  }

  querySelectors() {
    this.list = this.mountPoint.querySelector(".todo-list");
    this.listItem = this.mountPoint.querySelector(".todo-list__item");
    this.itemName = this.mountPoint.querySelector(".todo-list__item-name");
    this.itemDelete = this.mountPoint.querySelector(".todo-list__item-delete");
    this.checkbox = this.mountPoint.querySelector(".todo-list__checkbox");
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.addListeners();
    this.addAllFromStorage();
  }

  addTask(task) {
    this.list.innerHTML += `
            <li class="todo-list__item">
            <input action="mark"  class="todo-list__checkbox" type="checkbox">
            <span class="todo-list__item-name">${task}</span>
            <button action="delete"  class="todo-list__item-delete">X</button>
            </li>
        `;
  }

  addAllFromStorage() {
    if (this.tasks !== null) {
      for (let i = 0; i < this.tasks.length; i++) {
        let item = this.tasks[i];
        this.addTask(item);
      }
    }
  }

  getNumTasks() {
    return this.list.children.length;
  }

  render() {
    return `
      <ul class="todo-list"></ul>
    `;
  }

  mark(target) {
    target.classList.toggle("checked");
  }

  remove(target) {
    this.list.removeChild(target.parentElement);
  }

  getAllTasks() {
    let taskList = [];
    const tasks = this.list.querySelectorAll(".todo-list__item-name");
    const checkboxes = this.list.querySelectorAll(".todo-list__checkbox");
    for (let i = 0; i < tasks.length; i++) {
      let checked = checkboxes[i].checked;
      if (checked) {
        tasks[i].style.textDecoration = "line-through";
      } else {
        tasks[i].style.textDecoration = "none";
      }
      taskList.push(new Task(checked, tasks[i].innerText));
    }
    return taskList;
  }

  addListeners() {
    this.list.addEventListener("click", e => {
      let action = e.target.getAttribute("action");
      switch (action) {
        case "mark":
          let checked = e.target.checked === true;
          this.mark(e.target);
          this.clickHandler.onMark(this.getAllTasks());
          break;
        case "delete":
          this.remove(e.target);
          this.clickHandler.onDelete(this.getAllTasks());
          break;
      }
    });
  }
}
