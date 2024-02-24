import { Config } from "../../util/config";

export interface Translator {
  config: Config;

  bulkTranslate(
    query: string[],
    targetLang: string,
    isPaid: boolean
  ): Promise<string[] | undefined>;

  translate(
    query: string,
    targetLang: string,
    isPaid: boolean
  ): Promise<string>;
}
