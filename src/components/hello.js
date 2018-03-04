export default class HelloComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  mount() {
    this.mountPoint.innerHTML = this.render(); //поместили html-  <div>hi, ${this.props.name}!</div> в свойство mountPoint
  }

  render() {
    return `
      <div>hi, ${this.props.name}!</div>
    `;
  }
}
