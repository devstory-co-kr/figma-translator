import { TranslatorLanguage } from "../translator_language/translator_language.interface";
import {
  TranslatorRepository,
  TranslatorService,
} from "./translator.interface";

export class TranslatorServiceImpl implements TranslatorService {
  constructor(private translatorRepository: TranslatorRepository) {}

  public async paidTranslate(
    apiKey: string,
    query: string[],
    sourceLang: TranslatorLanguage,
    targetLang: TranslatorLanguage
  ): Promise<string[] | undefined> {
    return await Promise.all(
      query.map((q) =>
        this.translatorRepository.paidTranslate(
          apiKey,
          q,
          sourceLang,
          targetLang
        )
      )
    );
  }

  public async freeTranslate(
    query: string[],
    sourceLang: TranslatorLanguage,
    targetLang: TranslatorLanguage
  ): Promise<string[] | undefined> {
    return await Promise.all(
      query.map((q) =>
        this.translatorRepository.freeTranslate(q, sourceLang, targetLang)
      )
    );
  }
}
