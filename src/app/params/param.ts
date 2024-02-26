export enum Params {
  sourceLanguage = "sourceLanguage",
}

export interface Param {
  onInput({ query, key, result }: ParameterInputEvent): void | Promise<void>;
}
