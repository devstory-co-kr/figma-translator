import { TranslatorLanguage } from "../translator_language/translator_language.interface";
import { APIKeyReqruiedException } from "./translator.exception";
import { TranslatorRepository } from "./translator.interface";

export class TranslatorRepositoryImpl implements TranslatorRepository {
  public async paidTranslate(
    apiKey: string,
    query: string,
    sourceLang: TranslatorLanguage,
    targetLang: TranslatorLanguage
  ): Promise<string> {
    try {
      if (!apiKey) {
        throw new APIKeyReqruiedException("Google API key required");
      }
      const q = encodeURIComponent(query);
      const sl = sourceLang.locale;
      const tl = targetLang.locale;
      const res = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${apiKey}&q=${q}&target=${tl}&source=${sl}&alt=json&format=text`
      );
      const json: any = await res.json();
      if (res.status === 200) {
        const translatedText = json.data.translations[0].translatedText;
        return translatedText;
      } else {
        throw json.error;
      }
    } catch (e: any) {
      console.error(e.message);
      throw e.message;
    }
  }

  public async freeTranslate(
    query: string,
    sourceLang: TranslatorLanguage,
    targetLang: TranslatorLanguage
  ): Promise<string> {
    try {
      const q = encodeURIComponent(query);
      const sl = sourceLang.locale;
      const tl = targetLang.locale;
      const res = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&dt=bd&dj=1&source=icon&hl=${tl}&q=${q}`
      );
      const json: any = await res.json();
      if (res.status === 200) {
        if ("sentences" in json) {
          let result: string = "";
          for (const sentence of json.sentences) {
            result += sentence.trans;
          }
          return result;
        } else {
          return json.dict[0].terms[0];
        }
      } else {
        throw json.error;
      }
    } catch (e: any) {
      console.error(e.message);
      throw e.message;
    }
  }
}
