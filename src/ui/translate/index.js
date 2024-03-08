import "../core/base.css";
import Channel from "../core/channel.js";
import "./index.css";
import AutoSize from "./js/auto_size.js";
import FontReplacement from "./js/font_replacement.js";
import SourceLanguage from "./js/source_language.js";
import TranslateButton from "./js/translate_button.js";

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
        translate = new Translate(channel, data);
        break;
    }
  });

  // Init
  channel.sendMessage(channel.types.init);
});

class Translate {
  channel;
  widgets;
  state;

  constructor(channel, data) {
    this.channel = channel;
    const { autoSize, sourceLanguage, supportLanguages, availableFonts } = data;

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
      autoSize: new AutoSize(autoSize, (changedAutoSize) => {
        this.state = {
          ...this.state,
          autoSize: changedAutoSize,
        };
      }),
      fonts: new FontReplacement(supportLanguages, availableFonts),
      translateButton: new TranslateButton(() => {
        channel.sendMessage(channel.types.translate, this.state);
      }),
    };

    this.emit(autoSize, sourceLanguage, supportLanguages, availableFonts);
  }

  emit(autoSize, sourceLanguage, supportLanguages, availableFonts) {
    this.state = { autoSize, sourceLanguage, supportLanguages, availableFonts };
  }

  render() {}
}
