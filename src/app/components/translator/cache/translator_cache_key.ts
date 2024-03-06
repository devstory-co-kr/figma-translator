import { TranslatorLanguage } from "../../translator_language/translator_language.interface";

export class TranslatorCacheKey {
  public hash: string;

  constructor({
    sourceText,
    sourceLanguage,
    targetLanguage,
  }: {
    sourceText: string;
    sourceLanguage: TranslatorLanguage;
    targetLanguage: TranslatorLanguage;
  }) {
    this.hash = `${sourceLanguage.locale}_${targetLanguage.locale}_${sourceText}`;
  }
}
