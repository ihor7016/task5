export default class TodoListComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  nextTaskID() {
    if(localStorage.length == 0) {
      return "id1";
    } else {
      let previousID;
      if(this.getNumTasks() == 0) {
        previousID = localStorage.key(0);
      } else {
        previousID = this.list.lastElementChild.id;
      }
      let nextID = "id" + (Number(previousID.slice(2), 10) + 1);
      if(nextID == localStorage.key(localStorage.length - 1)) {
        nextID = "id" + (Number(nextID.slice(2), 10) + 1);
      }
      return nextID;
    }
  } 

  querySelectors() {
    this.list = this.mountPoint.querySelector(".todo-list");
  }

  addEventListeners() {
    this.list.addEventListener("click", (e) => {
      let li = document.getElementById(e.target.parentElement.id);
      if(e.target.tagName == "BUTTON") {
        document.getElementById("list").removeChild(li);
        localStorage.removeItem(e.target.parentElement.id);
        document.querySelector(".todo-form__counter").innerHTML = this.getNumTasks() + 1;
      }
      if(e.target.tagName == "INPUT") {
        e.target.checked ? li.style.textDecoration = "line-through" : li.style.textDecoration = "";
      }
    });
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.addEventListeners();
  }

  addTask(task) { // add checkbox and del btn
    this.list.innerHTML += `
            <li class="todo-list__item" id="${this.nextTaskID()}">
              <input type="checkbox" class="todo-list__item-chekbox">
                ${task}
              <button type="button" class="todo-list__item-del">X</button>
            </li>
        `;   
  }

  getNumTasks() {
    return this.list.children.length;
  }

  render() {
    return `
      <ul class="todo-list" id="list"></ul>
    `;
  }
}