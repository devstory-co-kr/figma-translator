import {
  GoogleTranslateLocale,
  TextDirection,
  TranslatorLanguage,
} from "./translator_language.interface";

export class TranslatorLanguageEntity implements TranslatorLanguage {
  public textDirection: TextDirection;
  public locale: GoogleTranslateLocale;
  public name: string;

  constructor({
    textDirection,
    locale,
    name,
  }: {
    textDirection: TextDirection;
    locale: GoogleTranslateLocale;
    name: string;
  }) {
    this.textDirection = textDirection;
    this.locale = locale;
    this.name = name;
  }

  public toString(): string {
    return `${this.name} (${this.locale})`;
  }
}
