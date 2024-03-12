export default class ReplaceFont {
  html = {};
  state = {};

  constructor() {}

  emit(state) {
    if (this.state === state) return;
    this.state = state;
    this.render();
  }

  render() {}
}
