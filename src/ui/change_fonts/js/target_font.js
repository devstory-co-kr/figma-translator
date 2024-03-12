export default class TargetFont {
  html = {
    container: document.querySelector("#targetFont .container"),
  };
  state = {};

  constructor(selectedFonts) {
    this.init(selectedFonts);
  }

  init(selectedFonts) {
    const targets = {};
    for (const family of Object.keys(selectedFonts ?? {})) {
      for (const [style, nodes] of Object.entries(selectedFonts[family])) {
        if (!targets[family]) targets[family] = {};
        if (!targets[family][style]) targets[family][style] = {};
        targets[family][style] = {
          nodes,
          isChecked: false,
        };
      }
    }
    this.emit({
      targets,
    });
  }

  emit(state) {
    if (this.state === state) return;
    this.state = state;
    this.render();
  }

  render() {
    this.html.container.innerHTML = "";

    const familyList = Object.keys(this.state.targets);
    if (familyList.length === 0) {
      const divEmpty = document.createElement("div");
      divEmpty.classList.add("description");
      divEmpty.textContent = "Please select the object.";
      divEmpty.style.display = "flex";
      divEmpty.style.justifyContent = "center";
      divEmpty.style.alignItems = "center";
      divEmpty.style.height = "100%";
      this.html.container.appendChild(divEmpty);
      return;
    }

    for (const family of familyList) {
      const fontRoot = document.createElement("div");
      fontRoot.classList.add("font");

      const divFamily = document.createElement("div");
      divFamily.classList.add("fontFamily");
      divFamily.innerText = family;
      fontRoot.appendChild(divFamily);

      const divStyleContainer = document.createElement("div");
      divStyleContainer.classList.add("fontStyleContainer");
      fontRoot.appendChild(divStyleContainer);
      for (const [style, value] of Object.entries(this.state.targets[family])) {
        const divFontStyle = document.createElement("div");
        divFontStyle.classList.add("fontStyle");
        if (value.isChecked) divFontStyle.classList.add("checked");
        divFontStyle.innerText = style;
        divFontStyle.addEventListener("click", () => {
          value.isChecked = !value.isChecked;
          this.emit({
            ...this.state,
          });
        });
        divStyleContainer.appendChild(divFontStyle);
      }
      this.html.container.appendChild(fontRoot);
    }
  }
}
