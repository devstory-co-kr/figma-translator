import { TranslatorLanguage } from "../translator_language/translator_language.interface";

export interface TranslatorService {
  freeTranslate(
    query: string[],
    exclusionKeywords: string[],
    sourceLang: TranslatorLanguage,
    targetLang: TranslatorLanguage
  ): Promise<string[] | undefined>;

  paidTranslate(
    apiKey: string,
    query: string[],
    sourceLang: TranslatorLanguage,
    targetLang: TranslatorLanguage
  ): Promise<string[] | undefined>;
}

export interface TranslatorRepository {
  freeTranslate(
    query: string,
    sourceLang: TranslatorLanguage,
    targetLang: TranslatorLanguage
  ): Promise<string>;

  paidTranslate(
    apiKey: string,
    query: string,
    sourceLang: TranslatorLanguage,
    targetLang: TranslatorLanguage
  ): Promise<string>;
}
