import TodoFormComponent from "./todo-form";
import TodoListComponent from "./todo-list";

export default class TodoAppComponent {
  constructor(mountPoint, taskService) {
    this.mountPoint = mountPoint;
    this.taskService = taskService;
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
      this.taskService.getTasks()
    );
    this.todoListComponent.mount();
  }

  handleMark(tasks) {
    console.log(tasks);
    this.taskService.setTasks(tasks);
  }

  handleDelete(tasks) {
    console.log(tasks);
    this.taskService.setTasks(tasks);
  }

  handleTodoAdd(task) {
    this.todoListComponent.addTask(task);
    const numItems = this.todoListComponent.getNumTasks();
    this.todoFormComponent.setCounter(numItems + 1);
    this.taskService.setTasks(this.todoListComponent.getAllTasks());
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
