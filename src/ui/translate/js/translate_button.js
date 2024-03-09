export default class TranslateButton {
  html = {
    button: document.querySelector("#translateButton"),
  };

  constructor(onPressed) {
    this.html.button.addEventListener("click", () => {
      onPressed();
    });
  }
}
