export default class AutoSize {
  html = {
    container: document.querySelector("#autoSize"),
    switchContainer: document.querySelector("#autoSize .switchContainer"),
    switch: document.querySelector("#autoSize .switchContainer input"),
  };

  state;

  constructor(autoSize, onAutoSizeChanged) {
    this.html.switchContainer.addEventListener("click", (event) => {
      this.emit({
        autoSize: this.html.switch.checked,
      });
      onAutoSizeChanged(this.state.autoSize);
    });

    this.emit({
      autoSize,
    });
  }

  emit(state) {
    if (this.state === state) return;
    this.state = state;
    this.render();
  }

  render() {
    this.html.switch.checked = this.state.autoSize ? "checked" : "";
  }
}
