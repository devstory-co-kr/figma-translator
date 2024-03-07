import { Param } from "./param";

export class AutoSizeParam implements Param {
  constructor() {}

  public onInput({
    query,
    key,
    result,
  }: ParameterInputEvent<ParameterValues>): void {
    result.setSuggestions([
      {
        name: "On",
        data: true,
      },
      {
        name: "Off",
        data: false,
      },
    ]);
  }
}
