import {
  GoogleTranslateLocale,
  TranslatorLanguage,
} from "./translator_language.interface";

export class TranslatorLanguageEntity implements TranslatorLanguage {
  public locale: GoogleTranslateLocale;
  public name: string;

  constructor({
    locale,
    name,
  }: {
    locale: GoogleTranslateLocale;
    name: string;
  }) {
    this.locale = locale;
    this.name = name;
  }

  public toString(): string {
    return `${this.name} (${this.locale})`;
  }
}
