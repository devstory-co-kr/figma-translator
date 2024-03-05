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
  Template,
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

  platform?: Platform;
  templates: Template[] = [];

  public onRun({ platform }: { platform: Platform }): void {
    this.platform = platform;
    this.templates = this.templateService.getTemplates(platform);
    figma.showUI(__uiFiles__.createTemplates, {
      width: 300,
      height: 420,
      title: `Create ${platform} Templates`,
    });
  }

  public onMessage(message: any, props: OnMessageProperties): void {
    if (!this.platform) {
      return;
    }
    switch (<MsgType>message.type) {
      case MsgType.init:
        figma.ui.postMessage({
          type: MsgType.init,
          data: {
            platform: this.platform,
            devices: this.templates,
            locales: this.platformService.getLocale(this.platform),
          },
        });
        break;
      case MsgType.createTemplates:
        const { targetLocales, devices } = message.data;
        console.log("zz", devices);
        this.createFrames(this.platform, targetLocales, devices);
        break;
    }
  }

  private createFrames(
    platform: Platform,
    targetLocales: PlatformLocale[],
    devices: {
      template: Template;
      count: number;
    }[]
  ) {
    if (targetLocales.length === 0) {
      Notification.i("Please select at least one target language.");
      return;
    }

    const position: Position = {
      x: 0,
      y: 0,
    };

    // Create component
    const createFrameResult = this.figmaService.createFrames({
      getName: (template, frame, index) =>
        `${platform.toLocaleLowerCase()} / ${template.name} - ${index}`,
      templates: this.templates,
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
        const { frame, node: componentNode, index } = component;
        const instance = this.figmaService.createInstance({
          componentNode,
          position: {
            x: startPos.x + componentNode.x,
            y: startPos.y + componentNode.y,
          },
          name: this.templateService.getFrameName(targetLocale, frame, index),
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
