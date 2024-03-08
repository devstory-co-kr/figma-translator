export default class FontReplacement {
  html = {
    fonts: document.querySelector("#fontReplacement"),
    container: document.querySelector("#fontReplacement .container"),
    checkbox: document.querySelector("#fontReplacementCheckbox"),
    searchInput: document.querySelector("#fontReplacementSearchInput"),
    searchClearButton: document.querySelector(
      "#fontReplacement .inputClearButton"
    ),
  };
  languageMap = {};
  fontMap = {};
  state;

  fontName = {
    NotoSansMyanmar: "Noto Sans Myanmar",
    NotoSansArmenian: "Noto Sans Armenian",
    NotoSansEthiopic: "Noto Sans Ethiopic",
    NotoSansGeorgian: "Noto Sans Georgian",
    NotoSansKhmer: "Noto Sans Khmer",
    NotoSansLao: "Noto Sans Lao",
    NotoSansGurmukhi: "Noto Sans Gurmukhi",
    NotoSansSinhala: "Noto Sans Sinhala",
    NotoSansDevanagari: "Noto Sans Devanagari",
  };

  languageName = {
    Myanmar: "Myanmar",
    Amharic: "Amharic",
    Armenian: "Armenian",
    Georgian: "Georgian",
    Khmer: "Khmer",
    Lao: "Lao",
    Punjabi: "Punjabi",
    Sinhala: "Sinhala",
    Marathi: "Marathi",
    Hindi: "Hindi",
    Nepali: "Nepali",
  };

  constructor(supportLanguages, availableFonts) {
    for (const language of supportLanguages) {
      this.languageMap[language.name] = language;
    }

    for (const font of availableFonts) {
      this.fontMap[font.fontName.family] = font.fontName;
    }

    this.emit(
      [
        {
          language: this.languageMap[this.languageName.Myanmar],
          fontName: this.fontName.NotoSansMyanmar,
          font: this.fontMap[this.fontName.NotoSansMyanmar],
        },
        {
          language: this.languageMap[this.languageName.Amharic],
          fontName: this.fontName.NotoSansEthiopic,
          font: this.fontMap[this.fontName.NotoSansEthiopic],
        },
        {
          language: this.languageMap[this.languageName.Armenian],
          fontName: this.fontName.NotoSansArmenian,
          font: this.fontMap[this.fontName.NotoSansArmenian],
        },
        {
          language: this.languageMap[this.languageName.Georgian],
          fontName: this.fontName.NotoSansGeorgian,
          font: this.fontMap[this.fontName.NotoSansGeorgian],
        },
        {
          language: this.languageMap[this.languageName.Khmer],
          fontName: this.fontName.NotoSansKhmer,
          font: this.fontMap[this.fontName.NotoSansKhmer],
        },
        {
          language: this.languageMap[this.languageName.Lao],
          fontName: this.fontName.NotoSansLao,
          font: this.fontMap[this.fontName.NotoSansLao],
        },
        {
          language: this.languageMap[this.languageName.Punjabi],
          fontName: this.fontName.NotoSansGurmukhi,
          font: this.fontMap[this.fontName.NotoSansGurmukhi],
        },
        {
          language: this.languageMap[this.languageName.Sinhala],
          fontName: this.fontName.NotoSansSinhala,
          font: this.fontMap[this.fontName.NotoSansSinhala],
        },
        {
          language: this.languageMap[this.languageName.Marathi],
          fontName: this.fontName.NotoSansDevanagari,
          font: this.fontMap[this.fontName.NotoSansDevanagari],
        },
        {
          language: this.languageMap[this.languageName.Hindi],
          fontName: this.fontName.NotoSansDevanagari,
          font: this.fontMap[this.fontName.NotoSansDevanagari],
        },
        {
          language: this.languageMap[this.languageName.Nepali],
          fontName: this.fontName.NotoSansDevanagari,
          font: this.fontMap[this.fontName.NotoSansDevanagari],
        },
      ].map((item) => ({
        ...item,
        isChecked: true,
        isVisible: true,
      }))
    );

    // Clear
    this.html.searchClearButton.addEventListener("click", (event) => {
      this.html.searchClearButton.style.opacity = 0;
      this.html.searchInput.value = "";
      this.state = this.state.map((s) => {
        s.isVisible = true;
        return s;
      });
    });

    // Toggle
    this.html.checkbox.addEventListener("click", (event) => {
      this.emit(
        this.state.map((s) => {
          s.isChecked = event.target.checked;
          return s;
        })
      );
    });

    // Search
    this.html.searchInput.value = "";
    this.html.searchClearButton.style.opacity = 0;
    this.html.searchInput.addEventListener("input", (event) => {
      const value = event.target.value;
      this.html.searchClearButton.style.opacity = value ? 1 : 0;
      this.emit(
        this.state.map((s) => {
          s.isVisible = `${s.language.name} ${s.language.locale}`
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase());
          return s;
        })
      );
    });
  }

  emit(state) {
    this.state = state;
    this.render();
  }

  render() {
    // Clear
    this.html.container.innerHTML = "";

    // Add template
    for (const item of this.state) {
      const languageName = item.language.name;
      const display = item.isVisible ? "flex" : "none";
      const checked = item.isChecked ? "checked" : "";
      const template = `<div class="row" style="display:${display}; align-items: center; padding: 4px;">
        <input type="checkbox" value="${languageName}" name="${languageName}" id="${languageName}" ${checked}/>
        <label for="${languageName}" style="display: flex; width: 100%; padding: 4px; box-sizing: border-box;cursor: pointer;">
          <span style="flex-grow: 1;">
            ${languageName} (${item.language.locale})
          </span>
          <span style="color: grey;">
            ${item.font ? item.fontName : "not installed"}
          </span>
        </label>
      </div>`;
      this.html.container.insertAdjacentHTML("beforeend", template);
    }
  }
}
