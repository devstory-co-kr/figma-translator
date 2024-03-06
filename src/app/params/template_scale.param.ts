import { Param } from "./param";

export enum TemplateScale {
  x1 = "1",
  x0_75 = "0.75",
  x0_5 = "0.5",
  x0_25 = "0.25",
}

export class TemplateScaleParam implements Param {
  constructor() {}

  public onInput({
    query,
    key,
    result,
  }: ParameterInputEvent<ParameterValues>): void {
    const suggestions = Object.values(TemplateScale).map((scale) => ({
      name: `x${scale}`,
      data: scale,
    }));
    result.setSuggestions(suggestions);
  }
}
