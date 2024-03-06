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

  constructor(templateScale, onTemplateScaleChanged) {
    this.state = {
      templateScale,
    };

    this.html.select.addEventListener("change", () => {
      this.state = {
        templateScale: this.html.select.value,
      };
      onTemplateScaleChanged(this.state.templateScale);
    });
  }

  render() {
    this.html.select.value = this.state.templateScale;
  }
}
