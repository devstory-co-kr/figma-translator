import { Strings } from "../../util/strings";
import { TranslatorLanguageService } from "../components/translator_language/translator_language.interface";
import { Param } from "./param";

export class SourceLanguageParam implements Param {
  constructor(private translatorLanguageService: TranslatorLanguageService) {}

  public onInput({
    query,
    key,
    result,
  }: ParameterInputEvent<ParameterValues>): void {
    const suggestions = this.translatorLanguageService.supportLanguages
      .map((language) => {
        const name = language.toString();
        return {
          name,
          language,
          score: Strings.search(name, query),
        };
      })
      .filter((e) => e.score >= 0)
      .sort((a, b) => a.score - b.score)
      .map((e) => ({
        name: e.name,
        data: e.language,
      }));
    result.setSuggestions(suggestions);
  }
}
