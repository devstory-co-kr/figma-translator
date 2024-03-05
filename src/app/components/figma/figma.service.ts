import { Box, Frame, Position, Template } from "../template/template.interface";
import { FigmaRepository, FigmaService, FrameInfo } from "./figma.interface";

export class FigmaServiceImpl implements FigmaService {
  constructor(private figmaRepository: FigmaRepository) {}

  public createFrames({
    templates,
    position,
    xGap,
    yGap,
    component,
  }: {
    templates: {
      getName: (frame: Frame, index: number) => string;
      template: Template;
      count: number;
    }[];
    position: Position;
    xGap: number;
    yGap: number;
    component?: ComponentNode;
  }): FrameInfo[] | undefined {
    const startPos: Position = position;
    const frames: FrameInfo[] = [];

    for (let i = 0; i < templates.length; i++) {
      const { template, count, getName } = templates[i];
      const { frame } = template;

      // Create frame
      for (let index = 0; index < count; index++) {
        const framePos: Position = {
          x: startPos.x + index * (frame.size.w + xGap),
          y: startPos.y,
        };
        const frameNode = this.figmaRepository.createFrame({
          name: getName(frame, index),
          size: frame.size,
          position: framePos,
        });

        frames.push({
          frame,
          index,
          node: frameNode,
        });

        // Update box
        const frameBottomLeft: Position = {
          x: framePos.x + frame.size.w,
          y: framePos.y + frame.size.h,
        };
      }
      startPos.y += frame.size.h + yGap;
    }

    if (frames.length === 0) {
      return undefined;
    }

    return frames;
  }

  public createComponent(node: SceneNode): ComponentNode {
    const component = figma.createComponent();
    component.name = node.name;
    component.resize(node.width, node.height);
    component.x = node.x;
    component.y = node.y;
    component.appendChild(node);
    node.x = 0;
    node.y = 0;
    return component;
  }

  public createInstance({
    componentNode,
    position,
    name,
  }: {
    componentNode: ComponentNode;
    position: Position;
    name: string;
  }): InstanceNode {
    const instance = componentNode.createInstance();
    instance.name = name;
    instance.x = position.x;
    instance.y = position.y;
    return instance;
  }

  public async replaceText(
    node: TextNode,
    cb: (textList: string[]) => Promise<string[]>
  ): Promise<void> {
    const isStyleMixed = node.fontName === figma.mixed;
    if (!isStyleMixed) {
      // mono style
      await this.figmaRepository.loadFonts([node.fontName as FontName]);
      const targetTextList = await cb([node.characters]);
      node.characters = targetTextList[0];
    } else {
      // mixed style
      const { segments, textList, jointList } =
        this.figmaRepository.getStyleMixedTextSegments(node);
      await this.figmaRepository.loadFonts(
        segments.map((segment) => segment.fontName)
      );

      const targetTextList = await cb(textList);
      node.characters = targetTextList.reduce((prev, curr, i) => {
        return prev + (i == 0 ? "" : jointList[i - 1]) + curr;
      }, "");

      this.figmaRepository.setStyledMixedTextSegments({
        node,
        segments,
        jointList,
        textList: targetTextList,
      });
    }
  }

  public async search(args: {
    node: SceneNode;
    skipInvisibleNode: boolean;
    cb: (node: SceneNode) => Promise<void>;
  }): Promise<void> {
    const walker = this.figmaRepository.walkTree(
      args.node,
      args.skipInvisibleNode
    );
    let count = 0;
    let done = true;
    let res;
    while (!(res = walker.next()).done) {
      const node = res.value;
      await args.cb(node);

      if (++count === 1000) {
        done = false;
        break;
      }
    }
  }

  public getNodesByType(
    nodeList: readonly SceneNode[],
    typeList: string[]
  ): SceneNode[] {
    const results: SceneNode[] = [];
    for (const node of nodeList) {
      if (typeList.includes(node.type)) {
        results.push(node);
      }
    }
    return results;
  }

  public move(nodes: SceneNode[], position: Position): void {
    if (nodes.length === 0) {
      return;
    }

    const group = figma.group(nodes, figma.currentPage);
    group.x = position.x;
    group.y = position.y;
    figma.ungroup(group);
  }

  public getBox(nodes: SceneNode[]): Box {
    const group = figma.group(nodes, figma.currentPage);
    const box: Box = {
      x: group.x,
      y: group.y,
      width: group.width,
      height: group.height,
    };
    figma.ungroup(group);
    return box;
  }
}
