import { FigmaTranslator } from "./app/app";
import { App } from "./app/app.interface";
import { Cmds } from "./app/cmds/cmd";
import { Params } from "./app/params/param";

const app: App = new FigmaTranslator();

figma.parameters.on("input", (event: ParameterInputEvent) => {
  app.params[<Params>event.key].onInput(event);
});

figma.on("run", async ({ command, parameters }: RunEvent) => {
  await app.cmds[<Cmds>command].onRun(parameters);
});

figma.ui.onmessage = async (message: any, props: OnMessageProperties) => {
  app.cmds[<Cmds>message["html"]].onMessage(message, props);
};
