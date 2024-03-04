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

export type CreateFramesResult =
  | {
      box: Box;
      frames: FrameInfo[];
    }
  | undefined;

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
  }): CreateFramesResult;

  createComponent(node: SceneNode): ComponentNode;

  createInstance({
    component,
    position,
    name,
  }: {
    component: ComponentNode;
    position: Position;
    name: string;
  }): InstanceNode;

  alignToTopLeft(nodes: SceneNode[]): void;
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
