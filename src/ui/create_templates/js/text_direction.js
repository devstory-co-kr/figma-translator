export default class TextDirection {
  html = {
    container: document.getElementById("textDirectionContainer"),
    ltr: document.getElementById("textDirectionLTR"),
    rtl: document.getElementById("textDirectionRTL"),
  };

  LTR = "LTR";
  RTL = "RTL";

  _state;
  get state() {
    return this._state;
  }
  set state(value) {
    this._state = value;
    this.render();
  }

  constructor(textDirection, onTextDirectionChanged) {
    this.state = {
      textDirection,
    };
    this.html.container.addEventListener("click", (event) => {
      if (event.target.type === "radio" && event.target.checked) {
        const value = event.target.value;
        this.state = {
          ...this.state,
          textDirection: value,
        };
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
