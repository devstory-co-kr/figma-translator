export default class ReplaceFont {
  html = {
    fontFamilySelect: document.querySelector("#fontFamilySelect"),
    fontStyleSelect: document.querySelector("#fontStyleSelect"),
  };
  state = {};

  constructor(availableFonts, replaceFont, onChanged) {
    this.init(availableFonts, replaceFont);

    this.html.fontFamilySelect.addEventListener("change", (event) => {
      this.emit({
        ...this.state,
        selectedFont: {
          ...this.state.replaceFont,
          family: event.target.value,
        },
      });
      this.onChanged(this.state);
    });

    this.html.fontStyleSelect.addEventListener("change", (event) => {
      this.emit({
        ...this.state,
        replaceFont: {
          ...this.state.replaceFont,
          style: event.target.value,
        },
      });
      this.onChanged(this.state);
    });
  }

  init(availableFonts, replaceFont) {
    const fonts = {};
    for (const font of availableFonts) {
      const { family, style } = font.fontName;
      if (!fonts[family]) fonts[family] = [];
      fonts[family].push(style);
    }
    this.emit({
      fonts,
      replaceFont,
    });
  }

  emit(state) {
    if (this.state === state) return;
    this.state = state;
    this.render();
  }

  render() {
    // FontFamily
    this.html.fontFamilySelect.innerHTML = "";
    for (const family of Object.keys(this.state.fonts)) {
      const familyOption = document.createElement("option");
      familyOption.value = family;
      familyOption.innerText = family;
      this.html.fontFamilySelect.appendChild(familyOption);
    }

    // FontStyle
    this.html.fontStyleSelect.innerHTML = "";
    for (const style of this.state.fonts[this.state.replaceFont.family]) {
      const styleOption = document.createElement("option");
      styleOption.value = style;
      styleOption.innerText = style;
      this.html.fontStyleSelect.appendChild(styleOption);
    }

    this.html.fontFamilySelect.value = this.state.replaceFont.family;
    this.html.fontStyleSelect.value = this.state.replaceFont.style;
  }
}
