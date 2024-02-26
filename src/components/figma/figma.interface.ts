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
