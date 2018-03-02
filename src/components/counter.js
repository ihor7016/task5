export default class CounterComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
    this.incButton = this.mountPoint.querySelector(".counter__inc");
    this.decButton = this.mountPoint.querySelector(".counter__dec");
    this.display = this.mountPoint.querySelector(".counter__display");
  }

  addEventListeners() {
    this.incButton.addEventListener("click", this.handleIncClick.bind(this));
    this.decButton.addEventListener("click", this.handleDecClick.bind(this));
  }

  handleIncClick() {
    const val = this.getDisplay();
    this.setDisplay(val + 1);
  }

  handleDecClick() {
    const val = this.getDisplay();
    this.setDisplay(val - 1);
  }

  getDisplay() {
    return parseInt(this.display.innerHTML, 10);
  }

  setDisplay(val) {
    this.display.innerHTML = val;
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.addEventListeners();
  }

  render() {
    return `
      <div class="counter">
        <button class="counter__dec">-</button>
        <span class="counter__display">0</span>
        <button class="counter__inc">+</button>
      </div>
    `;
  }
}
