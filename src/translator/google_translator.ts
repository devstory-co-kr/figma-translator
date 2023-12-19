import { Config } from "../util/config";
import { Translator } from "./translator";

export class GoogleTranslator implements Translator {
  config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  async bulkTranslate(
    query: string[],
    targetLang: string
  ): Promise<string[] | undefined> {
    return await Promise.all(query.map((q) => this.translate(q, targetLang)));
  }

  async translate(query: string, targetLang: string): Promise<string> {
    try {
      const apiKey = this.config.data.googleAPIKey;
      const source = this.config.data.fromLang.q;
      if (!apiKey) {
        throw "Please enter the Google API key";
      }
      const res = await fetch(
        encodeURI(
          `https://translation.googleapis.com/language/translate/v2?key=${apiKey}&q=${query}&target=${targetLang}&source=${source}&alt=json&format=text`
        )
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
}
