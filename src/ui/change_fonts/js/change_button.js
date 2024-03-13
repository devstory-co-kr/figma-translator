export default class ChangeButton {
  html = {
    button: document.querySelector("#changeButton"),
  };

  constructor(onPressed) {
    this.html.button.addEventListener("click", () => {
      onPressed();
    });
  }
}
