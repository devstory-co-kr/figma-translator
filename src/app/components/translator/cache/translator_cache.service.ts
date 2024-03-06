import {
  TranslatorCacheRepository,
  TranslatorCacheService,
} from "./translator_cache.interface";
import { TranslatorCacheKey } from "./translator_cache_key";

export class TranslatorCacheServiceImpl implements TranslatorCacheService {
  constructor(private translatorCacheRepository: TranslatorCacheRepository) {}

  public clear(): Promise<void> {
    return this.translatorCacheRepository.clear();
  }

  public set(key: TranslatorCacheKey, text: string): Promise<void> {
    return this.translatorCacheRepository.set(key, text);
  }

  public get(key: TranslatorCacheKey): Promise<string | undefined> {
    return this.translatorCacheRepository.get(key);
  }
}
