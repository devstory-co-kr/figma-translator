import { Platform } from "../template/template.interface";
import { TranslatorLanguage } from "../translator_language/translator_language.interface";

export interface PlatformLocale {
  name: string;
  locale: string;
  translatorLanguage: TranslatorLanguage;
}

export interface PlatformLocaleService {
  getLocale(platform: Platform): PlatformLocale[];
}

export interface PlatformLocaleRepository {
  locales: {
    [platform in Platform]: PlatformLocale[];
  };
}
