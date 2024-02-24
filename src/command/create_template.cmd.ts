import { Cmd } from "./cmd";

export class CreateTemplate implements Cmd {
  onRun({ command, parameters }: RunEvent): void {
    throw new Error("Method not implemented.");
  }
}
