import TodoAppComponent from "./components/todo-app";
import TaskList from "./services/TaskList";

const items = TaskList.get();

const root = document.querySelector("#root");

const cmp = new TodoAppComponent(root, {
  items
});

cmp.mount();

window.addEventListener("beforeunload", () => {
  TaskList.set(items);
});
