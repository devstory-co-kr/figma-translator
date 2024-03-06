import "../core/base.css";
import Channel from "../core/channel.js";
import "./index.css";
import CreateTemplatesButton from "./js/create_templates_button.js";
import TargetLocales from "./js/target_locales.js";
import TemplateScale from "./js/template_scale.js";
import Templates from "./js/templates.js";
import TextDirection from "./js/text_direction.js";

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
        const {
          platform,
          platformTemplates,
          templateScale,
          textDirection,
          platformLocales,
        } = data;
        createTemplates = new CreateTemplates(
          channel,
          platform,
          textDirection,
          templateScale,
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
  channel;
  widgets;
  _state;
  get state() {
    return this._state;
  }
  set state(value) {
    this._state = value;
    this.render();
  }

  constructor(
    channel,
    platform,
    textDirection,
    templateScale,
    platformLocales,
    platformTemplates
  ) {
    this.channel = channel;
    this.state = {
      platform,
      templates: platformTemplates[platform],
      textDirection,
      templateScale,
      getLocales: () =>
        platformLocales[platform].filter(
          (l) => l.translatorLanguage.textDirection === this.state.textDirection
        ),
      platformLocales,
      platformTemplates,
    };
  }

  render() {
    this.widgets = {
      templates: new Templates(this.state.templates),
      textDirection: new TextDirection(
        this.state.textDirection,
        (textDirection) => {
          // On text direction changed
          this.state = {
            ...this.state,
            textDirection,
          };
        }
      ),
      targetLocales: new TargetLocales(this.state.getLocales()),
      templateScale: new TemplateScale(this.state.templateScale),
      createTemplatesButton: new CreateTemplatesButton(
        this.state.platform,
        () =>
          // On create templates button pressed
          this.channel.sendMessage(this.channel.types.createTemplates, {
            textDirection: this.widgets.textDirection.state.textDirection,
            templateScale: this.widgets.templateScale.state.scale,
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
