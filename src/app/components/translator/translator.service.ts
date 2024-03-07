import { TranslatorLanguage } from "../translator_language/translator_language.interface";
import { TranslatorCacheService } from "./cache/translator_cache.interface";
import { TranslatorCacheKey } from "./cache/translator_cache_key";
import {
  TranslatorRepository,
  TranslatorService,
} from "./translator.interface";

export class TranslatorServiceImpl implements TranslatorService {
  constructor(
    private translatorRepository: TranslatorRepository,
    private translatorCacheService: TranslatorCacheService
  ) {}

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
      query.map(async (q) => {
        if (!q.trim()) {
          return q;
        }
        const cacheKey = new TranslatorCacheKey({
          sourceText: q,
          sourceLanguage: sourceLang,
          targetLanguage: targetLang,
        });

        // Check cache
        const cachedText = await this.translatorCacheService.get(cacheKey);
        if (cachedText) {
          return cachedText;
        }

        // Translate
        const translatedText = await this.translatorRepository.freeTranslate(
          q,
          sourceLang,
          targetLang
        );

        // Save cache
        await this.translatorCacheService.set(cacheKey, translatedText);
        return translatedText;
      })
    );
  }
}
