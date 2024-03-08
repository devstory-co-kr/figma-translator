export default class TextDirection {
  html = {
    container: document.getElementById("textDirectionContainer"),
    ltr: document.getElementById("textDirectionLTR"),
    rtl: document.getElementById("textDirectionRTL"),
  };

  LTR = "LTR";
  RTL = "RTL";

  state;
  emit(state) {
    if (this.state === state) return;
    this.state = state;
    this.render();
  }

  constructor(textDirection, onTextDirectionChanged) {
    this.emit({
      textDirection,
    });
    this.html.container.addEventListener("click", (event) => {
      if (event.target.type === "radio" && event.target.checked) {
        const value = event.target.value;
        this.emit({
          ...this.state,
          textDirection: value,
        });
        onTextDirectionChanged(value);
      }
    });
  }

  render() {
    const isLTR = this.state.textDirection === this.LTR;
    this.html.ltr.checked = isLTR;
    this.html.rtl.checked = !isLTR;
  }
}
