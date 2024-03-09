import { Notification } from "../../../util/notification";
import { ConfigService } from "../../components/config/config.interface";
import { FigmaService } from "../../components/figma/figma.interface";
import {
  PlatformLocale,
  PlatformService,
} from "../../components/platform/platform.interface";
import {
  Box,
  Frame,
  Position,
  Template,
  TemplateService,
} from "../../components/template/template.interface";
import { TextDirection } from "../../components/translator_language/translator_language.interface";
import { Platform } from "../../params/platform.param";
import { TemplateScale } from "../../params/template_scale.param";
import { Cmd } from "../cmd";
import { CreateTemplatesState } from "./create_templates.state";

enum MsgType {
  init = "init",
  createTemplates = "createTemplates",
  createTemplatesStateChanged = "createTemplatesStateChanged",
}

export class CreateTemplatesCmd implements Cmd {
  constructor(
    private figmaService: FigmaService,
    private configService: ConfigService,
    private platformService: PlatformService,
    private templateService: TemplateService
  ) {}

  public async onRun(): Promise<void> {
    figma.showUI(__uiFiles__.createTemplates, {
      width: 300,
      height: 400,
      title: `Create Templates`,
    });
  }

  public async onMessage(
    message: any,
    props: OnMessageProperties
  ): Promise<void> {
    switch (<MsgType>message.type) {
      case MsgType.init:
        await this.onInit();
        break;
      case MsgType.createTemplatesStateChanged:
        await this.onCreateTemplatesStateChanged(
          message.data as CreateTemplatesState
        );
        break;
      case MsgType.createTemplates:
        this.onCreateTemplates(message.data as CreateTemplatesState);
        break;
    }
  }

  private async onInit(): Promise<void> {
    let state = await this.configService.getCreateTemplatesState();
    const platformLocales = this.platformService.getAllLocales();
    const platformTemplates = this.templateService.getAllTemplates();
    if (!state) {
      // Default
      const platform = Platform.Android;
      state = <CreateTemplatesState>{
        platform,
        textDirection: TextDirection.LTR,
        templateScale: Number(TemplateScale.x0_25),
        targetLocales: {
          [TextDirection.LTR]: platformLocales[platform]
            .filter(
              (l) => l.translatorLanguage.textDirection === TextDirection.LTR
            )
            .map((targetLocale) => ({
              targetLocale,
              isChecked: true,
              isVisible: true,
            })),
          [TextDirection.RTL]: platformLocales[platform]
            .filter(
              (l) => l.translatorLanguage.textDirection === TextDirection.RTL
            )
            .map((targetLocale) => ({
              targetLocale,
              isChecked: true,
              isVisible: true,
            })),
        },
        templates: {
          [Platform.Android]: platformTemplates[Platform.Android].map(
            (template) => ({
              template,
              isChecked: true,
              count: template.frame.maxCount,
            })
          ),
          [Platform.iOS]: platformTemplates[Platform.iOS].map((template) => ({
            template,
            isChecked: true,
            count: template.frame.maxCount,
          })),
        },
      };
    }
    figma.ui.postMessage({
      type: MsgType.init,
      data: {
        ...state,
        platformLocales,
        platformTemplates,
      },
    });
  }

  private async onCreateTemplatesStateChanged(
    state: CreateTemplatesState
  ): Promise<void> {
    await this.configService.setCreateTemplatesState(state);
  }

  private onCreateTemplates(state: CreateTemplatesState): void {
    this.createFrames({
      ...state,
      targetLocales: state.targetLocales[state.textDirection].filter((l) => {
        return l.isChecked;
      }),
      templates: state.templates[state.platform].filter((t) => {
        return t.isChecked;
      }),
    });
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
    targetLocales: {
      targetLocale: PlatformLocale;
      isChecked: true;
      isVisible: true;
    }[];
    templates: {
      template: Template;
      isChecked: boolean;
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
    const instanceXGap = 64;
    const instanceYGap = 64;
    const n = Math.ceil(Math.sqrt(targetLocales.length));
    for (let i = 0; i < targetLocales.length; i++) {
      const col = i % n;
      const row = Math.floor(i / n);
      const targetLocale = targetLocales[i].targetLocale;
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
