import { Notification } from "../../util/notification";
import { FigmaService } from "../components/figma/figma.interface";
import { PlatformService } from "../components/platform/platform.interface";
import {
  Platform,
  TemplateService,
} from "../components/template/template.interface";
import { Cmd } from "./cmd";

enum MsgType {
  init = "init",
  createTemplates = "createTemplates",
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
      height: 356,
      title: `Create ${platform} Templates`,
    });
    // this.figmaService.createFrame({
    //   name: "hahaha!",
    //   size: { w: 1284, h: 2778 },
    //   position: { x: 0, y: 0 },
    // });
  }

  public onMessage(message: any, props: OnMessageProperties): void {
    if (!this.platformParam) {
      return;
    }
    const platform = this.platformParam;
    switch (<MsgType>message.type) {
      case MsgType.init:
        figma.ui.postMessage({
          type: MsgType.init,
          data: {
            platform,
            locales: this.platformService.getLocale(platform),
          },
        });
        break;
      case MsgType.createTemplates:
        console.log("come! ", message);
        const { sourceLocale, targetLocales } = message.data;
        if (targetLocales.length === 0) {
          Notification.i("Please select at least one target language.");
          return;
        }
        console.log(sourceLocale, targetLocales);
        break;
    }
  }
}
