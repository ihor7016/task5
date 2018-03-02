export default class TodoFormComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.field = this.mountPoint.querySelector(".todo-form__field");
    this.btn = this.mountPoint.querySelector(".todo-form__btn");
    this.counter = this.mountPoint.querySelector(".todo-form__counter");
  }

  addEventListeners() {
    this.btn.addEventListener("click", this.handeBtnClick.bind(this));
  }

  handeBtnClick() {
    this.props.onTodoAdd(this.field.value);
    this.field.value = "";
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.addEventListeners();
  }

  setCounter(val) {
    this.counter.innerHTML = val;
  }

  render() {
    return `
            <div class="todo-form">
                <input class="todo-form__field" type="text">
                <button class="todo-form__btn">
                    Add #<span class="todo-form__counter">1</span>
                </button>
            </div> 
        `;
  }
}
