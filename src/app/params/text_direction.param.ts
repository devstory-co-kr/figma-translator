import { TextDirection } from "../components/translator_language/translator_language.interface";
import { Param } from "./param";

export class TextDirectionParam implements Param {
  constructor() {}

  public onInput({
    query,
    key,
    result,
  }: ParameterInputEvent<ParameterValues>): void {
    const suggestions = Object.values(TextDirection).map((textDirection) => ({
      name:
        textDirection === TextDirection.LTR ? "Left to Right" : "Right to Left",
      data: textDirection,
    }));
    result.setSuggestions(suggestions);
  }
}
