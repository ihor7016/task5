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
    this.doneTask();
    this.removeTask();
  }

  addTask(task) {
    this.list.innerHTML += `
    <tr><td><input class ="checkbox" type="checkbox"></td>
    <td>${task}</td>
    <td><button class='button' value="&#215" style="width:5px;height:15px;"></button></td></tr>
        `;
    this.doneTask();
    this.removeTask();
  }

  doneTask() {
    let checkboxElements = document.getElementsByClassName("checkbox");

    for (let i = 0; i < checkboxElements.length; i++) {
      checkboxElements[i].addEventListener("change", function() {
        if (this.checked) {
          this.closest("tr").style.textDecoration = "line-through";
        }
      });
    }
  }
  removeTask(){
    let buttonElements = document.getElementsByClassName("button");
    for (let j = 0; j < buttonElements.length; j++) {
      buttonElements[j].addEventListener("click", function() {
          this.closest("tr").remove(buttonElements[j]);

      });
    }
  }
  getNumTasks() {
    return this.list.children.length;
  }

  render() {
    return `
      <br>
      <table class="todo-list" style="width:50px"></table>
    `;
  }
}
