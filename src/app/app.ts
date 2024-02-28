import {
  ConfigRepository,
  ConfigService,
} from "../components/config/config.interface";
import { ConfigRepositoryImpl } from "../components/config/config.repository";
import { ConfigServiceImpl } from "../components/config/config.service";
import {
  FigmaRepository,
  FigmaService,
} from "../components/figma/figma.interface";
import { FigmaRepositoryImpl } from "../components/figma/figma.repository";
import { FigmaServiceImpl } from "../components/figma/figma.service";
import { PlatformLocaleRepository } from "../components/platform_locale/platform_locale.interface";
import { PlatformLocaleRepositoryImpl } from "../components/platform_locale/platform_locale.repository";
import {
  TemplateRepository,
  TemplateService,
} from "../components/template/template.interface";
import { TemplateRepositoryImpl } from "../components/template/template.repository";
import { TemplateServiceImpl } from "../components/template/template.service";
import {
  TranslatorRepository,
  TranslatorService,
} from "../components/translator/translator.interface";
import { TranslatorRepositoryImpl } from "../components/translator/translator.repository";
import { TranslatorServiceImpl } from "../components/translator/translator.service";
import {
  TranslatorLanguageRepository,
  TranslatorLanguageService,
} from "../components/translator_language/translator_language.interface";
import { TranslatorLanguageRepositoryImpl } from "../components/translator_language/translator_language.repository";
import { TranslatorLanguageServiceImpl } from "../components/translator_language/translator_language.service";
import { App } from "./app.interface";
import { Cmd, Cmds } from "./cmds/cmd";
import { CreateTemplatesCmd } from "./cmds/create_templates.cmd";
import { TranslateCmd } from "./cmds/translate.cmd";
import { Param, Params } from "./params/param";
import { SourceLanguageParam } from "./params/source_language.param";

export class FigmaTranslator implements App {
  /**
   * Config
   */
  private configRepository: ConfigRepository = new ConfigRepositoryImpl();
  private configService: ConfigService = new ConfigServiceImpl(
    this.configRepository
  );

  /**
   * Translator
   */
  private translatorRepository: TranslatorRepository =
    new TranslatorRepositoryImpl();
  private translatorService: TranslatorService = new TranslatorServiceImpl(
    this.translatorRepository
  );

  /**
   * TranslatorLanguage
   */
  private translatorLanguageRepository: TranslatorLanguageRepository =
    new TranslatorLanguageRepositoryImpl();
  private translatorLanguageService: TranslatorLanguageService =
    new TranslatorLanguageServiceImpl(this.translatorLanguageRepository);

  /**
   * PlatformLocale
   */
  private platformLocaleRepository: PlatformLocaleRepository =
    new PlatformLocaleRepositoryImpl(this.translatorLanguageRepository);

  /**
   * Template
   */
  private templateRepository: TemplateRepository = new TemplateRepositoryImpl();
  private templateService: TemplateService = new TemplateServiceImpl(
    this.templateRepository
  );

  /**
   * Figma
   */
  private figmaRepository: FigmaRepository = new FigmaRepositoryImpl();
  private figmaService: FigmaService = new FigmaServiceImpl(
    this.figmaRepository
  );

  /**
   * Params
   */
  public params: Record<Params, Param> = {
    [Params.sourceLanguage]: new SourceLanguageParam(
      this.translatorLanguageService
    ),
  };

  /**
   * Commands
   */
  public cmds: Record<Cmds, Cmd> = {
    [Cmds.translate]: new TranslateCmd(
      this.figmaService,
      this.translatorService,
      this.translatorLanguageService
    ),
    [Cmds.createTemplates]: new CreateTemplatesCmd(
      this.figmaService,
      this.templateService
    ),
  };

  public onMessage(message: any, props: OnMessageProperties): void {
    if (message.type === "onDOMContentLoaded") {
      // figma.ui.postMessage({
      //   type: "init",
      //   data: {
      //     config: config.data,
      //     languages: TranslateLanguageServiceImpl.languages,
      //   },
      // });
      return;
    }

    if (message.type === "onConfigChanged") {
      // config.update(figma, message.data);
      return;
    }

    if (message.type === "onNotify") {
      // if (message.data.error) {
      //   Notification.e(message.data.text);
      // } else {
      //   Notification.i(message.data.text);
      // }
      return;
    }

    // if (message.type === "onTranslateButtonPressed") {
    //   try {
    //     // The first word in the frame name must be the ISO639 code.
    //     const frameList: SceneNode[] = getNodeListByType(
    //       figma.currentPage.selection,
    //       ["FRAME", "INSTANCE"]
    //     );

    //     if (frameList.length === 0) {
    //       Notification.i("Please select the frames you want to translate.");
    //       return;
    //     }

    //     const isPaid: boolean = message.data.type === "paid";
    //     let nTextNode: number = 0;
    //     for (const frame of frameList) {
    //       const targetLang = TranslateLanguageServiceImpl.getTargetLang(frame);
    //       await searchFor({
    //         node: frame,
    //         skipInvisibleNode: true,
    //         cb: async (node) => {
    //           if (node.type === "TEXT") {
    //             const text = node.characters;
    //             if (
    //               text &&
    //               !/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-\s]+$/i.test(text)
    //             ) {
    //               await translate(node, targetLang, translator, isPaid);
    //               nTextNode += 1;
    //             }
    //           }
    //         },
    //       });
    //     }
    //     Notification.i(`${nTextNode} texts translated.`);
    //   } catch (e: any) {
    //     if (e instanceof InvalidFrameNameException) {
    //       Notification.e(
    //         "Please enter the ISO639 code as the first word in the frame name.",
    //         {
    //           button: {
    //             text: "Show ISO639 list",
    //             action: () => {
    //               const url = "https://cloud.google.com/translate/docs/languages";
    //               const openLinkUIString = `<script>window.open('${url}','_blank');</script>`;
    //               figma.showUI(openLinkUIString, { visible: false });
    //             },
    //           },
    //         }
    //       );
    //       figma.viewport.scrollAndZoomIntoView([e.node]);
    //       return;
    //     } else {
    //       Notification.e(e.toString());
    //     }
    //   }
    // }
  }
}
