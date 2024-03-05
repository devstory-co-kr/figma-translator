import { Platform } from "../../params/platform.param";
import { TranslatorLanguage } from "../translator_language/translator_language.interface";

export interface PlatformLocale {
  name: string;
  locale: string;
  translatorLanguage: TranslatorLanguage;
}

export interface PlatformService {
  getLocale(platform: Platform): PlatformLocale[];
}

export interface PlatformRepository {
  locales: {
    [platform in Platform]: PlatformLocale[];
  };
}
