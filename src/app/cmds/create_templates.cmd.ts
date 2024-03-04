import { Notification } from "../../util/notification";
import { FigmaService } from "../components/figma/figma.interface";
import {
  PlatformLocale,
  PlatformService,
} from "../components/platform/platform.interface";
import {
  Frame,
  Platform,
  Position,
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
        const { targetLocales } = message.data;
        this.createFrames(platform, targetLocales);
        break;
    }
  }

  private createFrames(platform: Platform, targetLocales: PlatformLocale[]) {
    if (targetLocales.length === 0) {
      Notification.i("Please select at least one target language.");
      return;
    }

    const templates = this.templateService.getTemplates(platform);
    const position: Position = {
      x: 0,
      y: 0,
    };

    // Create component
    const createFrameResult = this.figmaService.createFrames({
      getName: (template, frame, index) =>
        `${platform.toLocaleLowerCase()} / ${template.name} - ${index}`,
      templates,
      xGap: 32,
      yGap: 64,
      position,
    });
    if (!createFrameResult) {
      return;
    }

    // Set to component
    const box = createFrameResult.box;
    const components: {
      frame: Frame;
      index: number;
      node: ComponentNode;
    }[] = createFrameResult.frames.map((frame) => {
      return {
        ...frame,
        node: this.figmaService.createComponent(frame.node),
      };
    });

    // Create instance
    const instances: InstanceNode[] = [];
    const boxWidth = box.bottomRight.x - box.topLeft.x;
    const boxHeight = box.bottomRight.y - box.topLeft.y;
    const instanceXGap = 500;
    const instanceYGap = 500;
    const n = Math.ceil(Math.sqrt(targetLocales.length));
    for (let i = 0; i < targetLocales.length; i++) {
      const col = i % n;
      const row = Math.floor(i / n);
      const targetLocale = targetLocales[i];
      const startPos: Position = {
        x: box.bottomRight.x + col * (boxWidth + instanceXGap) + instanceXGap,
        y: box.topLeft.y + row * (boxHeight + instanceYGap),
      };
      for (const component of components) {
        const instance = this.figmaService.createInstance({
          component: component.node,
          position: {
            x: startPos.x + component.node.x,
            y: startPos.y + component.node.y,
          },
          name: `${platform.toLocaleLowerCase()}/${component.frame.getName(
            targetLocale,
            component.index
          )}`,
        });
        instances.push(instance);
      }
    }

    const componentNodes = components.map((c) => c.node);

    // Align to top left
    this.figmaService.alignToTopLeft([...componentNodes, ...instances]);

    // Scroll and zoom into component
    figma.viewport.scrollAndZoomIntoView(componentNodes);
  }
}