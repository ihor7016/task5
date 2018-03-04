import ListItemComponrnt from "./todo-list-item-component.js";

export default class TodoListComponent {
  constructor(mountPoint, clickHandler = {}, tasks = []) {
    this.mountPoint = mountPoint;
    this.clickHandler = clickHandler;
    this.tasks = tasks;
  }

  querySelectors() {
    this.list = this.mountPoint.querySelector(".todo-list");
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    if (this.tasks !== null) {
      for (let i = 0; i < this.tasks.length; i++) {
        let item = this.tasks[i];
        this.addTask(item._name, item._id, item._isCompleted);
      }
    }
    this.list.addEventListener("click", e => {
      let id = e.target.id;

      let action = e.target.getAttribute("action");
      switch (action) {
        case "mark":
          let checked = e.target.checked === true;
          if (checked) {
            document.getElementById(id).style.textDecoration = "line-through";
          } else {
            document.getElementById(id).style.textDecoration = "none";
          }
          this.clickHandler.onMark(id, checked);
          break;
        case "delete":
          document.getElementById(id).style.display = "none";
          this.clickHandler.onDelete(id);
          break;
      }
    });
  }

  addTask(task, id, isCompleted) {
    this.listItemComponrnt = new ListItemComponrnt(
      this.list,
      task,
      id,
      isCompleted
    );
    this.listItemComponrnt.mount();
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
