export default class TargetLocales {
  html = {
    title: document.getElementById("targetLocalesTitle"),
    searchInput: document.getElementById("targetLocaleSearchInput"),
    toggleCheckbox: document.getElementById("targetLocaleToggleCheckbox"),
    container: document.getElementById("targetLocalesContainer"),
    searchClearButton: document.querySelector(
      "#targetLocales .inputClearButton"
    ),
  };

  state;
  onTargetLocalesChanged;

  emit(state) {
    if (this.state === state) return;
    this.state = state;
    this.render();
  }

  constructor(locales, onTargetLocalesChanged) {
    this.onTargetLocalesChanged = onTargetLocalesChanged;
    this.emit(locales);

    // Clear
    this.html.searchClearButton.addEventListener("click", () => {
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
    this.html.toggleCheckbox.addEventListener("click", (event) => {
      const isChecked = event.target.checked;
      this.emit(
        this.state.map((s) => {
          s.isChecked = isChecked;
          return s;
        })
      );
      this.onTargetLocalesChanged(this.state);
    });

    // Search
    this.html.searchInput.value = "";
    this.html.searchClearButton.style.opacity = 0;
    this.html.searchInput.addEventListener("input", (event) => {
      const value = event.target.value;
      this.html.searchClearButton.style.opacity = value ? 1 : 0;
      this.emit(
        this.state.map((s) => {
          s.isVisible = `${s.targetLocale.name} ${s.targetLocale.locale}`
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase());
          return s;
        })
      );
      this.onTargetLocalesChanged(this.state);
    });
  }

  render() {
    // Clear
    this.html.container.innerHTML = "";

    // Add locales
    let nChecked = 0;
    for (const s of this.state) {
      const { targetLocale, isChecked, isVisible } = s;
      const tl = targetLocale;
      const display = isVisible ? "flex" : "none";
      const checked = isChecked ? "checked" : "";
      if (checked) nChecked++;
      const item = `<div class="row" style="align-items: center; display:${display}; margin-top: 6px">
        <input type="checkbox" value="${tl.locale}" name="${tl.locale}" id="${tl.locale}" ${checked}/>
        <label for="${tl.locale}" style="display: flex; width: 100%; padding: 4px">
          <span style="flex-grow: 1;">${tl.name}</span>
          <span style="color: grey;">${tl.locale}</span>
        </label>
      </div>`;
      const itemWrapper = document.createElement("div");
      itemWrapper.style.width = "100%";
      itemWrapper.insertAdjacentHTML("beforeend", item);
      itemWrapper.addEventListener("click", (event) => {
        if (event.target.type === "checkbox") {
          s.isChecked = event.target.checked;
          this.emit([...this.state]);
          this.onTargetLocalesChanged(this.state);
        }
      });
      this.html.container.appendChild(itemWrapper);
    }

    // Update title
    this.html.title.innerText = "";
    this.html.title.insertAdjacentHTML(
      "beforeend",
      `Locales <span style="color: grey; font-weight: normal; font-size: 12px;"> (${nChecked}/${this.state.length})</span>`
    );
  }
}
