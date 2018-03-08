export default class View {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  getEvents() {
    return [];
  }

  querySelectors() {
    //
  }

  mountChildren() {
    //
  }

  addEventListeners() {
    for (const [event, selector, handlerName] of this.getEvents()) {
      const el = this.mountPoint.querySelector(selector);
      if (el) {
        el.addEventListener(event, this[handlerName].bind(this));
      }
    }
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.addEventListeners();
    this.mountChildren();
  }

  render() {
    return "";
  }

  updateProps(cb) {
    cb(this.props);
    this.mount();
  }
}
