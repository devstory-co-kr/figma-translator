export default class SourceLanguage {
  html = {
    select: document.querySelector("#sourceLanguage > select"),
  };

  _state;
  get state() {
    return this._state;
  }
  set state(value) {
    this._state = value;
    this.render();
  }

  constructor(supportLanguages, sourceLanguage, onSourceLanguageChanged) {
    this.initState(supportLanguages, sourceLanguage);

    // On select change
    this.html.select.addEventListener("change", (event) => {
      this.state = {
        ...this.state,
        sourceLanguage: supportLanguages.find(
          (l) => l.locale === event.target.value
        ),
      };
      onSourceLanguageChanged(this.state.sourceLanguage);
    });
  }

  initState(supportLanguages, sourceLanguage) {
    this.state = {
      supportLanguages,
      sourceLanguage: sourceLanguage || supportLanguages[0],
    };
  }

  render() {
    for (const language of this.state.supportLanguages) {
      const item = `<option value="${language.locale}">${language.name} (${language.locale})</option>`;
      this.html.select.insertAdjacentHTML("beforeend", item);
    }
    this.html.select.value = this.state.sourceLanguage.locale;
  }
}
