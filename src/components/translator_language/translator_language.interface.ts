export type GoogleTranslateLocale = string;

export interface TranslatorLanguage {
  locale: GoogleTranslateLocale;
  name: string;

  toString(): string;
  // static fromString(value: string): TranslateLanguageImpl {
  //   const match = value.match(/(.*?) \((.*?)\)/);
  //   if (!match) {
  //     throw new InvalidArgument(`Cannot convert ${value} to TranslateLanguage`);
  //   }
  //   const name = match[1];
  //   const q = match[2];
  //   return new TranslateLanguageImpl(q, name);
  // }
}

export interface TranslatorLanguageService {
  supportLanguages: TranslatorLanguage[];
  getLanguageFromLocale(locale: string): TranslatorLanguage;
}

export interface TranslatorLanguageRepository {
  supportLanguages: TranslatorLanguage[];
}
