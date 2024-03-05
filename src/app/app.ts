import { App } from "./app.interface";
import { Cmd, Cmds } from "./cmds/cmd";
import { CreateTemplatesCmd } from "./cmds/create_templates.cmd";
import { TranslateCmd } from "./cmds/translate.cmd";
import {
  ConfigRepository,
  ConfigService,
} from "./components/config/config.interface";
import { ConfigRepositoryImpl } from "./components/config/config.repository";
import { ConfigServiceImpl } from "./components/config/config.service";
import {
  FigmaRepository,
  FigmaService,
} from "./components/figma/figma.interface";
import { FigmaRepositoryImpl } from "./components/figma/figma.repository";
import { FigmaServiceImpl } from "./components/figma/figma.service";
import {
  PlatformRepository,
  PlatformService,
} from "./components/platform/platform.interface";
import { PlatformRepositoryImpl } from "./components/platform/platform.repository";
import { PlatformServiceImpl } from "./components/platform/platform.service";
import {
  TemplateRepository,
  TemplateService,
} from "./components/template/template.interface";
import { TemplateRepositoryImpl } from "./components/template/template.repository";
import { TemplateServiceImpl } from "./components/template/template.service";
import {
  TranslatorRepository,
  TranslatorService,
} from "./components/translator/translator.interface";
import { TranslatorRepositoryImpl } from "./components/translator/translator.repository";
import { TranslatorServiceImpl } from "./components/translator/translator.service";
import {
  TranslatorLanguageRepository,
  TranslatorLanguageService,
} from "./components/translator_language/translator_language.interface";
import { TranslatorLanguageRepositoryImpl } from "./components/translator_language/translator_language.repository";
import { TranslatorLanguageServiceImpl } from "./components/translator_language/translator_language.service";
import { Param, Params } from "./params/param";
import { PlatformParam } from "./params/platform.param";
import { SourceLanguageParam } from "./params/source_language.param";
import { TemplateScaleParam } from "./params/template_scale.param";
import { TextDirectionParam } from "./params/text_direction.param";

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
   * Platform
   */
  private platformRepository: PlatformRepository = new PlatformRepositoryImpl(
    this.translatorLanguageRepository
  );
  private platformService: PlatformService = new PlatformServiceImpl(
    this.platformRepository
  );

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
    [Params.platform]: new PlatformParam(),
    [Params.sourceLanguage]: new SourceLanguageParam(
      this.translatorLanguageService
    ),
    [Params.textDirection]: new TextDirectionParam(),
    [Params.templateScale]: new TemplateScaleParam(),
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
      this.templateService,
      this.platformService
    ),
  };
}
