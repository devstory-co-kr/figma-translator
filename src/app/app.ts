import { App } from "./app.interface";
import { Cmd, Cmds } from "./cmds/cmd";
import { CreateTemplatesCmd } from "./cmds/create_templates/create_templates.cmd";
import { DeleteTranslationCacheCmd } from "./cmds/delete_translation_cache.cmd";
import { TranslateCmd } from "./cmds/translate/translate.cmd";
import { ConfigRepositoryImpl } from "./components/config/config.repository";
import { ConfigServiceImpl } from "./components/config/config.service";
import { FigmaRepositoryImpl } from "./components/figma/figma.repository";
import { FigmaServiceImpl } from "./components/figma/figma.service";
import { PlatformRepositoryImpl } from "./components/platform/platform.repository";
import { PlatformServiceImpl } from "./components/platform/platform.service";
import { TemplateRepositoryImpl } from "./components/template/template.repository";
import { TemplateServiceImpl } from "./components/template/template.service";
import { TranslatorCacheRepositoryImpl } from "./components/translator/cache/translator_cache.repository";
import { TranslatorCacheServiceImpl } from "./components/translator/cache/translator_cache.service";
import { TranslatorRepositoryImpl } from "./components/translator/translator.repository";
import { TranslatorServiceImpl } from "./components/translator/translator.service";
import { TranslatorLanguageRepositoryImpl } from "./components/translator_language/translator_language.repository";
import { TranslatorLanguageServiceImpl } from "./components/translator_language/translator_language.service";
import { AutoSizeParam } from "./params/auto_size.param";
import { Param, Params } from "./params/param";
import { PlatformParam } from "./params/platform.param";
import { SourceLanguageParam } from "./params/source_language.param";
import { TemplateScaleParam } from "./params/template_scale.param";
import { TextDirectionParam } from "./params/text_direction.param";

export class FigmaTranslator implements App {
  /**
   * Repository
   */
  private configRepository = new ConfigRepositoryImpl();
  private translatorCacheRepository = new TranslatorCacheRepositoryImpl();
  private translatorRepository = new TranslatorRepositoryImpl();
  private translatorLanguageRepository = new TranslatorLanguageRepositoryImpl();
  private platformRepository = new PlatformRepositoryImpl(
    this.translatorLanguageRepository
  );
  private templateRepository = new TemplateRepositoryImpl();
  private figmaRepository = new FigmaRepositoryImpl();

  /**
   * Service
   */
  private configService = new ConfigServiceImpl(this.configRepository);
  private translatorCacheService = new TranslatorCacheServiceImpl(
    this.translatorCacheRepository
  );
  private translatorService = new TranslatorServiceImpl(
    this.translatorRepository,
    this.translatorCacheService
  );
  private platformService = new PlatformServiceImpl(this.platformRepository);
  private translatorLanguageService = new TranslatorLanguageServiceImpl(
    this.platformService,
    this.translatorLanguageRepository
  );
  private templateService = new TemplateServiceImpl(this.templateRepository);
  private figmaService = new FigmaServiceImpl(this.figmaRepository);

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
    [Params.autoSize]: new AutoSizeParam(),
  };

  /**
   * Commands
   */
  public cmds: Record<Cmds, Cmd> = {
    [Cmds.translate]: new TranslateCmd(
      this.figmaService,
      this.configService,
      this.translatorService,
      this.translatorLanguageService
    ),
    [Cmds.createTemplates]: new CreateTemplatesCmd(
      this.figmaService,
      this.configService,
      this.platformService,
      this.templateService
    ),
    [Cmds.deleteTranslationCache]: new DeleteTranslationCacheCmd(
      this.translatorCacheService
    ),
  };
}
