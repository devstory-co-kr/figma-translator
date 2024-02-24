export enum Cmds {
  translate = "translate",
  createTemplate = "createTemplate",
}

export interface Cmd {
  onRun({ command, parameters }: RunEvent): void | Promise<void>;
}
