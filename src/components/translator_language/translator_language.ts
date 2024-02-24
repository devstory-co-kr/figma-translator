import {
  GoogleTranslateLanguageCode,
  TranslatorLanguage,
} from "./translator_language.interface";

export class TranslatorLanguageImpl implements TranslatorLanguage {
  public q: GoogleTranslateLanguageCode;
  public name: string;

  constructor({ q, name }: { q: GoogleTranslateLanguageCode; name: string }) {
    this.q = q;
    this.name = name;
  }

  public toString(): string {
    return `${this.name} (${this.q})`;
  }
}
