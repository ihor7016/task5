import TodoAppComponent from "./components/todo-app"; // от куда придут данные
import Data from "./components/model/Data.js"; // от куда придут данные

const root = document.querySelector("#root");

let data = new Data([]);
let localStorageElements = data.all;
if (localStorageElements !== null) {
  data.put(localStorageElements);
}
const cmp = new TodoAppComponent(root, data); // создали новый объект

cmp.mount(); //запустили
