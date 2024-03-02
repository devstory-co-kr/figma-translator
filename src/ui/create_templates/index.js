import "../core/base.css";
import Channel from "../core/channel.js";
import "./index.css";
import CreateTemplatesButton from "./js/create_templates_button.js";
import SourceLocale from "./js/source_locale.js";
import TargetLocales from "./js/target_locales.js";

window.addEventListener("DOMContentLoaded", () => {
  const channel = new Channel({
    init: "init",
    createTemplates: "createTemplates",
  });

  // On message
  let createTemplates;
  channel.onMessage((type, data) => {
    switch (type) {
      case channel.types.init:
        const { platform, locales } = data;
        createTemplates = new CreateTemplates(channel, platform, locales);
        break;
    }
  });

  // Init
  channel.sendMessage(channel.types.init);
});

class CreateTemplates {
  state;
  channel;
  widgets;

  constructor(channel, platform, locales) {
    this.channel = channel;
    this.state = {
      platform,
      locales,
    };
    this.widgets = {
      sourceLocale: new SourceLocale(locales),
      targetLocales: new TargetLocales(locales),
      createTemplatesButton: new CreateTemplatesButton(platform, () =>
        // Send createTemplates
        this.channel.sendMessage(this.channel.types.createTemplates, {
          sourceLocale: this.widgets.sourceLocale.state.sourceLocale,
          targetLocales: this.widgets.targetLocales.state
            .filter((l) => l.isChecked)
            .map((l) => l.targetLocale),
        })
      ),
    };
  }
}
