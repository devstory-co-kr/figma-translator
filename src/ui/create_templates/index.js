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
  html;
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

    this.html = {
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
        targetLocales[platform][textDirection],
        (changedTargetLocales) => {
          // On target locales changed
          this.emit({
            ...this.state,
            targetLocales: {
              ...this.state.targetLocales,
              [this.state.platform]: {
                [this.state.textDirection]: changedTargetLocales,
              },
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
    console.log(this.state);
    this.html.templates.emit(this.state.templates[this.state.platform]);
    this.html.targetLocales.emit(
      this.state.targetLocales[this.state.platform][this.state.textDirection]
    );
  }
}
