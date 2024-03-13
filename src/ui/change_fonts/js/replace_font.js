export default class ReplaceFont {
  html = {
    fontFamilySelect: document.querySelector("#fontFamilySelect"),
    fontStyleSelect: document.querySelector("#fontStyleSelect"),
    historyContainer: document.querySelector("#replaceFont .historyContainer"),
  };
  state = {};

  onStateChanged;
  onHistoryDeleteButtonPressed;
  constructor(
    availableFonts,
    replaceFont,
    replaceFontHistory,
    onStateChanged,
    onHistoryDeleteButtonPressed
  ) {
    this.onStateChanged = onStateChanged;
    this.onHistoryDeleteButtonPressed = onHistoryDeleteButtonPressed;
    this.init(availableFonts, replaceFont, replaceFontHistory);

    this.html.fontFamilySelect.addEventListener("change", (event) => {
      const family = event.target.value;
      const styles = this.state.fonts[family];
      const regular = "Regular";
      const style = styles.includes(regular) ? regular : styles[0];
      this.emit({
        ...this.state,
        replaceFont: {
          ...this.state.replaceFont,
          family,
          style,
        },
      });
      this.onStateChanged(this.state);
    });

    this.html.fontStyleSelect.addEventListener("change", (event) => {
      this.emit({
        ...this.state,
        replaceFont: {
          ...this.state.replaceFont,
          style: event.target.value,
        },
      });
      this.onStateChanged(this.state);
    });
  }

  init(availableFonts, replaceFont, replaceFontHistory) {
    const fonts = {};
    for (const font of availableFonts) {
      const { family, style } = font.fontName;
      if (!fonts[family]) fonts[family] = [];
      fonts[family].push(style);
    }
    this.emit({
      fonts,
      replaceFont,
      replaceFontHistory,
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
    this.html.fontFamilySelect.value = this.state.replaceFont.family;

    // FontStyle
    this.html.fontStyleSelect.innerHTML = "";
    for (const style of this.state.fonts[this.state.replaceFont.family]) {
      const styleOption = document.createElement("option");
      styleOption.value = style;
      styleOption.innerText = style;
      this.html.fontStyleSelect.appendChild(styleOption);
    }
    this.html.fontStyleSelect.value = this.state.replaceFont.style;

    // History
    this.html.historyContainer.innerHTML = "";
    for (const replaceFont of this.state.replaceFontHistory) {
      const historyDiv = document.createElement("div");
      const fontDiv = document.createElement("div");
      const familySpan = document.createElement("span");
      const styleSpan = document.createElement("span");
      const deleteButton = document.createElement("button");

      historyDiv.appendChild(fontDiv);
      historyDiv.appendChild(deleteButton);
      fontDiv.appendChild(familySpan);
      fontDiv.appendChild(styleSpan);

      historyDiv.classList.add("history");
      fontDiv.classList.add("font");
      familySpan.classList.add("family");
      styleSpan.classList.add("style");
      deleteButton.classList.add("deleteButton");

      const { family, style } = replaceFont;
      familySpan.textContent = family;
      styleSpan.textContent = ` - ${style}`;
      deleteButton.textContent = "×";

      fontDiv.addEventListener("click", () => {
        this.emit({
          ...this.state,
          replaceFont: {
            family,
            style,
          },
        });
        this.onStateChanged(this.state);
      });

      deleteButton.addEventListener("click", () => {
        this.onHistoryDeleteButtonPressed(replaceFont);
      });

      this.html.historyContainer.appendChild(historyDiv);
    }
  }
}
