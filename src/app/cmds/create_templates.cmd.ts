import { FigmaService } from "../../components/figma/figma.interface";
import { PlatformService } from "../../components/platform/platform.interface";
import {
  Platform,
  TemplateService,
} from "../../components/template/template.interface";
import { Cmd } from "./cmd";

enum MsgType {
  init = "init",
}

export class CreateTemplatesCmd implements Cmd {
  constructor(
    private figmaService: FigmaService,
    private templateService: TemplateService,
    private platformService: PlatformService
  ) {}

  platformParam?: Platform;

  public onRun({ platform }: { platform: Platform }): void {
    this.platformParam = platform;
    figma.showUI(__uiFiles__.createTemplates, {
      width: 300,
      height: 400,
      title: "Create Templates",
    });
    this.figmaService.createFrame({
      name: "hahaha!",
      size: { w: 1284, h: 2778 },
      position: { x: 0, y: 0 },
    });
  }

  public onMessage(message: any, props: OnMessageProperties): void {
    if (!this.platformParam) {
      return;
    }
    console.log(
      "i'm create template mcd",
      message,
      props,
      this.platformParam,
      <MsgType>message.type
    );
    switch (<MsgType>message.type) {
      case MsgType.init:
        console.log("here!");
        figma.ui.postMessage({
          type: MsgType.init,
          data: {
            targetLocales: this.platformService.getLocale(this.platformParam),
          },
        });
        break;
    }
  }
}
