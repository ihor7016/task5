export default class TodoListComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
    this.list = this.mountPoint.querySelector(".todo-list");
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
  }

  addTask(task) {
    this.list.innerHTML += `
            <li class="todo-list__item">${task}</li>
        `;
  }

  getNumTasks() {
    return this.list.children.length;
  }

  render() {
    return `
            <ul class="todo-list"></ul> 
        `;
  }
}
