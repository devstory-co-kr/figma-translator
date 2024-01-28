import { Config } from "../util/config";
import { Translator } from "./translator";

export class GoogleTranslator implements Translator {
  config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  public async bulkTranslate(
    query: string[],
    targetLang: string,
    isPaid: boolean
  ): Promise<string[] | undefined> {
    return await Promise.all(
      query.map((q) =>
        isPaid
          ? this.paidTranslate(q, targetLang)
          : this.freeTranslate(q, targetLang)
      )
    );
  }

  public translate(
    query: string,
    targetLang: string,
    isPaid: boolean
  ): Promise<string> {
    return isPaid
      ? this.paidTranslate(query, targetLang)
      : this.freeTranslate(query, targetLang);
  }

  private async paidTranslate(
    query: string,
    targetLang: string
  ): Promise<string> {
    try {
      const apiKey = this.config.data.googleAPIKey;
      const source = this.config.data.fromLang.q;
      if (!apiKey) {
        throw "Please enter the Google API key";
      }
      const q = encodeURIComponent(query);
      const res = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${apiKey}&q=${q}&target=${targetLang}&source=${source}&alt=json&format=text`
      );
      const json: any = await res.json();
      if (res.status === 200) {
        const translatedText = json.data.translations[0].translatedText;
        // console.log(`${query} -> ${translatedText}`);
        return translatedText;
      } else {
        throw json.error;
      }
    } catch (e: any) {
      console.error(e.message);
      throw e.message;
    }
  }

  private async freeTranslate(
    query: string,
    targetLang: string
  ): Promise<string> {
    try {
      const source = this.config.data.fromLang.q;
      const q = encodeURIComponent(query);
      const res = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${targetLang}&dt=t&dt=bd&dj=1&source=icon&hl=${targetLang}&q=${q}`
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
