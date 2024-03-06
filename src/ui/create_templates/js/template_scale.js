export default class TemplateScale {
  html = {
    select: document.getElementById("templateScale"),
  };

  _state;
  get state() {
    return this._state;
  }
  set state(value) {
    this._state = value;
    this.render();
  }

  constructor(scale) {
    this.state = {
      scale,
    };

    this.html.select.addEventListener("change", () => {
      this.state = {
        scale: this.html.select.value,
      };
    });
  }

  render() {
    this.html.select.value = this.state.scale;
  }
}
