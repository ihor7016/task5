import { Db } from "./db";

export default class TaskList {
  static set(value) {
    Db.set("taskList", value);
  }

  static get() {
    return Db.get("taskList");
  }
}
