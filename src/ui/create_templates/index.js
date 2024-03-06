import "../core/base.css";
import Channel from "../core/channel.js";
import "./index.css";
import CreateTemplatesButton from "./js/create_templates_button.js";
import TargetLocales from "./js/target_locales.js";
import Templates from "./js/templates.js";

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
        const { platform, platformTemplates, textDirection, platformLocales } =
          data;
        createTemplates = new CreateTemplates(
          channel,
          platform,
          textDirection,
          platformLocales,
          platformTemplates
        );
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

  constructor(
    channel,
    platform,
    textDirection,
    platformLocales,
    platformTemplates
  ) {
    this.channel = channel;
    this.state = {
      platform,
      templates: platformTemplates[platform],
      textDirection,
      locales: platformLocales[platform].filter(
        (l) => l.translatorLanguage.textDirection === textDirection
      ),
      platformLocales,
      platformTemplates,
    };
    this.render();
  }

  render() {
    this.widgets = {
      templates: new Templates(this.state.templates),
      targetLocales: new TargetLocales(this.state.locales),
      createTemplatesButton: new CreateTemplatesButton(
        this.state.platform,
        () =>
          // Send createTemplates
          this.channel.sendMessage(this.channel.types.createTemplates, {
            targetLocales: this.widgets.targetLocales.state
              .filter((l) => l.isChecked)
              .map((l) => l.targetLocale),
            templates: this.widgets.templates.state
              .filter((d) => d.isChecked)
              .map((d) => ({
                template: d.template,
                count: d.count,
              })),
          })
      ),
    };
  }
}
