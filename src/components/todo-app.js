import View from "./View";
import TodoFormComponent from "./todo-form";
import TodoListComponent from "./todo-list";

export default class TodoAppComponent extends View {
  querySelectors() {
    this.todoFormMountPoint = this.mountPoint.querySelector(
      ".todo-app__form-point"
    );
    this.todoListMountPoint = this.mountPoint.querySelector(
      ".todo-app__list-point"
    );
  }

  mountChildren() {
    const { items } = this.props;

    this.todoFormComponent = new TodoFormComponent(this.todoFormMountPoint, {
      onTodoAdd: this.onTodoAdd.bind(this),
      count: items.length
    });
    this.todoFormComponent.mount();

    this.todoListComponent = new TodoListComponent(this.todoListMountPoint, {
      items,
      onItemDelete: this.onTodoDelete.bind(this)
    });
    this.todoListComponent.mount();
  }

  onTodoAdd(text) {
    this.updateProps(props => {
      props.items.push({ text, checked: false });
    });
  }

  onTodoDelete(index) {
    this.updateProps(props => {
      props.items.splice(index, 1);
    });
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
