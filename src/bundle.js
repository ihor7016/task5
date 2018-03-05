/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_todo_app__ = __webpack_require__(1);


const root = document.querySelector("#root");

const cmp = new __WEBPACK_IMPORTED_MODULE_0__components_todo_app__["a" /* default */](root);

cmp.mount();

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__todo_form__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__todo_list__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_taskList__ = __webpack_require__(4);


 

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
    this.todoFormComponent = new __WEBPACK_IMPORTED_MODULE_0__todo_form__["a" /* default */](this.todoFormMountPoint, {
      onTodoAdd: this.handleTodoAdd.bind(this)
    });
    this.todoFormComponent.mount();
    this.todoListComponent = new __WEBPACK_IMPORTED_MODULE_1__todo_list__["a" /* default */](this.todoListMountPoint);
    this.todoListComponent.mount();
  }

  handleTodoAdd(task) {
    this.todoListComponent.addTask(task);
    const numItems = this.todoListComponent.getNumTasks();
    this.todoFormComponent.setCounter(numItems + 1);
    let idLastTask = document.getElementById("list").lastElementChild.id;
    localStorage.setItem(idLastTask, task);
  }

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

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.mountChildren();
    this.addEventListenersFromLS();
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
/* harmony export (immutable) */ __webpack_exports__["a"] = TodoAppComponent;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/* harmony export (immutable) */ __webpack_exports__["a"] = TodoFormComponent;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class TodoListComponent {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = TodoListComponent;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__db__ = __webpack_require__(5);



class TaskList {
    set(value) {
        __WEBPACK_IMPORTED_MODULE_0__db__["a" /* Db */].set('taskList', value)
    }

    get() {
        __WEBPACK_IMPORTED_MODULE_0__db__["a" /* Db */].get('taskList')
    }
}
/* unused harmony export TaskList */


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class Db {
    static get(name) {
        return JSON.parse(localStorage.getItem(name))
    }

    static set(name, value) {
        localStorage.setItem(name, JSON.stringify(value))
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Db;


/***/ })
/******/ ]);