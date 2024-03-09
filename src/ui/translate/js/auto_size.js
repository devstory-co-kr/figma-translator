export default class AutoSize {
  html = {
    container: document.querySelector("#autoSize"),
    on: document.querySelector("#autoSizeOn"),
    off: document.querySelector("#autoSizeOff"),
  };

  state;

  constructor(autoSize, onAutoSizeChanged) {
    this.emit({
      autoSize,
    });
    this.html.container.addEventListener("click", (event) => {
      if (event.target.type === "radio") {
        const value = event.target.value === "true";
        this.emit({
          ...this.state,
          autoSize: value,
        });
        onAutoSizeChanged(this.state.autoSize);
      }
    });
  }

  emit(state) {
    if (this.state === state) return;
    this.state = state;
    this.render();
  }

  render() {
    this.html.on.checked = this.state.autoSize;
    this.html.off.checked = !this.state.autoSize;
  }
}
