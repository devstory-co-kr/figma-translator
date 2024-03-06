export default class SourceLocale {
  html = {
    localeSelect: document.getElementById("sourceLocaleSelect"),
  };

  _state;
  get state() {
    return this._state;
  }
  set state(value) {
    this._state = value;
    this.render();
  }

  constructor(locales, sourceLocale) {
    this.state = {
      locales,
      sourceLocale: sourceLocale || locales[0],
    };

    // On select change
    this.html.localeSelect.addEventListener("change", (event) => {
      this.state = {
        ...this.state,
        sourceLocale: locales.find((l) => l.locale === event.target.value),
      };
    });
  }

  render() {
    for (const l of this.state.locales) {
      const item = `<option value="${l.locale}">${l.name} (${l.locale})</option>`;
      this.html.localeSelect.insertAdjacentHTML("beforeend", item);
    }
  }
}
