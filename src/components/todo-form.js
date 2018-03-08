import View from "./View";

export default class TodoFormComponent extends View {
  querySelectors() {
    this.field = this.mountPoint.querySelector(".todo-form__field");
  }

  getEvents() {
    return [["click", ".todo-form__btn", "onBtnClick"]];
  }

  onBtnClick() {
    this.props.onTodoAdd(this.field.value);
    this.field.value = "";
  }

  render() {
    return `
      <div class="todo-form">
        <input class="todo-form__field" type="text">
        <button class="todo-form__btn">
          Add #<span class="todo-form__counter">${this.props.count + 1}</span>
        </button>
      </div>
    `;
  }
}
