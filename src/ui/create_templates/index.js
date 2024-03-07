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

    this.widgets = {
      platform: new Platform(platform, (changedPlatform) => {
        // On platform changed
        this.state = {
          ...this.state,
          platform: changedPlatform,
        };
      }),
      templates: new Templates(
        this.getTemplates(platformTemplates, platform),
        (changedTemplates) => {
          // On templates changed
          this.state = {
            ...this.state,
            templates: {
              ...this.state.templates,
              [this.state.platform]: changedTemplates,
            },
          };
        }
      ),
      textDirection: new TextDirection(
        textDirection,
        (changedTextDirection) => {
          // On text direction changed
          this.state = {
            ...this.state,
            textDirection: changedTextDirection,
          };
        }
      ),
      targetLocales: new TargetLocales(
        this.getTargetLocales(platformLocales, platform, textDirection),
        (changedTargetLocales) => {
          // On target locales changed
          this.state = {
            ...this.state,
            targetLocales: {
              ...this.state.targetLocales,
              [this.state.textDirection]: changedTargetLocales,
            },
          };
        }
      ),
      templateScale: new TemplateScale(
        templateScale,
        (changedTemplateScale) => {
          // on template scale changed
          this.state = {
            ...this.state,
            templateScale: changedTemplateScale,
          };
        }
      ),
      createTemplatesButton: new CreateTemplatesButton(() =>
        // On create templates button pressed
        this.channel.sendMessage(this.channel.types.createTemplates, {
          platform: this.state.platform,
          textDirection: this.state.textDirection,
          templateScale: this.state.templateScale,
          targetLocales: this.state.targetLocales[this.state.textDirection]
            .filter((l) => l.isChecked)
            .map((l) => l.targetLocale),
          templates: this.state.templates[this.state.platform]
            .filter((d) => d.isChecked)
            .map((d) => ({
              template: d.template,
              count: d.count,
            })),
        })
      ),
    };

    this.state = {
      platform,
      templates: {
        [this.widgets.platform.android]: this.getTemplates(
          platformTemplates,
          this.widgets.platform.android
        ),
        [this.widgets.platform.ios]: this.getTemplates(
          platformTemplates,
          this.widgets.platform.ios
        ),
      },
      textDirection,
      templateScale,
      targetLocales: {
        [this.widgets.textDirection.LTR]: this.getTargetLocales(
          platformLocales,
          platform,
          this.widgets.textDirection.LTR
        ),
        [this.widgets.textDirection.RTL]: this.getTargetLocales(
          platformLocales,
          platform,
          this.widgets.textDirection.RTL
        ),
      },
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
