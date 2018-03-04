export default class TodoListComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  getNumTasks() {
    return this.list.children.length;
  }

  addTask(task, done) {
    let doneClass = "";
    if (done) {
      done = "checked";
      doneClass = "todo-done";
    } else done = "";
    this.list.innerHTML += `
      <li class="todo-list__item ${doneClass}">
        <input class="todo-list__done" type="checkbox" ${done}>
        <span class="todo-list__text">${task}</span>
        <button class="todo-list__del">X</button>
      </li>
    `;
  }

  addStoredTasks() {
    this.props.itemsFromStorage.forEach(item => {
      for (let task in item) {
        this.addTask(task, item[task]);
      }
    });
  }

  getDataTasks() {
    let taskList = [];
    const tasks = this.list.querySelectorAll(".todo-list__text");
    const done = this.list.querySelectorAll(".todo-list__done");
    for (let i = 0; i < tasks.length; i++) {
      taskList.push({
        [tasks[i].innerText]: done[i].checked
      });
    }
    return taskList;
  }

  delItem(item) {
    this.list.removeChild(item);
  }

  handleOnCkickItem(event) {
    if (event.target.classList.contains("todo-list__del")) {
      this.delItem(event.target.parentElement);
      this.props.onTodoDel();
    }
  }

  handleOnChangeItem(event) {
    event.target.parentElement.classList.toggle("todo-done");
    this.props.onTodoDone();
  }

  addEventListeners() {
    this.list.addEventListener("click", this.handleOnCkickItem.bind(this));
    this.list.addEventListener("change", this.handleOnChangeItem.bind(this));
  }

  querySelectors() {
    this.list = this.mountPoint.querySelector(".todo-list");
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.addEventListeners();
    this.addStoredTasks();
  }

  render() {
    return `
      <ul class="todo-list"></ul>
    `;
  }
}
