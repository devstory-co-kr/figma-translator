import { Notification } from "../../util/notification";
import { FigmaService } from "../components/figma/figma.interface";
import {
  PlatformLocale,
  PlatformService,
} from "../components/platform/platform.interface";
import {
  Box,
  Frame,
  Position,
  Template,
  TemplateService,
} from "../components/template/template.interface";
import { TextDirection } from "../components/translator_language/translator_language.interface";
import { Platform } from "../params/platform.param";
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
  textDirection?: TextDirection;
  templateScale?: number;

  public onRun({
    platform,
    textDirection,
    templateScale,
  }: {
    platform: Platform;
    textDirection: TextDirection;
    templateScale: number;
  }): void {
    this.platform = platform;
    this.textDirection = textDirection;
    this.templateScale = templateScale;
    figma.showUI(__uiFiles__.createTemplates, {
      width: 250,
      height: 500,
      title: `Create Templates`,
    });
  }

  public onMessage(message: any, props: OnMessageProperties): void {
    if (!this.platform || !this.textDirection || !this.templateScale) {
      return;
    }
    switch (<MsgType>message.type) {
      // Init
      case MsgType.init:
        figma.ui.postMessage({
          type: MsgType.init,
          data: {
            platform: this.platform,
            textDirection: this.textDirection,
            templateScale: this.templateScale,
            platformLocales: this.platformService.getAllLocales(),
            platformTemplates: this.templateService.getAllTemplates(),
          },
        });
        break;
      //  Create Template
      case MsgType.createTemplates:
        const {
          platform,
          textDirection,
          templateScale,
          targetLocales,
          templates,
        } = message.data;
        this.createFrames({
          platform,
          textDirection,
          templateScale,
          targetLocales,
          templates,
        });
        break;
    }
  }

  private createFrames({
    platform,
    textDirection,
    templateScale,
    targetLocales,
    templates,
  }: {
    platform: Platform;
    textDirection: TextDirection;
    templateScale: number;
    targetLocales: PlatformLocale[];
    templates: {
      template: Template;
      count: number;
    }[];
  }) {
    if (targetLocales.length === 0) {
      Notification.i("Please select at least one target language.");
      return;
    }
    if (templates.length === 0) {
      Notification.i("Please select at least one template.");
      return;
    }

    const position: Position = {
      x: 0,
      y: 0,
    };

    // Create component
    const componentFrames =
      this.figmaService.createFrames({
        templates: templates.map((e) => ({
          ...e,
          getName: (frame, index) => {
            return `${platform} / ${textDirection} / ${e.template.name} - ${index}`;
          },
        })),
        xGap: 32,
        yGap: 64,
        position,
        scale: templateScale,
      }) ?? [];
    if (componentFrames.length === 0) {
      return;
    }

    // Set to component
    const box: Box = this.figmaService.getBox(
      componentFrames.map((e) => e.node)
    );
    const components: {
      frame: Frame;
      index: number;
      node: ComponentNode;
    }[] = componentFrames.map((frame) => {
      return {
        ...frame,
        node: this.figmaService.createComponent(frame.node),
      };
    });

    // Create instance
    const instances: InstanceNode[] = [];
    const instanceXGap = 500;
    const instanceYGap = 500;
    const n = Math.ceil(Math.sqrt(targetLocales.length));
    for (let i = 0; i < targetLocales.length; i++) {
      const col = i % n;
      const row = Math.floor(i / n);
      const targetLocale = targetLocales[i];
      const startPos: Position = {
        x: box.x + box.width + col * (box.width + instanceXGap) + instanceXGap,
        y: box.y + row * (box.height + instanceYGap),
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
    const viewport = figma.viewport.bounds;
    const viewportPosition: Position = { x: viewport.x, y: viewport.y };
    this.figmaService.move([...componentNodes, ...instances], viewportPosition);

    // Scroll and zoom into component
    figma.viewport.scrollAndZoomIntoView(componentNodes);
  }
}
