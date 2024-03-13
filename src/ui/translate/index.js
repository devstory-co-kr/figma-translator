import "../core/base.css";
import Channel from "../core/channel.js";
import "./index.css";
import AutoSize from "./js/auto_size.js";
import Cache from "./js/cache.js";
import ClearCacheButton from "./js/clear_cache_button.js";
import ExclusionKeywords from "./js/exclusion_keywords.js";
import FontReplacement from "./js/font_replacement.js";
import SourceLanguage from "./js/source_language.js";
import TranslateButton from "./js/translate_button.js";

window.addEventListener("DOMContentLoaded", () => {
  const channel = new Channel("translate", {
    init: "init",
    translate: "translate",
    translateStateChanged: "translateStateChanged",
    clearCache: "clearCache",
  });

  // On message
  let translate;
  channel.onMessage((type, data) => {
    switch (type) {
      case channel.types.init:
        translate = new Translate(channel, data);
        break;
      case channel.types.selectedFonts:
        const { fonts } = data;
        translate.emit({
          ...translate.state,
          fonts,
        });
        break;
    }
  });

  // Init
  channel.sendMessage(channel.types.init);
});

class Translate {
  channel;
  html;
  state;

  constructor(channel, data) {
    this.channel = channel;
    const {
      // Spread translate state
      autoSize,
      useCache,
      sourceLanguage,
      fontReplacementState,
      exclusionKeywords,
      fonts,

      // Languages & fonts
      supportLanguages,
      availableFonts,
    } = data;

    this.html = {
      sourceLanguage: new SourceLanguage(
        supportLanguages,
        sourceLanguage,
        (value) => {
          // On source language changed
          this.emit({
            ...this.state,
            sourceLanguage: value,
          });
        }
      ),
      autoSize: new AutoSize(autoSize, (value) => {
        // On auto size changed
        this.emit({
          ...this.state,
          autoSize: value,
        });
      }),
      cache: new Cache(useCache, (value) => {
        // On use cache changed
        this.emit({
          ...this.state,
          useCache: value,
        });
      }),
      exclusionKeywords: new ExclusionKeywords(exclusionKeywords, (value) => {
        // On exclusion keywords changed
        this.emit({
          ...this.state,
          exclusionKeywords: value,
        });
      }),
      fontReplacement: new FontReplacement(
        fontReplacementState,
        (value) => {
          // On font replacement changed
          this.emit({
            ...this.state,
            fontReplacementState: value.fontReplacementState,
          });
        },
      ),
      clearCacheButton: new ClearCacheButton(() => {
        // On clear cache button pressed
        this.channel.sendMessage(this.channel.types.clearCache);
      }),
      translateButton: new TranslateButton(() => {
        // On translate button pressed
        this.channel.sendMessage(this.channel.types.translate, this.state);
      }),
    };

    this.emit({
      autoSize,
      useCache,
      sourceLanguage,
      fontReplacementState,
      exclusionKeywords,
    });
  }

  emit(state) {
    if (this.state === state) return;
    this.state = state;
    this.channel.sendMessage(
      this.channel.types.translateStateChanged,
      this.state
    );
    this.render();
  }

  render() {
    this.html.fontReplacement.emit({
      fonts: this.state.fonts,
      fontReplacementState: this.state.fontReplacementState,
    });
  }
}
