export default class TemplateScale {
  html = {
    select: document.getElementById("templateScale"),
  };

  state;
  emit(state) {
    if (this.state === state) return;
    this.state = state;
    this.render();
  }

  constructor(templateScale, onTemplateScaleChanged) {
    this.emit({
      templateScale,
    });

    this.html.select.addEventListener("change", () => {
      this.emit({
        templateScale: this.html.select.value,
      });
      onTemplateScaleChanged(this.state.templateScale);
    });
  }

  render() {
    this.html.select.value = this.state.templateScale;
  }
}
