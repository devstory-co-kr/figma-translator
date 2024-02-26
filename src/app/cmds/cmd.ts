export enum Cmds {
  translate = "translate",
  createTemplate = "createTemplate",
}

export interface Cmd {
  onRun(args: any): void | Promise<void>;
}
