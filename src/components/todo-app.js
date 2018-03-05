import TodoFormComponent from "./todo-form";
import TodoListComponent from "./todo-list";
import TaskList from "../services/taskList"; 

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
    let idLastTask = document.getElementById("list").lastElementChild.id;
    localStorage.setItem(idLastTask, task);
  }

  addEventListenersFromLS() { 
    window.addEventListener("DOMContentLoaded", this.writeListFromLS.bind(this));
  }

  writeListFromLS() {
    for(let i = 0; i < localStorage.length; i++) {
      if(/^id\d{1,1000000000}$/.test(localStorage.key(i))) {
        this.mountPoint.querySelector(".todo-list").innerHTML += `
        <li class="todo-list__item" id="${localStorage.key(i)}">
          <input type="checkbox" class="todo-list__item-chekbox">
            ${localStorage.getItem(localStorage.key(i))}
          <button type="button" class="todo-list__item-del">X</button>
        </li>
        `;
      }
    }
    const numItems = this.todoListComponent.getNumTasks();
    this.todoFormComponent.setCounter(numItems + 1);
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.mountChildren();
    this.addEventListenersFromLS();
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