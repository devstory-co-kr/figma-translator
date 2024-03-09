import "../core/base.css";
import Channel from "../core/channel.js";
import "./index.css";
import CreateTemplatesButton from "./js/create_templates_button.js";
import Platform from "./js/platform.js";
import TargetLocales from "./js/target_locales.js";
import TemplateScale from "./js/template_scale.js";
import Templates from "./js/templates.js";
import TextDirection from "./js/text_direction.js";

window.addEventListener("DOMContentLoaded", () => {
  const channel = new Channel("createTemplates", {
    init: "init",
    createTemplates: "createTemplates",
    createTemplatesStateChanged: "createTemplatesStateChanged",
  });

  // On message
  let createTemplates;
  channel.onMessage((type, data) => {
    switch (type) {
      case channel.types.init:
        const {
          // State
          platform,
          textDirection,
          templateScale,
          targetLocales,
          templates,
          // Locales & Templates
          platformLocales,
          platformTemplates,
        } = data;
        createTemplates = new CreateTemplates(
          channel,
          platform,
          textDirection,
          templateScale,
          targetLocales,
          templates,
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
  state;

  emit(state) {
    if (this.state === state) return;
    this.state = state;
    this.channel.sendMessage(
      this.channel.types.createTemplatesStateChanged,
      this.state
    );
    this.render();
  }

  constructor(
    channel,
    platform,
    textDirection,
    templateScale,
    targetLocales,
    templates,
    platformLocales,
    platformTemplates
  ) {
    this.channel = channel;

    this.widgets = {
      platform: new Platform(platform, (changedPlatform) => {
        // On platform changed
        this.emit({
          ...this.state,
          platform: changedPlatform,
        });
      }),
      templates: new Templates(templates[platform], (changedTemplates) => {
        // On templates changed
        this.emit({
          ...this.state,
          templates: {
            ...this.state.templates,
            [this.state.platform]: changedTemplates,
          },
        });
      }),
      textDirection: new TextDirection(
        textDirection,
        (changedTextDirection) => {
          // On text direction changed
          this.emit({
            ...this.state,
            textDirection: changedTextDirection,
          });
        }
      ),
      targetLocales: new TargetLocales(
        targetLocales[textDirection],
        (changedTargetLocales) => {
          // On target locales changed
          this.emit({
            ...this.state,
            targetLocales: {
              ...this.state.targetLocales,
              [this.state.textDirection]: changedTargetLocales,
            },
          });
        }
      ),
      templateScale: new TemplateScale(
        templateScale,
        (changedTemplateScale) => {
          // on template scale changed
          this.emit({
            ...this.state,
            templateScale: changedTemplateScale,
          });
        }
      ),
      createTemplatesButton: new CreateTemplatesButton(() =>
        // On create templates button pressed
        this.channel.sendMessage(this.channel.types.createTemplates, this.state)
      ),
    };

    this.state = {
      platform,
      templates,
      textDirection,
      templateScale,
      targetLocales,
      platformLocales,
      platformTemplates,
    };
  }

  render() {
    this.widgets.templates.emit(this.state.templates[this.state.platform]);
    this.widgets.targetLocales.emit(
      this.state.targetLocales[this.state.textDirection]
    );
  }

  getTemplates(platformTemplates, platform) {
    return platformTemplates[platform].map((template) => ({
      template,
      isChecked: true,
      count: template.frame.maxCount,
    }));
  }

  getTargetLocales(platformLocales, platform, textDirection) {
    return platformLocales[platform]
      .filter((l) => l.translatorLanguage.textDirection === textDirection)
      .map((locale) => {
        return {
          targetLocale: locale,
          isChecked: true,
          isVisible: true,
        };
      });
  }
}
