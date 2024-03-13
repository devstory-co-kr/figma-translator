export default class ClearCacheButton {
  html = {
    button: document.querySelector("#clearCacheButton"),
  };

  constructor(onPressed) {
    this.html.button.addEventListener("click", () => {
      onPressed();
    });
  }
}
