import { Param } from "./param";

export enum Platform {
  Android = "Android",
  iOS = "iOS",
}

export class PlatformParam implements Param {
  constructor() {}

  public onInput({
    query,
    key,
    result,
  }: ParameterInputEvent<ParameterValues>): void {
    const suggestions = Object.values(Platform).map((platform) => ({
      name: platform,
      data: platform,
    }));
    result.setSuggestions(suggestions);
  }
}
