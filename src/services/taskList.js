
import { Db } from './db'

export class TaskList {
    set(value) {
        Db.set('taskList', value)
    }

    get() {
        Db.get('taskList')
    }
}