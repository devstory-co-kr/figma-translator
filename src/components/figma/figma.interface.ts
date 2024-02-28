import { Position, Size } from "../template/template.interface";

export interface FigmaService {
  search(args: {
    node: SceneNode;
    skipInvisibleNode: boolean;
    cb: (node: SceneNode) => Promise<void>;
  }): Promise<void>;

  getNodesByType(
    nodeList: readonly SceneNode[],
    typeList: string[]
  ): SceneNode[];

  replaceText(
    node: SceneNode,
    cb: (textList: string[]) => Promise<string[]>
  ): Promise<void>;

  createFrame({
    name,
    size,
    position,
  }: {
    name: string;
    size: Size;
    position: Position;
  }): FrameNode;
  createComponent(): ComponentNode;
  createInstance(componentNode: ComponentNode): InstanceNode;
}

export interface FigmaRepository {
  walkTree(node: SceneNode, skipInvisibleNode: boolean): Generator<SceneNode>;

  loadFonts(fontNameList: FontName[]): Promise<void>;

  getStyleMixedTextSegments(node: TextNode): {
    segments: StyledTextSegment[];
    textList: string[];
    jointList: string[];
  };

  setStyledMixedTextSegments({
    node,
    segments,
    textList,
    jointList,
  }: {
    node: TextNode;
    segments: StyledTextSegment[];
    textList: string[];
    jointList: string[];
  }): void;
}
