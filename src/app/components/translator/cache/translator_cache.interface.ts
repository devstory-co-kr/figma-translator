import { TranslatorCacheKey } from "./translator_cache_key";

export interface TranslatorCacheService {
  set(key: TranslatorCacheKey, text: string): Promise<void>;
  get(key: TranslatorCacheKey): Promise<string | undefined>;
  clear(): Promise<void>;
}

export interface TranslatorCacheRepository {
  set(key: TranslatorCacheKey, text: string): Promise<void>;
  get(key: TranslatorCacheKey): Promise<string | undefined>;
  clear(): Promise<void>;
}
