export default class ListItemComponrnt {
  constructor(mountPoint, task, id, isCompleted) {
    this.mountPoint = mountPoint;
    this.task = task;
    this.id = id;
    this.isCompleted = isCompleted;
  }

  mount() {
    this.mountPoint.innerHTML += this.render();
  }

  render() {
    return `
           <li 
           id='${this.id}' 
           class="todo-list__item"> 
           <button 
             id='${this.id}' 
             action="mark" 
             class="todo-list__item-mark">Mark</button>
              ${this.task}   ${this.isCompleted}
            <button 
              id='${this.id}' 
              action="delete" 
              class="todo-list__item-delete">Delete</button>
           </li>
    `;
  }
}
