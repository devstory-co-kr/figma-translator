export enum Params {
  selectSourceLanguage = "selectSourceLanguage",
}

export interface Param {
  onInput({ query, key, result }: ParameterInputEvent): void | Promise<void>;
}
