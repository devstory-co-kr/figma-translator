export default class AutoSize {
  html = {
    container: document.querySelector("#autoSize"),
    on: document.querySelector("#autoSizeOn"),
    off: document.querySelector("#autoSizeOff"),
  };

  state;

  constructor(autoSize, onAutoSizeChanged) {
    this.emit(autoSize);
    this.html.container.addEventListener("click", (event) => {
      if (event.target.type === "radio" && event.target.checked) {
        const value = event.target.value;
        this.state = {
          ...this.state,
          autoSize: value,
        };
        onAutoSizeChanged(value);
      }
    });
  }

  emit(autoSize) {
    this.state = { autoSize };
    this.render();
  }

  render() {
    this.html.on.checked = this.state.autoSize;
    this.html.off.checked = !this.state.autoSize;
  }
}
