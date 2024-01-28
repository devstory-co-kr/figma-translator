import { GoogleTranslator as GoogleTranslate } from "./translator/google_translator";
import { Translator } from "./translator/translator";
import { Config } from "./util/config";
import { InvalidFrameNameException as FrameNameShouldStartWithISO639Exception } from "./util/exceptions";
import { Language } from "./util/language";
import { getNodeListByType, searchFor, translate } from "./util/node_util";
import { Notification } from "./util/notification";

const name = "google-translator";
const config = new Config(name, figma);
const translator: Translator = new GoogleTranslate(config);

figma.showUI(__html__, { width: 300, height: 200 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === "onDOMContentLoaded") {
    figma.ui.postMessage({
      type: "init",
      data: {
        config: config.data,
        languages: Language.languages,
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
      // The first word in the frame name must be the iso639 code.
      const frameList: SceneNode[] = getNodeListByType(
        figma.currentPage.selection,
        "FRAME"
      );

      if (frameList.length === 0) {
        Notification.i("Please select the frames you want to translate.");
        return;
      }

      const isPaid: boolean = msg.data.type === "paid";
      let nTextNode: number = 0;
      for (const frame of frameList) {
        const targetLang = Language.getTargetLang(frame);
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
      if (e instanceof FrameNameShouldStartWithISO639Exception) {
        Notification.e(
          "Please enter the iSO639 code as the first word in the frame name.",
          {
            button: {
              text: "Show iSO639 list",
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
