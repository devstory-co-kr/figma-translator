export default class FontReplacement {
  html = {
    container: document.querySelector("#fontReplacement .container"),
    checkbox: document.querySelector("#fontReplacementCheckbox"),
    searchInput: document.querySelector("#fontReplacementSearchInput"),
    searchClearButton: document.querySelector(
      "#fontReplacement .inputClearButton"
    ),
    fontsContainer: document.querySelector("#fontReplacement .fontsContainer"),
  };
  state;
  onChanged;
  onFontStyleSelected;

  constructor(fonts, fontReplacementState, onChanged, onFontStyleSelected) {
    this.onChanged = onChanged;
    this.onFontStyleSelected = onFontStyleSelected;
    this.emit({
      fonts,
      fontReplacementState,
    });
    this.html.checkbox.checked = this.state.fontReplacementState.find(
      (item) => item.isChecked
    )
      ? true
      : false;

    // Clear
    this.html.searchClearButton.addEventListener("click", (event) => {
      this.html.searchClearButton.style.opacity = 0;
      this.html.searchInput.value = "";
      this.emit({
        fonts: this.state.fonts,
        fontReplacementState: this.state.fontReplacementState.map((s) => {
          s.isVisible = true;
          return s;
        }),
      });
    });

    // Toggle
    this.html.checkbox.addEventListener("click", (event) => {
      this.emit({
        fonts: this.state.fonts,
        fontReplacementState: this.state.fontReplacementState.map((s) => {
          s.isChecked = event.target.checked;
          return s;
        }),
      });
      this.onChanged(this.state);
    });

    // Search
    this.html.searchInput.value = "";
    this.html.searchClearButton.style.opacity = 0;
    this.html.searchInput.addEventListener("input", (event) => {
      const value = event.target.value;
      this.html.searchClearButton.style.opacity = value ? 1 : 0;
      this.emit({
        fonts: this.state.fonts,
        fontReplacementState: this.state.fontReplacementState.map((s) => {
          s.isVisible = `${s.language.name} ${s.language.locale}`
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase());
          return s;
        }),
      });
    });
  }

  emit(state) {
    if (this.state === state) return;
    this.state = state;
    this.render();
  }

  render() {
    // Clear
    this.html.container.innerHTML = "";
    this.html.fontsContainer.innerHTML = "";

    // Add template
    for (const item of this.state.fontReplacementState) {
      const languageName = item.language.name;
      const display = item.isVisible ? "flex" : "none";
      const checked = item.isChecked ? "checked" : "";
      const template = `<div class="row" style="display:${display}; align-items: center; padding: 4px;">
        <input type="checkbox" value="${languageName}" name="${languageName}" id="${languageName}" ${checked}/>
        <label for="${languageName}" style="display: flex; width: 100%; padding: 4px; box-sizing: border-box;cursor: pointer;">
          <span style="flex-grow: 1;">
            ${languageName} (${item.language.locale})
          </span>
          ${
            item.font
              ? `<span style="color: grey;">${item.fontName}</span>`
              : `<a href="https://fonts.google.com/?query=${item.fontName}" target="_blank">Download</a>`
          }
        </label>
      </div>`;
      const itemWrapper = document.createElement("div");
      itemWrapper.style.width = "100%";
      itemWrapper.insertAdjacentHTML("beforeend", template);
      itemWrapper.addEventListener("click", (event) => {
        if (event.target.type === "checkbox") {
          item.isChecked = event.target.checked;
          this.emit({
            ...this.state,
          });
          this.onChanged(this.state);
        }
      });
      this.html.container.appendChild(itemWrapper);
    }

    // Add fonts
    for (const fontFamily of Object.keys(this.state.fonts ?? {})) {
      const familyWrapper = document.createElement("div");
      familyWrapper.classList.add("column");
      familyWrapper.classList.add("w100");

      // FontFamily
      const familyItem = document.createElement("span");
      familyItem.classList.add("fontFamily");
      familyItem.textContent = fontFamily;
      familyWrapper.appendChild(familyItem);

      // FontStyle
      const styleWrapper = document.createElement("div");
      styleWrapper.classList.add("fontStyleWrapper");
      familyWrapper.appendChild(styleWrapper);
      for (const style of Object.keys(this.state.fonts[fontFamily] ?? {})) {
        const styleItem = document.createElement("span");
        styleItem.classList.add("fontStyle");
        styleItem.textContent = style;
        styleItem.addEventListener("click", () => {
          this.onFontStyleSelected(this.state.fonts[fontFamily][style]);
        });
        styleWrapper.appendChild(styleItem);
      }
      this.html.fontsContainer.style.padding = "0 8px";
      this.html.fontsContainer.appendChild(familyWrapper);
    }
  }
}
