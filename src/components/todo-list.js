import View from "./View";

class TodoItem extends View {
  getEvents() {
    return [
      ["change", "input[type=checkbox]", "onChangeChecked"],
      ["click", ".todo-list__item-delete", "onDelete"]
    ];
  }

  render() {
    const { task } = this.props;
    return `
      <input type="checkbox" ${task.checked ? "checked" : ""} />
      <span ${!task.checked ? "" : 'style="text-decoration: line-through"'}>${
      task.text
    }</span>
      <button type="button" class="todo-list__item-delete">X</button>
    `;
  }

  onChangeChecked(e) {
    const { checked } = e.target;

    this.updateProps(props => {
      props.task.checked = checked;
    });

    const { onChangeChecked } = this.props;
    if (onChangeChecked) {
      onChangeChecked(checked);
    }
  }

  onDelete() {
    const { onDelete } = this.props;
    if (onDelete) {
      onDelete();
    }
  }
}

export default class TodoListComponent extends View {
  querySelectors() {
    this.list = this.mountPoint.querySelector(".todo-list");
  }

  mountChildren() {
    Array.from(this.list.children).forEach((node, index) => {
      this._mountItem(node, this.props.items[index], index);
    });
  }

  _mountItem(node, task, index) {
    new TodoItem(node, {
      task,

      onDelete: () => {
        this.onItemDelete(index);
      }
    }).mount();
  }

  onItemDelete(index) {
    const { onItemDelete } = this.props;

    if (onItemDelete) {
      onItemDelete(index);
    }
  }

  render() {
    return `
      <ul class="todo-list">
        ${this.props.items
          .map(() => `<li class="todo-list__item"></li>`)
          .reduce((m, x) => m + x, "")}
      </ul>
    `;
  }
}
