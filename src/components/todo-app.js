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
    this.todoListComponent = new TodoListComponent(this.todoListMountPoint);
    this.todoListComponent.mount();
  }

  handleTodoAdd(task) {
    this.todoListComponent.addTask(task);
    const numItems = this.todoListComponent.getNumTasks();
    this.todoFormComponent.setCounter(numItems + 1);
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
