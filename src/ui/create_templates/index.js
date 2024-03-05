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
        const { platform, templates, locales } = data;
        createTemplates = new CreateTemplates(
          channel,
          platform,
          templates,
          locales
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

  constructor(channel, platform, templates, locales) {
    this.channel = channel;
    this.state = {
      platform,
      templates,
      locales,
    };
    this.widgets = {
      templates: new Templates(templates),
      targetLocales: new TargetLocales(locales),
      createTemplatesButton: new CreateTemplatesButton(platform, () =>
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
