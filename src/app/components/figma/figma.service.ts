import { Position, Size } from "../template/template.interface";
import { FigmaRepository, FigmaService } from "./figma.interface";

export class FigmaServiceImpl implements FigmaService {
  constructor(private figmaRepository: FigmaRepository) {}

  public createFrame({
    name,
    size,
    position,
  }: {
    name: string;
    size: Size;
    position: Position;
  }): FrameNode {
    const frame = figma.createFrame();
    frame.name = name;
    frame.resize(size.w, size.h);
    frame.x = position.x;
    frame.y = position.y;
    figma.currentPage.appendChild(frame);
    return frame;
  }

  public createComponent(): ComponentNode {
    throw new Error("Method not implemented.");
  }

  public createInstance(componentNode: ComponentNode): InstanceNode {
    throw new Error("Method not implemented.");
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
}
