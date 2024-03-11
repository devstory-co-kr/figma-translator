export default class Cache {
  html = {
    container: document.querySelector("#cache"),
    switchContainer: document.querySelector("#cache .switchContainer"),
    switch: document.querySelector("#cache .switchContainer input"),
  };
  state;

  constructor(useCache, onChanged) {
    this.html.switchContainer.addEventListener("click", (event) => {
      this.emit({
        useCache: this.html.switch.checked,
      });
      onChanged(this.state.useCache);
    });

    this.emit({ useCache: useCache ?? true });
  }

  emit(state) {
    if (this.state === state) return;
    this.state = state;
    this.render();
  }

  render() {
    this.html.switch.checked = this.state.useCache ? "checked" : "";
  }
}
