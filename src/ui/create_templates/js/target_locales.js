export default class TargetLocales {
  html = {
    searchInput: document.getElementById("targetLocaleSearch"),
    toggleCheckbox: document.getElementById("targetLocaleToggle"),
    localesContainer: document.getElementById("targetLocalesContainer"),
    searchClearButton: document.getElementById("targetSearchClearButton"),
  };

  _state;
  get state() {
    return this._state;
  }
  set state(value) {
    this._state = value;
    this.render();
  }

  constructor(locales) {
    this.state = locales.map((locale) => {
      return {
        targetLocale: locale,
        isChecked: true,
        isVisible: true,
      };
    });

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
    this.html.toggleCheckbox.addEventListener("click", (event) => {
      const isChecked = event.target.checked;
      this.state = this.state.map((s) => {
        s.isChecked = isChecked;
        return s;
      });
    });

    // Search
    this.html.searchInput.addEventListener("input", (event) => {
      const value = event.target.value;
      this.html.searchClearButton.style.opacity = value ? 1 : 0;
      this.state = this.state.map((s) => {
        s.isVisible = `${s.targetLocale.name} ${s.targetLocale.locale}`
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase());
        return s;
      });
    });
  }

  render() {
    // Clear
    while (this.html.localesContainer.firstChild) {
      this.html.localesContainer.removeChild(
        this.html.localesContainer.firstChild
      );
    }

    // Add
    for (const s of this.state) {
      const { targetLocale, isChecked, isVisible } = s;
      const tl = targetLocale;
      const display = isVisible ? "flex" : "none";
      const checked = isChecked ? "checked" : "";
      const item = `<div class="row" style="align-items: center; display:${display}; margin-top: 6px">
        <input type="checkbox" value="${tl.locale}" name="${tl.locale}" id="${tl.locale}" ${checked}/>
        <label for="${tl.locale}" style="display: block; width: 100%; padding: 4px">${tl.name} (${tl.locale})</label>
      </div>`;
      const itemWrapper = document.createElement("div");
      itemWrapper.insertAdjacentHTML("beforeend", item);
      itemWrapper.addEventListener("click", (event) => {
        if (event.target.type === "checkbox") {
          s.isChecked = event.target.checked;
        }
      });
      this.html.localesContainer.appendChild(itemWrapper);
    }
  }
}