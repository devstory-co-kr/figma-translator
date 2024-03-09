import { InvalidFrameNameException } from "../../../util/exceptions";
import { Notification } from "../../../util/notification";
import { ConfigService } from "../../components/config/config.interface";
import {
  FigmaService,
  FontReplacement,
} from "../../components/figma/figma.interface";
import { TranslatorService } from "../../components/translator/translator.interface";
import {
  TranslatorLanguage,
  TranslatorLanguageService,
} from "../../components/translator_language/translator_language.interface";
import { Cmd } from "../cmd";
import { TranslateState } from "./translate.state";

enum MsgType {
  init = "init",
  translate = "translate",
  translateStateChanged = "translateStateChanged",
}

export class TranslateCmd implements Cmd {
  constructor(
    private figmaService: FigmaService,
    private configService: ConfigService,
    private translatorService: TranslatorService,
    private translatorLanguageService: TranslatorLanguageService
  ) {}

  availableFonts: Font[] = [];
  sourceLanguage?: TranslatorLanguage;

  fontName = {
    NotoSansMyanmar: "Noto Sans Myanmar",
    NotoSansArmenian: "Noto Sans Armenian",
    NotoSansEthiopic: "Noto Sans Ethiopic",
    NotoSansGeorgian: "Noto Sans Georgian",
    NotoSansKhmer: "Noto Sans Khmer",
    NotoSansLao: "Noto Sans Lao",
    NotoSansGurmukhi: "Noto Sans Gurmukhi",
    NotoSansSinhala: "Noto Sans Sinhala",
    NotoSansDevanagari: "Noto Sans Devanagari",
  };

  languageName = {
    Myanmar: "Myanmar",
    Amharic: "Amharic",
    Armenian: "Armenian",
    Georgian: "Georgian",
    Khmer: "Khmer",
    Lao: "Lao",
    Punjabi: "Punjabi",
    Sinhala: "Sinhala",
    Marathi: "Marathi",
    Hindi: "Hindi",
    Nepali: "Nepali",
  };

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
    switch (<MsgType>message.type) {
      case MsgType.init:
        await this.onInit();
        break;
      case MsgType.translateStateChanged:
        this.onTranslateStateChanged(message.data as TranslateState);
        break;
      case MsgType.translate:
        this.onTranslate(message.data as TranslateState);
        break;
    }
  }

  private async onInit() {
    // Load previous translate state
    let translateState = await this.configService.getTranslateState();
    const availableFonts = this.availableFonts;
    const supportLanguages = this.translatorLanguageService.supportLanguages;

    if (!translateState) {
      // LanguageMap
      const languageMap: { [languageName: string]: TranslatorLanguage } = {};
      for (const language of supportLanguages) {
        languageMap[language.name] = language;
      }

      // FontMap
      const fontMap: { [family: string]: FontName } = {};
      for (const font of availableFonts) {
        fontMap[font.fontName.family] = font.fontName;
      }

      // Create default state
      translateState = <TranslateState>{
        autoSize: true,
        sourceLanguage: this.sourceLanguage,
        fontReplacementState: [
          {
            language: languageMap[this.languageName.Myanmar],
            fontName: this.fontName.NotoSansMyanmar,
            font: fontMap[this.fontName.NotoSansMyanmar],
          },
          {
            language: languageMap[this.languageName.Amharic],
            fontName: this.fontName.NotoSansEthiopic,
            font: fontMap[this.fontName.NotoSansEthiopic],
          },
          {
            language: languageMap[this.languageName.Armenian],
            fontName: this.fontName.NotoSansArmenian,
            font: fontMap[this.fontName.NotoSansArmenian],
          },
          {
            language: languageMap[this.languageName.Georgian],
            fontName: this.fontName.NotoSansGeorgian,
            font: fontMap[this.fontName.NotoSansGeorgian],
          },
          {
            language: languageMap[this.languageName.Khmer],
            fontName: this.fontName.NotoSansKhmer,
            font: fontMap[this.fontName.NotoSansKhmer],
          },
          {
            language: languageMap[this.languageName.Lao],
            fontName: this.fontName.NotoSansLao,
            font: fontMap[this.fontName.NotoSansLao],
          },
          {
            language: languageMap[this.languageName.Punjabi],
            fontName: this.fontName.NotoSansGurmukhi,
            font: fontMap[this.fontName.NotoSansGurmukhi],
          },
          {
            language: languageMap[this.languageName.Sinhala],
            fontName: this.fontName.NotoSansSinhala,
            font: fontMap[this.fontName.NotoSansSinhala],
          },
          {
            language: languageMap[this.languageName.Marathi],
            fontName: this.fontName.NotoSansDevanagari,
            font: fontMap[this.fontName.NotoSansDevanagari],
          },
          {
            language: languageMap[this.languageName.Hindi],
            fontName: this.fontName.NotoSansDevanagari,
            font: fontMap[this.fontName.NotoSansDevanagari],
          },
          {
            language: languageMap[this.languageName.Nepali],
            fontName: this.fontName.NotoSansDevanagari,
            font: fontMap[this.fontName.NotoSansDevanagari],
          },
        ].map((item) => ({
          ...item,
          isChecked: item.font ? true : false,
          isVisible: true,
        })),
      };
    }

    figma.ui.postMessage({
      type: MsgType.init,
      data: {
        ...translateState,
        availableFonts,
        supportLanguages,
      },
    });
  }

  private onTranslateStateChanged(translateState: TranslateState): void {
    this.configService.setTranslateState(translateState);
  }

  private async onTranslate(translateState: TranslateState) {
    const { sourceLanguage, autoSize, fontReplacementState } = translateState;
    const fontReplacement: FontReplacement = {};
    for (const { isChecked, language, font } of fontReplacementState) {
      if (!isChecked) continue;
      fontReplacement[language.locale] = this.availableFonts
        .filter((availableFont) => {
          return availableFont.fontName.family === font.family;
        })
        .map((availableFont) => availableFont.fontName);
    }

    // Translate
    await this.translate(sourceLanguage, autoSize, fontReplacement);
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
