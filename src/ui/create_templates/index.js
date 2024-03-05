import "../core/base.css";
import Channel from "../core/channel.js";
import "./index.css";
import CreateTemplatesButton from "./js/create_templates_button.js";
import Devices from "./js/devices.js";
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
        const { platform, devices, locales } = data;
        createTemplates = new CreateTemplates(
          channel,
          platform,
          devices,
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

  constructor(channel, platform, devices, locales) {
    this.channel = channel;
    this.state = {
      platform,
      devices,
      locales,
    };
    this.widgets = {
      devices: new Devices(devices),
      targetLocales: new TargetLocales(locales),
      createTemplatesButton: new CreateTemplatesButton(platform, () =>
        // Send createTemplates
        this.channel.sendMessage(this.channel.types.createTemplates, {
          targetLocales: this.widgets.targetLocales.state
            .filter((l) => l.isChecked)
            .map((l) => l.targetLocale),
          devices: this.widgets.devices.state
            .filter((d) => d.isChecked)
            .map((d) => ({
              template: d.device,
              count: d.count,
            })),
        })
      ),
    };
  }
}
