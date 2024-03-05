import { Box, Frame, Position, Template } from "../template/template.interface";
import {
  CreateFramesResult,
  FigmaRepository,
  FigmaService,
  FrameInfo,
} from "./figma.interface";

export class FigmaServiceImpl implements FigmaService {
  constructor(private figmaRepository: FigmaRepository) {}

  public createFrames({
    getName,
    templates,
    position,
    xGap,
    yGap,
    component,
  }: {
    getName: (template: Template, frame: Frame, index: number) => string;
    templates: Template[];
    position: Position;
    xGap: number;
    yGap: number;
    component?: ComponentNode;
  }): CreateFramesResult {
    const startPos: Position = position;
    const frames: FrameInfo[] = [];
    const box: Box = {
      topLeft: { ...position },
      bottomRight: { ...position },
    };

    for (let i = 0; i < templates.length; i++) {
      const template = templates[i];
      const { frame } = template;

      // Create frame
      for (let index = 0; index < frame.maxCount; index++) {
        const framePos: Position = {
          x: startPos.x + index * (frame.size.w + xGap),
          y: startPos.y,
        };
        const frameNode = this.figmaRepository.createFrame({
          name: getName(template, frame, index),
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
        if (
          box.bottomRight.x <= frameBottomLeft.x &&
          box.bottomRight.y <= frameBottomLeft.y
        ) {
          box.bottomRight = { ...frameBottomLeft };
        }
      }
      startPos.y += frame.size.h + yGap;
    }

    if (frames.length === 0) {
      return undefined;
    }

    return <CreateFramesResult>{
      box,
      frames,
    };
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

  public alignToTopLeft(nodes: SceneNode[]): void {
    if (nodes.length === 0) {
      return;
    }

    const group = figma.group(nodes, figma.currentPage);
    // canvas max size -65000 ~ 65000
    const topLeftX = -65000;
    const topLeftY = -65000;
    group.x = topLeftX;
    group.y = topLeftY;
    figma.ungroup(group);
  }
}
