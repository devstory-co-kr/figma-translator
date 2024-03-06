export enum Params {
  platform = "platform",
  sourceLanguage = "sourceLanguage",
  textDirection = "textDirection",
  templateScale = "templateScale",
}

export interface Param {
  onInput({ query, key, result }: ParameterInputEvent): void | Promise<void>;
}
