export default class ExclusionKeywords {
  html = {
    exclusionKeywords: document.querySelector("#exclusionKeywords"),
    keywordInput: document.querySelector("#exclusionKeywordsSearchInput"),
    addButton: document.querySelector("#exclusionKeywordsAddButton"),
    keywordContainer: document.querySelector("#exclusionKeywords .container"),
  };
  state = {};
  onChanged;

  constructor(exclusionKeywords, onChanged) {
    this.onChanged = onChanged;
    this.emit({ exclusionKeywords });

    this.html.keywordInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.addKeyword(this.html.keywordInput.value);
      }
    });

    this.html.addButton.addEventListener("click", () => {
      this.addKeyword(this.html.keywordInput.value);
    });
  }

  addKeyword(value) {
    const keyword = value.trim();
    if (!keyword) {
      return;
    }

    const exist = Array.from(this.state.exclusionKeywords).includes(keyword);
    this.emit({
      exclusionKeywords: exist
        ? [...this.state.exclusionKeywords]
        : [...this.state.exclusionKeywords, keyword],
    });
    this.onChanged(this.state.exclusionKeywords);
    this.html.keywordInput.value = "";
  }

  removeKeyword(value) {
    const keywords = Array.from(this.state.exclusionKeywords);
    const index = keywords.indexOf(value);
    if (index >= 0) {
      keywords.splice(index, 1);
      this.emit({
        exclusionKeywords: keywords,
      });
      this.onChanged(this.state.exclusionKeywords);
    }
  }

  emit(state) {
    if (this.state === state) return;
    this.state = state;
    this.render();
  }

  render() {
    this.html.keywordContainer.innerHTML = "";
    console.log(this.state);
    if (this.state.exclusionKeywords.length === 0) {
      const template =
        "<div style='display:flex; justify-content:center; align-items:center; padding: 8px; color: rgba(0,0,0,0.3)'>No Keywords</div>";
      this.html.keywordContainer.insertAdjacentHTML("beforeend", template);
    } else {
      for (const keyword of this.state.exclusionKeywords) {
        const template = `<div style='display:flex; align-items: center; padding: 4px 8px;'>
          <span style="flex-grow:1; margin-right: 4px;">${keyword}</span>
          <button style="border:none; width: 38px;">×</button>
        </div>`;
        const itemWrapper = document.createElement("div");
        itemWrapper.style.width = "100%";
        itemWrapper.insertAdjacentHTML("beforeend", template);
        itemWrapper.addEventListener("click", (event) => {
          this.removeKeyword(keyword);
        });
        this.html.keywordContainer.appendChild(itemWrapper);
      }
    }
  }
}
