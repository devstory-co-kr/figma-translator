export default class Templates {
  html = {
    title: document.getElementById("templatesTitle"),
    container: document.getElementById("templatesContainer"),
  };

  _state;
  get state() {
    return this._state;
  }
  set state(value) {
    this._state = value;
    this.render();
  }

  onStateChanged;
  constructor(templates, onStateChanged) {
    this.initState(templates);
    this.onStateChanged = onStateChanged;
  }

  initState(templates) {
    this.state = templates;
  }

  render() {
    // Clear
    while (this.html.container.firstChild) {
      this.html.container.removeChild(this.html.container.firstChild);
    }

    // Add templates
    let nChecked = 0;
    for (const s of this.state) {
      const { template, isChecked, count } = s;
      const { name, frame } = template;
      const size = `${frame.size.w}x${frame.size.h}`;
      const checked = isChecked ? "checked" : "";
      if (checked) nChecked++;
      const item = `<div class="row" style="align-items: center; margin-top: 6px; font-size: 12px;">
        <input type="checkbox" value="${name}" name="${name}" id="${name}" ${checked}/>
        <div class="row" style="width: 100%;">
          <label for="${name}" style="display: flex; flex-direction:column; flex-basis:1000%; width: 100%; padding: 4px">
            <span style="">${name}</span>
            <span style="color: grey; font-size: 11px;">${size}</span>
          </label>
          <div class="row quantity" style="align-items: center; justify-content: end;">
            <input type="number" step="1" min="1" max="${frame.maxCount}" value="${count}" style="height: 30px;">
          </div>
        </div>
      </div>`;
      const itemWrapper = document.createElement("div");
      itemWrapper.style.width = "100%";
      itemWrapper.insertAdjacentHTML("beforeend", item);
      itemWrapper.addEventListener("click", (event) => {
        if (event.target.type === "checkbox") {
          s.isChecked = event.target.checked;
          this.onStateChanged(this.state);
          this.render();
        }
      });
      itemWrapper.addEventListener("change", (event) => {
        if (event.target.type === "number") {
          let value = event.target.value;
          if (value > frame.maxCount) {
            value = frame.maxCount;
            event.target.value = value;
          } else if (value < 1) {
            value = 1;
            event.target.value = value;
          }
          s.count = value;
          this.onStateChanged(this.state);
          this.render();
        }
      });
      this.html.container.appendChild(itemWrapper);
    }

    // Update title
    this.html.title.innerText = "";
    this.html.title.insertAdjacentHTML(
      "beforeend",
      `Templates <span style="color: grey; font-weight: normal; font-size: 12px;"> (${nChecked}/${this.state.length})</span>`
    );
  }
}
