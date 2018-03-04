import TodoFormComponent from "./todo-form";
import TodoListComponent from "./todo-list";
import Controller from "./controller/controller.js";
import Task from "./model/Task.js";

export default class TodoAppComponent {
  constructor(mountPoint, controller) {
    this.mountPoint = mountPoint;
    this.controller = controller;
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
      this.controller.getAll()
    );
    this.todoListComponent.mount();
  }

  handleTodoAdd(name) {
    this.controller.add(name);
  }

  handleMark(id, checked) {
    this.controller.marks(id, checked);
  }

  handleDelete(id) {
    this.controller.delete(id);
  }

  onDataAdded(task) {
    this.todoListComponent.addTask(task);
    const numItems = this.todoListComponent.getNumTasks();
    this.todoFormComponent.setCounter(numItems + 1);
  }

  onDataDeleted(taskId) {
    this.todoListComponent.deleteTask(taskId);
  }

  onDataMarked(taskId, checked) {
    this.todoListComponent.markTask(taskId, checked);
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
}
