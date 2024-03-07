import "../core/base.css";
import Channel from "../core/channel.js";
import "./index.css";
import SourceLanguage from "./js/source_language.js";

window.addEventListener("DOMContentLoaded", () => {
  const channel = new Channel("translate", {
    init: "init",
    translate: "translate",
  });

  // On message
  let translate;
  channel.onMessage((type, data) => {
    switch (type) {
      case channel.types.init:
        translate = new Translate(data);
        break;
    }
  });

  // Init
  channel.sendMessage(channel.types.init);
});

class Translate {
  widgets;

  _state;
  get state() {
    return this._state;
  }
  set state(value) {
    this._state = value;
    this.render();
  }

  constructor(data) {
    const { autoSize, sourceLanguage, supportLanguages } = data;

    this.widgets = {
      sourceLanguage: new SourceLanguage(
        supportLanguages,
        sourceLanguage,
        (changedSourceLanguage) => {
          this.state = {
            ...this.state,
            sourceLanguage: changedSourceLanguage,
          };
        }
      ),
    };

    this.state = { autoSize, sourceLanguage, supportLanguages };
  }

  render() {}
}
