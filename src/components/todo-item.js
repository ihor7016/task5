export default class TodoItemComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
    this.item = document.createElement("li");
  }

  getTask() {
    return this.itemText.innerText();
  }

  getDone() {
    return this.checkBoxDone.checked;
  }

  querySelectors() {
    this.checkBoxDone = this.item.querySelector(".todo-list__done");
    this.itemText = this.item.querySelector(".todo-list__text");
    this.btnDel = this.item.querySelector(".todo-list__del");
  }

  addEventListeners() {
    this.checkBoxDone.addEventListener(
      "change",
      this.handleCheckboxChange.bind(this)
    );
    this.btnDel.addEventListener("click", this.handleBtnDelClick.bind(this));
  }

  handleCheckboxChange(event) {
    if (event.target.checked) this.itemText.classList.add("todo-done");
    else this.itemText.classList.remove("todo-done");
    this.props.onTodoDone();
  }

  handleBtnDelClick(event) {
    this.props.onTodoDel(event.target.parentElement);
  }

  mount(task) {
    this.item.className = "todo-list__item";
    this.item.innerHTML = this.render();
    this.mountPoint.appendChild(this.item);
    this.querySelectors();
    this.itemText.innerHTML = task;
    this.addEventListeners();
  }

  render() {
    return `
        <input class="todo-list__done" type="checkbox"/>
        <span class="todo-list__text"></span>
        <button class="todo-list__del">X</button>
    `;
  }
}
