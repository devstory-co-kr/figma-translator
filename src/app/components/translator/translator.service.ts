import * as he from "he";
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

        // Check cache
        const cachedText = await this.translatorCacheService.get(cacheKey);
        if (cachedText) {
          return cachedText;
        }

        // Translate
        const encodeResult = this.encodeText(q, exclusionKeywords);
        const translatedText = await this.translatorRepository.freeTranslate(
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

  private paramReplaceKeys: string[] = [
    "😀",
    "😃",
    "😄",
    "😁",
    "🥹",
    "😅",
    "😂",
    "🤣",
    "🥲",
    "😊",
  ];

  private encodeText(text: string, exclusionKeywords: string[]): EncodeResult {
    let count = 0;
    const parmKeywordDict: Record<string, string> = {};
    const keywordParmDict: Record<string, string> = {};
    const encodedText = text.replace(/\b(\w+)\b/g, (match, keyword) => {
      if (exclusionKeywords.includes(keyword.toLowerCase())) {
        let paramReplaceKey: string;
        if (keywordParmDict[keyword]) {
          paramReplaceKey = keywordParmDict[keyword];
        } else if (count >= this.paramReplaceKeys.length) {
          const share = Math.floor(count / this.paramReplaceKeys.length);
          const remainder = count % this.paramReplaceKeys.length;
          paramReplaceKey =
            this.paramReplaceKeys[share] + this.paramReplaceKeys[remainder];
          keywordParmDict[keyword] = paramReplaceKey;
          count++;
        } else {
          paramReplaceKey = this.paramReplaceKeys[count];
          keywordParmDict[keyword] = paramReplaceKey;
          count++;
        }
        parmKeywordDict[paramReplaceKey] = keyword;
        return paramReplaceKey;
      } else {
        return match;
      }
    });
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
