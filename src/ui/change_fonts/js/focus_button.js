export default class FocusButton {
  html = {
    button: document.querySelector("#focusButton"),
  };

  constructor(onPressed) {
    this.html.button.addEventListener("click", () => {
      onPressed();
    });
  }
}
