export default class TodoListComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
    this.list = this.mountPoint.querySelector(".todo-list");
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.doneTask();
  }

  addTask(task) {
    this.list.innerHTML += `
    <tr><td><input class ="checkbox" type="checkbox"></td>
    <td>${task}</td>
    <td><button onclick="removeTask(this)" value="&#215" style="width:5px;height:15px;"></button></td></tr>
        `;
  }

  doneTask() {
    var checkboxElements = document.getElementsByClassName("checkbox");

    for (var i = 0; i < checkboxElements.length; i++) {
      checkboxElements[i].addEventListener("change", function() {
        if (this.checked) {
          this.closest("tr").style.textDecoration = "line-through";
        }
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
