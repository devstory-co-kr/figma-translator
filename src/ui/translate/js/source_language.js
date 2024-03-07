export default class SourceLanguage {
  html = {
    select: document.querySelector("#sourceLanguage > select"),
  };

  state;

  constructor(supportLanguages, sourceLanguage, onSourceLanguageChanged) {
    this.emit(supportLanguages, sourceLanguage);

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

  emit(supportLanguages, sourceLanguage) {
    this.state = {
      supportLanguages,
      sourceLanguage: sourceLanguage || supportLanguages[0],
    };
    this.render();
  }

  render() {
    for (const language of this.state.supportLanguages) {
      const item = `<option value="${language.locale}">${language.name} (${language.locale})</option>`;
      this.html.select.insertAdjacentHTML("beforeend", item);
    }
    this.html.select.value = this.state.sourceLanguage.locale;
  }
}
