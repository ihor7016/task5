import TodoFormComponent from "./todo-form";
import TodoListComponent from "./todo-list";
import Task from "./model/Task.js";

export default class TodoAppComponent {
  constructor(mountPoint, data) {
    this.mountPoint = mountPoint;
    this.data = data;
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
    this.todoListComponent = new TodoListComponent(
      this.todoListMountPoint,
      {
        onMark: this.handleMark.bind(this),
        onDelete: this.handleDelete.bind(this)
      },
      this.data.all
    );
    this.todoListComponent.mount();
  }

  handleTodoAdd(name) {
    let randomId = this.randomId();
    this.data.add(new Task(false, name, randomId));

    this.todoListComponent.addTask(name, randomId, false);
    const numItems = this.todoListComponent.getNumTasks();
    this.todoFormComponent.setCounter(numItems + 1);
  }

  handleMark(id, checked) {
    this.data.marks(id, checked);
  }

  handleDelete(id) {
    this.data.delete(id);
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.mountChildren();
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

  randomId() {
    return Math.floor(Math.random() * 10000000);
  }
}
