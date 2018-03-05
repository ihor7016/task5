import { TasksDB } from "./tasksDB";
export class TaskService {
  getTasks() {
    return TasksDB.get();
  }

  setTasks(tasks) {
    TasksDB.set(tasks);
  }
}
