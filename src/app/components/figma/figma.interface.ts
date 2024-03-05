import {
  Box,
  Frame,
  Position,
  Size,
  Template,
} from "../template/template.interface";

export type FrameInfo = {
  frame: Frame;
  index: number;
  node: FrameNode;
};

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

  createFrames({
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
  }): FrameInfo[] | undefined;

  createComponent(node: SceneNode): ComponentNode;

  createInstance({
    componentNode,
    position,
    name,
  }: {
    componentNode: ComponentNode;
    position: Position;
    name: string;
  }): InstanceNode;

  move(nodes: SceneNode[], position: Position): void;

  getBox(nodes: SceneNode[]): Box;
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

  createFrame({
    name,
    size,
    position,
  }: {
    name: string;
    size: Size;
    position: Position;
  }): FrameNode;
}
