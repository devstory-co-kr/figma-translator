import { Translator } from "../components/translator/translator";
import { TranslateLanguageServiceImpl } from "../components/translator_language/translate_language.service";
import { InvalidFrameNameException } from "../util/exceptions";
import { getNodeListByType, searchFor, translate } from "../util/node_util";
import { Notification } from "../util/notification";
import { Cmd } from "./cmd";

export class TranslateCmd implements Cmd {
  constructor(private translator: Translator) {}

  async onRun({ command, parameters }: RunEvent): Promise<void> {
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
                await translate(node, targetLang, this.translator, false);
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
}
