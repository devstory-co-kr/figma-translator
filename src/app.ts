import { Cmd, Cmds } from "./command/cmd";
import { TranslateCmd } from "./command/translate.cmd";
import { Param, Params } from "./param/param";
import { SelectSourceLanguageParam } from "./param/select_source_language.param";

export interface App {
  params: Record<Params, Param>;
  cmds: Record<Cmds, Cmd>;
}

export class FigmaTranslator implements App {
  params: Record<Params, Param> = {
    [Params.selectSourceLanguage]: new SelectSourceLanguageParam(),
  };

  cmds: Record<Cmds, Cmd> = {
    [Cmds.createTemplate]: new TranslateCmd(),
    [Cmds.translate]: new TranslateCmd(),
  };
}
