import TodoAppComponent from "./components/todo-app";

const root = document.querySelector("#root");

const cmp = new TodoAppComponent(root);

cmp.mount();
