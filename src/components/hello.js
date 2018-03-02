export default class HelloComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
  }

  render() {
    return `
            <div>hi, ${this.props.name}!</div> 
        `;
  }
}
