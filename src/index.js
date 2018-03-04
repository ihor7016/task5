import TodoAppComponent from "./components/todo-app";
import Data from "./components/model/Data.js";
import Controller from "./components/controller/controller.js";
const KEY = "key";

const root = document.querySelector("#root");

let data = new Data([]);
let localStorageElements = JSON.parse(localStorage.getItem(KEY));
if (localStorageElements !== null) {
  data.put(localStorageElements);
}

let controller = new Controller(data);
const cmp = new TodoAppComponent(root, controller);
data.listener = cmp;
cmp.mount();
