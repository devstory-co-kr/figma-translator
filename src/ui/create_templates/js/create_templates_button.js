export default class CreateTemplatesButton {
  button = document.getElementById("createTemplatesButton");

  _state;
  get state() {
    return this._state;
  }
  set state(value) {
    this._state = value;
    this.render();
  }
  constructor(platform, onPressed) {
    this.state = {
      platform,
    };

    // On pressed
    this.button.addEventListener("click", () => {
      onPressed();
    });
  }

  render() {
    this.button.innerText = `Create ${this.state.platform} Templates`;
  }
}
