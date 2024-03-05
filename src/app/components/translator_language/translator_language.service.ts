import { PlatformService } from "../platform/platform.interface";
import { TranslatorLanguageNotFoundException } from "./translator_language.exception";
import {
  TranslatorLanguage,
  TranslatorLanguageRepository,
  TranslatorLanguageService,
} from "./translator_language.interface";

export class TranslatorLanguageServiceImpl
  implements TranslatorLanguageService
{
  private localeToTranslatorLanguage: {
    [locale: string]: TranslatorLanguage;
  } = {};

  constructor(
    private platformService: PlatformService,
    private translateLanguageRepository: TranslatorLanguageRepository
  ) {
    // Add GoogleTranslateLocale
    for (const language of this.supportLanguages) {
      const locale = language.locale.toLowerCase();
      this.localeToTranslatorLanguage[locale] = language;
    }

    // Add PlatformLocale
    for (const platformLocale of Object.values(
      this.platformService.getAllLocales()
    ).flat()) {
      const locale = platformLocale.locale.toLowerCase();
      if (this.localeToTranslatorLanguage[locale]) {
        continue;
      }
      this.localeToTranslatorLanguage[locale] =
        platformLocale.translatorLanguage;
    }
  }

  public supportLanguages: TranslatorLanguage[] =
    this.translateLanguageRepository.supportLanguages;

  public getLanguageFromLocale(localeStr: string): TranslatorLanguage {
    for (const l of localeStr.split("/")) {
      const locale = l.toLowerCase();
      const translatorLanguage = this.localeToTranslatorLanguage[locale];
      if (translatorLanguage) {
        return translatorLanguage;
      }
    }

    throw new TranslatorLanguageNotFoundException(
      `There is no TranslatorLanguage that matches ${localeStr}.`
    );
  }
}
