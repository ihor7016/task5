//При решении задачи было принято упрощение, что в объекте localStorage
//хранятся данные только по заданию и его идентификатор.

//----------------------------------------------todo-list
class TodoListComponent {
    constructor(mountPoint) {
      this.mountPoint = mountPoint;
    }

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^(ID)
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
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV

    querySelectors() {
      this.list = this.mountPoint.querySelector(".todo-list");
    }   
    
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ click butDelete
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
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
  
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
  
//----------------------------------------------todo-form
class TodoFormComponent {
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
      if(this.field.value != "") {
        this.props.onTodoAdd(this.field.value);  
      }
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
  
//----------------------------------------------todo-app
class TodoAppComponent {
    constructor(mountPoint, props = {}) {
      this.mountPoint = mountPoint;
      this.props = props;
    }
  
    querySelectors() {
      this.todoFormMountPoint = this.mountPoint.querySelector(
        ".todo-app__form-point"
      );
      this.todoListMountPoint = this.mountPoint.querySelector(
        ".todo-app__list-point"
      );
    }
  
    mountChildren() {
      this.todoFormComponent = new TodoFormComponent(this.todoFormMountPoint, {
        onTodoAdd: this.handleTodoAdd.bind(this)
      });
      this.todoFormComponent.mount();
      this.todoListComponent = new TodoListComponent(this.todoListMountPoint);
      this.todoListComponent.mount();
    }
  
    handleTodoAdd(task) {
      this.todoListComponent.addTask(task);
      const numItems = this.todoListComponent.getNumTasks();
      this.todoFormComponent.setCounter(numItems + 1);
      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      let idLastTask = document.getElementById("list").lastElementChild.id;
      localStorage.setItem(idLastTask, task); // add task in localStorage
      //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
    }
  
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^(write list from LS)
    addEventListenersFromLS() { 
      window.addEventListener("DOMContentLoaded", this.writeListFromLS.bind(this));
    }

    writeListFromLS() {
      for(let i = 0; i < localStorage.length; i++) {
        if(/^id\d{1,1000000000}$/.test(localStorage.key(i))) {
          this.mountPoint.querySelector(".todo-list").innerHTML += `
          <li class="todo-list__item" id="${localStorage.key(i)}">
            <input type="checkbox" class="todo-list__item-chekbox">
              ${localStorage.getItem(localStorage.key(i))}
            <button type="button" class="todo-list__item-del">X</button>
          </li>
          `;
        }
      }
      const numItems = this.todoListComponent.getNumTasks();
      this.todoFormComponent.setCounter(numItems + 1);
    }
    //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV

    
    mount() {
      this.mountPoint.innerHTML = this.render();
      this.querySelectors();
      this.mountChildren();
      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^(write list from LS)
      this.addEventListenersFromLS();
     //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV 
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
  
//----------------------------------------------index

const root = document.querySelector("#root");

const cmp = new TodoAppComponent(root);

cmp.mount();
