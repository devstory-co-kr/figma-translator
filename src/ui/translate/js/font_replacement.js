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
  state;
  onChanged;

  constructor(fontReplacementState, onChanged) {
    this.onChanged = onChanged;
    this.emit(fontReplacementState);

    // Clear
    this.html.searchClearButton.addEventListener("click", (event) => {
      this.html.searchClearButton.style.opacity = 0;
      this.html.searchInput.value = "";
      this.emit(
        this.state.map((s) => {
          s.isVisible = true;
          return s;
        })
      );
    });

    // Toggle
    this.html.checkbox.addEventListener("click", (event) => {
      this.emit(
        this.state.map((s) => {
          s.isChecked = event.target.checked;
          return s;
        })
      );
      this.onChanged(this.state);
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
    if (this.state === state) return;
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
          this.emit([...this.state]);
          this.onChanged(this.state);
        }
      });
      this.html.container.appendChild(itemWrapper);
    }
  }
}
