export enum Cmds {
  translate = "translate",
  createTemplates = "createTemplates",
  deleteTranslationCache = "deleteTranslationCache",
}

export interface Cmd {
  onRun(args: any): Promise<void>;
  onMessage(message: any, props: OnMessageProperties): Promise<void>;
}
