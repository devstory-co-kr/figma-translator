import { TranslatorCacheRepository } from "./translator_cache.interface";
import { TranslatorCacheKey } from "./translator_cache_key";

export class TranslatorCacheRepositoryImpl
  implements TranslatorCacheRepository
{
  public async clear(): Promise<number> {
    const keys = await figma.clientStorage.keysAsync();
    await Promise.all(
      keys
        .filter((key) => {
          // Delete TranslatorCacheKey.hash format data only
          return /.*_.*_.*/.test(key);
        })
        .map((key) => {
          return figma.clientStorage.deleteAsync(key);
        })
    );
    return keys.length;
  }

  public async set(key: TranslatorCacheKey, text: string): Promise<void> {
    return await figma.clientStorage.setAsync(`${key.hash}`, text);
  }

  public async get(key: TranslatorCacheKey): Promise<string | undefined> {
    return figma.clientStorage.getAsync(key.hash);
  }
}
