import * as he from "he";
import Constants from "../../../util/constants";
import { TranslatorLanguage } from "../translator_language/translator_language.interface";
import { TranslatorCacheService } from "./cache/translator_cache.interface";
import { TranslatorCacheKey } from "./cache/translator_cache_key";
import {
  TranslatorRepository,
  TranslatorService,
} from "./translator.interface";

interface EncodeResult {
  dictionary: Record<string, string>;
  encodedText: string;
}

export class TranslatorServiceImpl implements TranslatorService {
  constructor(
    private translatorRepository: TranslatorRepository,
    private translatorCacheService: TranslatorCacheService
  ) {}

  public async freeTranslate(
    query: string[],
    useCache: boolean,
    exclusionKeywords: string[],
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

        if (useCache) {
          // Check cache
          const cachedText = await this.translatorCacheService.get(cacheKey);
          if (cachedText) {
            return cachedText;
          }
        }

        // Translate
        const encodeResult = this.encodeText(q, exclusionKeywords);
        const isOnlyEncodedText = Object.keys(encodeResult.dictionary).includes(
          encodeResult.encodedText
        );
        const translatedText = isOnlyEncodedText
          ? encodeResult.encodedText
          : await this.translatorRepository.freeTranslate(
              encodeResult.encodedText,
              sourceLang,
              targetLang
            );
        const decodedText = this.decodeText(
          encodeResult.dictionary,
          translatedText
        );

        // Save cache
        await this.translatorCacheService.set(cacheKey, decodedText);
        return decodedText;
      })
    );
  }

  private encodeText(text: string, exclusionKeywords: string[]): EncodeResult {
    let count = 0;
    const parmKeywordDict: Record<string, string> = {};
    const keywordParmDict: Record<string, string> = {};
    const encodedText = text
      .split(" ")
      .map((keyword) => {
        if (exclusionKeywords.includes(keyword.toLowerCase())) {
          let paramReplaceKey: string;
          if (keywordParmDict[keyword]) {
            paramReplaceKey = keywordParmDict[keyword];
          } else if (count >= Constants.paramReplaceKeys.length) {
            const share = Math.floor(count / Constants.paramReplaceKeys.length);
            const remainder = count % Constants.paramReplaceKeys.length;
            paramReplaceKey =
              Constants.paramReplaceKeys[share] +
              Constants.paramReplaceKeys[remainder];
            keywordParmDict[keyword] = paramReplaceKey;
            count++;
          } else {
            paramReplaceKey = Constants.paramReplaceKeys[count];
            keywordParmDict[keyword] = paramReplaceKey;
            count++;
          }
          parmKeywordDict[paramReplaceKey] = keyword;
          return paramReplaceKey;
        } else {
          return keyword;
        }
      })
      .join(" ");
    return {
      dictionary: parmKeywordDict,
      encodedText,
    };
  }

  private decodeText(dictionary: Record<string, string>, text: string): string {
    const keys = Object.keys(dictionary).sort((a, b) => b.length - a.length);
    for (const key of keys) {
      text = text.replace(new RegExp(key, "g"), dictionary[key]);
    }

    // decode html entity (e.g. &#39; -> ' / &gt; -> >)
    text = he.decode(text);
    return text;
  }
}
