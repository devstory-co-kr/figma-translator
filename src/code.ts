import { App, FigmaTranslator } from "./app";
import { Cmds } from "./command/cmd";
import { GoogleTranslator as GoogleTranslate } from "./components/translator/google_translator";
import { Translator } from "./components/translator/translator";
import { TranslateLanguageServiceImpl } from "./components/translator_language/translate_language.service";
import { Params } from "./param/param";
import { Config } from "./util/config";
import { InvalidFrameNameException } from "./util/exceptions";
import { getNodeListByType, searchFor, translate } from "./util/node_util";
import { Notification } from "./util/notification";

const name = "google-translator";
const config = new Config(name, figma);
const translator: Translator = new GoogleTranslate(config);
const app: App = new FigmaTranslator();

figma.parameters.on("input", (event: ParameterInputEvent) => {
  app.params[<Params>event.key].onInput(event);
  // switch (<Params>key) {
  //   case Params.language:
  //     const suggestions = Language.getLanguageStrings()
  //       .map((s) => ({
  //         languageStrings: s,
  //         score: Strings.search(s, query),
  //       }))
  //       .filter((e) => e.score >= 0)
  //       .sort((a, b) => a.score - b.score)
  //       .map((e) => e.languageStrings);
  //     result.setSuggestions(suggestions);
  //     break;
  // }
});

figma.on("run", (event: RunEvent) => {
  app.cmds[<Cmds>event.command].onRun(event);
  // switch (<Cmds>command) {
  //   case Cmds.translate:
  //     if (!parameters) {
  //       Notification.e("Sourcelanguage required");
  //       return;
  //     }
  //     const sourceLanguageString = parameters[Params.language];
  //     const sourceLanguage =
  //       Language.getLanguageFromString(sourceLanguageString);
  //     if (!sourceLanguage) {
  //       Notification.e("Invalid source language");
  //       return;
  //     }
  //     console.log(sourceLanguage);
  //     break;
  //   case Cmds.createTemplate:
  //     figma.showUI(__uiFiles__.createTemplate, { width: 300, height: 200 });
  //     break;
  // }
});

figma.ui.onmessage = async (msg) => {
  if (msg.type === "onDOMContentLoaded") {
    figma.ui.postMessage({
      type: "init",
      data: {
        config: config.data,
        languages: TranslateLanguageServiceImpl.languages,
      },
    });
    return;
  }

  if (msg.type === "onConfigChanged") {
    config.update(figma, msg.data);
    return;
  }

  if (msg.type === "onNotify") {
    if (msg.data.error) {
      Notification.e(msg.data.text);
    } else {
      Notification.i(msg.data.text);
    }
    return;
  }

  if (msg.type === "onTranslateButtonPressed") {
    try {
      // The first word in the frame name must be the ISO639 code.
      const frameList: SceneNode[] = getNodeListByType(
        figma.currentPage.selection,
        ["FRAME", "INSTANCE"]
      );

      if (frameList.length === 0) {
        Notification.i("Please select the frames you want to translate.");
        return;
      }

      const isPaid: boolean = msg.data.type === "paid";
      let nTextNode: number = 0;
      for (const frame of frameList) {
        const targetLang = TranslateLanguageServiceImpl.getTargetLang(frame);
        await searchFor({
          node: frame,
          skipInvisibleNode: true,
          cb: async (node) => {
            if (node.type === "TEXT") {
              const text = node.characters;
              if (
                text &&
                !/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-\s]+$/i.test(text)
              ) {
                await translate(node, targetLang, translator, isPaid);
                nTextNode += 1;
              }
            }
          },
        });
      }
      Notification.i(`${nTextNode} texts translated.`);
    } catch (e: any) {
      if (e instanceof InvalidFrameNameException) {
        Notification.e(
          "Please enter the ISO639 code as the first word in the frame name.",
          {
            button: {
              text: "Show ISO639 list",
              action: () => {
                const url = "https://cloud.google.com/translate/docs/languages";
                const openLinkUIString = `<script>window.open('${url}','_blank');</script>`;
                figma.showUI(openLinkUIString, { visible: false });
              },
            },
          }
        );
        figma.viewport.scrollAndZoomIntoView([e.node]);
        return;
      } else {
        Notification.e(e.toString());
      }
    }
  }
};
