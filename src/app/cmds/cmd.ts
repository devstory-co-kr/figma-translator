export enum Cmds {
  translate = "translate",
  createTemplates = "createTemplates",
  resetConfiguration = "resetConfiguration",
  changeFonts = "changeFonts",
}

export interface Cmd {
  onRun(args: any): Promise<void>;
  onMessage(message: any, props: OnMessageProperties): Promise<void>;
}
