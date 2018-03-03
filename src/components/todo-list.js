import TodoItemComponent from "./todo-item";

export default class TodoListComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.list = this.mountPoint.querySelector(".todo-list");
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
  }

  addTask(task) {
    let item = new TodoItemComponent(this.list, {
      onTodoDel: this.delTask.bind(this),
      onTodoDone: this.doneTask.bind(this)
    });
    item.mount(task);
  }

  delTask(item) {
    this.list.removeChild(item);
    this.props.onTodoDel();
  }

  doneTask() {
    this.props.onTodoDone();
  }

  getJSONTasks() {
    //    return JSON.stringify();
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
