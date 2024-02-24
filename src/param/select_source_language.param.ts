import { TranslateLanguageServiceImpl } from "../components/translator_language/translate_language.service";
import { Strings } from "../util/strings";
import { Param } from "./param";

export class SelectSourceLanguageParam implements Param {
  onInput({ query, key, result }: ParameterInputEvent<ParameterValues>): void {
    const suggestions = TranslateLanguageServiceImpl.getLanguageStrings()
      .map((s) => ({
        languageStrings: s,
        score: Strings.search(s, query),
      }))
      .filter((e) => e.score >= 0)
      .sort((a, b) => a.score - b.score)
      .map((e) => e.languageStrings);
    result.setSuggestions(suggestions);
  }
}
