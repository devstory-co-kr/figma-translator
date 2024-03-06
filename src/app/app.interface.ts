import { Cmd, Cmds } from "./cmds/cmd";
import { Param, Params } from "./params/param";

export interface App {
  cmds: Record<Cmds, Cmd>;
  params: Record<Params, Param>;
}
