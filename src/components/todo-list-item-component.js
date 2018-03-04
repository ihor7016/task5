export default class ListItemComponrnt {
  constructor(mountPoint, task) {
    this.mountPoint = mountPoint;
    this.task = task;
  }

  mount() {
    this.mountPoint.innerHTML += this.render();
    if (this.task.isCompleted) {
      document.getElementById(this.task.id).style.textDecoration =
        "line-through";
      let li = document.getElementById(this.task.id);
      let elementsByClassName = li.getElementsByClassName(
        "todo-list__item-mark"
      );
      elementsByClassName[0].setAttribute("checked", "true");
    } else {
      document.getElementById(this.task.id).style.textDecoration = "none";
    }
  }

  render() {
    return `
           <li 
           id='${this.task.id}' 
           class="todo-list__item"> 
           <input type="checkbox"  id='${this.task.id}' 
             action="mark" 
             class="todo-list__item-mark">
              ${this.task.name}  
            <button 
              id='${this.task.id}' 
              action="delete" 
              class="todo-list__item-delete">X</button>
           </li>
    `;
  }
}
