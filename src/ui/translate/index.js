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

  fontName = {
    NotoSansMyanmar: "Noto Sans Myanmar",
    NotoSansArmenian: "Noto Sans Armenian",
    NotoSansEthiopic: "Noto Sans Ethiopic",
    NotoSansGeorgian: "Noto Sans Georgian",
    NotoSansKhmer: "Noto Sans Khmer",
    NotoSansLao: "Noto Sans Lao",
    NotoSansGurmukhi: "Noto Sans Gurmukhi",
    NotoSansSinhala: "Noto Sans Sinhala",
    NotoSansDevanagari: "Noto Sans Devanagari",
  };

  languageName = {
    Myanmar: "Myanmar",
    Amharic: "Amharic",
    Armenian: "Armenian",
    Georgian: "Georgian",
    Khmer: "Khmer",
    Lao: "Lao",
    Punjabi: "Punjabi",
    Sinhala: "Sinhala",
    Marathi: "Marathi",
    Hindi: "Hindi",
    Nepali: "Nepali",
  };

  constructor(channel, data) {
    this.channel = channel;
    const { autoSize, sourceLanguage, supportLanguages, availableFonts } = data;

    // LanguageMap
    const languageMap = {};
    for (const language of supportLanguages) {
      languageMap[language.name] = language;
    }

    // FontMap
    const fontMap = {};
    for (const font of availableFonts) {
      fontMap[font.fontName.family] = font.fontName;
    }

    const fontReplacementState = [
      {
        language: languageMap[this.languageName.Myanmar],
        fontName: this.fontName.NotoSansMyanmar,
        font: fontMap[this.fontName.NotoSansMyanmar],
      },
      {
        language: languageMap[this.languageName.Amharic],
        fontName: this.fontName.NotoSansEthiopic,
        font: fontMap[this.fontName.NotoSansEthiopic],
      },
      {
        language: languageMap[this.languageName.Armenian],
        fontName: this.fontName.NotoSansArmenian,
        font: fontMap[this.fontName.NotoSansArmenian],
      },
      {
        language: languageMap[this.languageName.Georgian],
        fontName: this.fontName.NotoSansGeorgian,
        font: fontMap[this.fontName.NotoSansGeorgian],
      },
      {
        language: languageMap[this.languageName.Khmer],
        fontName: this.fontName.NotoSansKhmer,
        font: fontMap[this.fontName.NotoSansKhmer],
      },
      {
        language: languageMap[this.languageName.Lao],
        fontName: this.fontName.NotoSansLao,
        font: fontMap[this.fontName.NotoSansLao],
      },
      {
        language: languageMap[this.languageName.Punjabi],
        fontName: this.fontName.NotoSansGurmukhi,
        font: fontMap[this.fontName.NotoSansGurmukhi],
      },
      {
        language: languageMap[this.languageName.Sinhala],
        fontName: this.fontName.NotoSansSinhala,
        font: fontMap[this.fontName.NotoSansSinhala],
      },
      {
        language: languageMap[this.languageName.Marathi],
        fontName: this.fontName.NotoSansDevanagari,
        font: fontMap[this.fontName.NotoSansDevanagari],
      },
      {
        language: languageMap[this.languageName.Hindi],
        fontName: this.fontName.NotoSansDevanagari,
        font: fontMap[this.fontName.NotoSansDevanagari],
      },
      {
        language: languageMap[this.languageName.Nepali],
        fontName: this.fontName.NotoSansDevanagari,
        font: fontMap[this.fontName.NotoSansDevanagari],
      },
    ].map((item) => ({
      ...item,
      isChecked: item.font ? true : false,
      isVisible: true,
    }));

    this.widgets = {
      sourceLanguage: new SourceLanguage(
        supportLanguages,
        sourceLanguage,
        (changedSourceLanguage) => {
          // On source language changed
          this.emit({
            ...this.state,
            sourceLanguage: changedSourceLanguage,
          });
        }
      ),
      autoSize: new AutoSize(autoSize, (changedAutoSize) => {
        // On auto size changed
        this.emit({
          ...this.state,
          autoSize: changedAutoSize,
        });
      }),
      fonts: new FontReplacement(
        fontReplacementState,
        (changedFontReplacementState) => {
          // On font replacement changed
          this.emit({
            ...this.state,
            fontReplacementState: changedFontReplacementState,
          });
        }
      ),
      translateButton: new TranslateButton(() => {
        // On translate button pressed
        channel.sendMessage(channel.types.translate, this.state);
      }),
    };

    this.emit({ autoSize, sourceLanguage, fontReplacementState });
  }

  emit(state) {
    if (this.state === state) return;
    this.state = state;
    this.render();
  }

  render() {}
}
