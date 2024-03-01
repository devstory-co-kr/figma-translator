import { TranslatorLanguageNotFoundException } from "./translator_language.exception";
import {
  TranslatorLanguage,
  TranslatorLanguageRepository,
  TranslatorLanguageService,
} from "./translator_language.interface";

export class TranslatorLanguageServiceImpl
  implements TranslatorLanguageService
{
  constructor(
    private translateLanguageRepository: TranslatorLanguageRepository
  ) {}

  public supportLanguages: TranslatorLanguage[] =
    this.translateLanguageRepository.supportLanguages;

  public getLanguageFromLocale(locale: string): TranslatorLanguage {
    const targetLang = this.supportLanguages.find(
      (l) => l.locale.toLowerCase() === locale.toLowerCase()
    );
    if (!targetLang) {
      throw new TranslatorLanguageNotFoundException(
        `There is no TranslatorLanguage that matches ${locale}.`
      );
    } else {
      return targetLang;
    }
  }
}
