import {
  Box,
  Frame,
  Position,
  Size,
  Template,
} from "../template/template.interface";
import { FigmaRepository, FigmaService, FrameInfo } from "./figma.interface";

export class FigmaServiceImpl implements FigmaService {
  constructor(private figmaRepository: FigmaRepository) {}

  public createFrames({
    templates,
    position,
    xGap,
    yGap,
    scale,
  }: {
    templates: {
      getName: (frame: Frame, index: number) => string;
      template: Template;
      count: number;
    }[];
    position: Position;
    xGap: number;
    yGap: number;
    scale: number;
  }): FrameInfo[] | undefined {
    const startPos: Position = position;
    const frames: FrameInfo[] = [];

    for (let i = 0; i < templates.length; i++) {
      const { template, count, getName } = templates[i];
      const { frame } = template;
      const scaledSize: Size = {
        w: frame.size.w * scale,
        h: frame.size.h * scale,
      };

      // Create frame
      for (let index = 0; index < count; index++) {
        const framePos: Position = {
          x: startPos.x + index * (scaledSize.w + xGap),
          y: startPos.y,
        };
        const frameNode = this.figmaRepository.createFrame({
          name: getName(frame, index),
          size: scaledSize,
          position: framePos,
        });

        frames.push({
          frame,
          index,
          node: frameNode,
        });
      }
      startPos.y += scaledSize.h + yGap;
    }

    if (frames.length === 0) {
      return undefined;
    }

    return frames;
  }

  public createComponent(node: SceneNode): ComponentNode {
    return figma.createComponentFromNode(node);
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

  public async replaceText({
    node,
    autoSize,
    fonts,
    cb,
  }: {
    node: TextNode;
    autoSize: boolean;
    fonts?: FontName[];
    cb: (textList: string[]) => Promise<string[]>;
  }): Promise<void> {
    const beforeWidth = node.width;
    const beforeHeight = node.height;

    const { segments, textList, jointList } =
      this.figmaRepository.getStyleMixedTextSegments(node);
    await this.figmaRepository.loadFonts(
      fonts ?? segments.map((segment) => segment.fontName)
    );

    const targetTextList = await cb(textList);
    node.characters = targetTextList.reduce((prev, curr, i) => {
      return prev + (i == 0 ? "" : jointList[i - 1]) + curr;
    }, "");

    // Reduce the font size until width and height are less then or equal to the previous values.
    let nTry = 0;
    let fontSizeDelta = 0;
    while (
      nTry === 0 ||
      node.width > beforeWidth ||
      node.height > beforeHeight
    ) {
      await this.figmaRepository.setStyledMixedTextSegments({
        node,
        segments,
        jointList,
        textList: targetTextList,
        fontSizeDelta,
        fonts,
      });
      nTry++;
      fontSizeDelta--;
      if (nTry >= 100 || !autoSize) {
        break;
      }
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
    let res;
    while (!(res = walker.next()).done) {
      const node = res.value;
      await args.cb(node);
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
