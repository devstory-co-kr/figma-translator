export default class CreateTemplatesButton {
  html = {
    button: document.getElementById("createTemplatesButton"),
  };

  constructor(onPressed) {
    // On pressed
    this.html.button.addEventListener("click", () => {
      onPressed();
    });
  }

  render() {
    this.html.button.innerText = `Create Templates`;
  }
}
