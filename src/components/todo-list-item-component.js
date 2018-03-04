export default class ListItemComponrnt {
  constructor(mountPoint, task, id, isCompleted) {
    this.mountPoint = mountPoint;
    this.task = task;
    this.id = id;
    this.isCompleted = isCompleted;
  }

  mount() {
    this.mountPoint.innerHTML += this.render();
    if (this.isCompleted) {
      document.getElementById(this.id).style.textDecoration = "line-through";
      let li = document.getElementById(this.id);
      let elementsByClassName = li.getElementsByClassName(
        "todo-list__item-mark"
      );
      elementsByClassName[0].setAttribute("checked", "true");
    } else {
      document.getElementById(this.id).style.textDecoration = "none";
    }
  }

  render() {
    return `
           <li 
           id='${this.id}' 
           class="todo-list__item"> 
           <input type="checkbox"  id='${this.id}' 
             action="mark" 
             class="todo-list__item-mark">
              ${this.task}  
            <button 
              id='${this.id}' 
              action="delete" 
              class="todo-list__item-delete">X</button>
           </li>
    `;
  }
}
