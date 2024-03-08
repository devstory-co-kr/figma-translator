import { InvalidFrameNameException } from "../../util/exceptions";
import { Notification } from "../../util/notification";
import {
  FigmaService,
  FontReplacement,
} from "../components/figma/figma.interface";
import { TranslatorService } from "../components/translator/translator.interface";
import {
  TranslatorLanguage,
  TranslatorLanguageService,
} from "../components/translator_language/translator_language.interface";
import { Cmd } from "./cmd";

enum MsgType {
  init = "init",
  translate = "translate",
}

export class TranslateCmd implements Cmd {
  constructor(
    private figmaService: FigmaService,
    private translatorService: TranslatorService,
    private translatorLanguageService: TranslatorLanguageService
  ) {}

  availableFonts?: Font[];
  sourceLanguage?: TranslatorLanguage;

  public async onRun({
    sourceLanguage,
  }: {
    sourceLanguage: TranslatorLanguage;
  }): Promise<void> {
    this.sourceLanguage = sourceLanguage;
    this.availableFonts = await figma.listAvailableFontsAsync();
    figma.showUI(__uiFiles__.translate, {
      width: 300,
      height: 400,
      title: `Translate`,
    });
  }

  public async onMessage(
    message: any,
    props: OnMessageProperties
  ): Promise<void> {
    if (!this.sourceLanguage || !this.availableFonts) {
      return;
    }

    switch (<MsgType>message.type) {
      // Init
      case MsgType.init:
        figma.ui.postMessage({
          type: MsgType.init,
          data: {
            autoSize: true,
            availableFonts: this.availableFonts,
            sourceLanguage: this.sourceLanguage,
            supportLanguages: this.translatorLanguageService.supportLanguages,
          },
        });
        break;
      case MsgType.translate:
        const { sourceLanguage, autoSize, fontReplacementState } = message.data;
        const fontReplacement: FontReplacement = {};
        for (const { isChecked, language, font } of fontReplacementState) {
          if (!isChecked) continue;
          fontReplacement[language.locale] = this.availableFonts
            .filter((availableFont) => {
              return availableFont.fontName.family === font.family;
            })
            .map((availableFont) => availableFont.fontName);
        }
        await this.translate(sourceLanguage, autoSize, fontReplacement);
        break;
    }
  }

  private async translate(
    sourceLanguage: TranslatorLanguage,
    autoSize: boolean,
    fontReplacement: FontReplacement
  ): Promise<void> {
    try {
      // The first word in the frame name must be the ISO639 code.
      const frameList: SceneNode[] = this.figmaService.getNodesByType(
        figma.currentPage.selection,
        ["FRAME", "INSTANCE"]
      );

      if (frameList.length === 0) {
        Notification.i("Please select the frames you want to translate.");
        return;
      }

      let nFrame = 0;
      let nTextNode: number = 0;
      for (const frame of frameList) {
        const targetLanguage =
          this.translatorLanguageService.getLanguageFromLocale(frame.name);
        const fonts = fontReplacement[targetLanguage.locale];

        await this.figmaService.search({
          node: frame,
          skipInvisibleNode: true,
          cb: async (node) => {
            if (node.type === "TEXT") {
              const text = node.characters;
              if (
                text &&
                !/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-\s]+$/i.test(text)
              ) {
                // Replace text
                await this.figmaService.replaceText({
                  node,
                  autoSize,
                  fonts,
                  cb: async (textList) => {
                    // Translate
                    return (
                      (await this.translatorService.freeTranslate(
                        textList,
                        sourceLanguage,
                        targetLanguage
                      )) ?? []
                    );
                  },
                });
                nTextNode += 1;
              }
            }
          },
        });
        nFrame += 1;
        Notification.i(`${nFrame}/${frameList.length} Translating...`);
      }

      Notification.i(
        `${frameList.length} frames & ${nTextNode} texts translated.`
      );
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
