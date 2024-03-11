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

export type FontReplacement = {
  [targetLanguageLocale: string]: FontName[];
};

export type Fonts = {
  [fontFamily: string]: {
    [style: string]: TextNode[];
  };
};

export interface FigmaService {
  search(args: {
    node: SceneNode;
    skipInvisibleNode: boolean;
    cb: (node: SceneNode) => Promise<void>;
  }): Promise<void>;

  getFontsFromSelection(): Promise<Fonts>;

  getNodesByType(
    nodeList: readonly SceneNode[],
    typeList: string[]
  ): SceneNode[];

  replaceText({
    node,
    autoSize,
    fonts,
    cb,
  }: {
    node: TextNode;
    autoSize: boolean;
    fonts?: FontName[];
    cb: (textList: string[]) => Promise<string[]>;
  }): Promise<void>;

  createFrames({
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
    fontSizeDelta,
    fonts,
  }: {
    node: TextNode;
    segments: StyledTextSegment[];
    textList: string[];
    jointList: string[];
    fontSizeDelta: number;
    fonts?: FontName[];
  }): Promise<void>;

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
