import TodoAppComponent from "./components/todo-app";
import Data from "./components/model/Data.js";

const root = document.querySelector("#root");

let data = new Data([]);
let localStorageElements = data.all;
if (localStorageElements !== null) {
  data.put(localStorageElements);
}
const cmp = new TodoAppComponent(root, data);
cmp.mount();
