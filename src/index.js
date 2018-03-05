import TodoAppComponent from "./components/todo-app";
import { TaskService } from "./service/taskService";

const root = document.querySelector("#root");

const cmp = new TodoAppComponent(root, new TaskService());

cmp.mount();
