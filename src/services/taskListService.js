import { Db } from "./db";

export class TaskListService {
  get() {
    return Db.get("taskList");
  }

  set(value) {
    Db.set("taskList", value);
  }
}
