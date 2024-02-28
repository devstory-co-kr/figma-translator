export enum Cmds {
  translate = "translate",
  createTemplates = "createTemplates",
}

export interface Cmd {
  onRun(args: any): void | Promise<void>;
}
