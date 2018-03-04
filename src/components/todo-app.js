import TodoFormComponent from "./todo-form";
import TodoListComponent from "./todo-list";

export default class TodoAppComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.todoFormMountPoint = this.mountPoint.querySelector(
      ".todo-app__form-point"
    );
    this.todoListMountPoint = this.mountPoint.querySelector(
      ".todo-app__list-point"
    );
  }

  mountChildren() {
    this.todoFormComponent = new TodoFormComponent(this.todoFormMountPoint, {
      onTodoAdd: this.handleTodoAdd.bind(this)
    });
    this.todoFormComponent.mount();
    this.todoListComponent = new TodoListComponent(this.todoListMountPoint, {
      onTodoDel: this.handleTodoDel.bind(this),
      onTodoDone: this.handleTodoDone.bind(this),
      itemsFromStorage: this.getLocalTasks()
    });
    this.todoListComponent.mount();
  }

  handleTodoAdd(task) {
    this.todoListComponent.addTask(task);
    this.refreshCounter();
    this.saveLocalTasks();
  }

  handleTodoDel() {
    this.refreshCounter();
    this.saveLocalTasks();
  }

  handleTodoDone() {
    this.saveLocalTasks();
  }

  refreshCounter() {
    const numItems = this.todoListComponent.getNumTasks();
    this.todoFormComponent.setCounter(numItems + 1);
  }

  saveLocalTasks() {
    localStorage.setItem(
      "tasks",
      JSON.stringify(this.todoListComponent.getDataTasks())
    );
  }

  getLocalTasks() {
    return JSON.parse(localStorage.getItem("tasks"));
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.mountChildren();
    this.refreshCounter();
  }

  render() {
    return `
      <div class="todo-app">
        <h2>Todo:</h2>
        <div class="todo-app__form-point"></div>
        <div class="todo-app__list-point"></div>
      </div>
    `;
  }
}
