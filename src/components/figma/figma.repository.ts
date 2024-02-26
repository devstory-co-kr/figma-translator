import { FigmaRepository } from "./figma.interface";

export class FigmaRepositoryImpl implements FigmaRepository {
  public async loadFonts(fontNameList: FontName[]): Promise<void> {
    await Promise.all([
      ...fontNameList.map((fontName) => figma.loadFontAsync(fontName)),
    ]);
  }

  public setStyledMixedTextSegments({
    node,
    segments,
    textList,
    jointList,
  }: {
    node: TextNode;
    segments: StyledTextSegment[];
    textList: string[];
    jointList: string[];
  }): void {
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const start = textList.slice(0, i).reduce((p, c) => p + c.length, 0);
      const jointSize = i == 0 ? 0 : jointList[i - 1].length;
      const end = start + jointSize + textList[i].length;
      node.setRangeFontSize(start, end, segment.fontSize);
      node.setRangeFontName(start, end, segment.fontName);
      node.setRangeHyperlink(start, end, segment.hyperlink);
      node.setRangeListOptions(start, end, segment.listOptions);
      node.setRangeIndentation(start, end, segment.indentation);

      if (segment.textStyleId) {
        node.setRangeTextStyleId(start, end, segment.textStyleId);
      } else {
        node.setRangeTextDecoration(start, end, segment.textDecoration);
        node.setRangeTextCase(start, end, segment.textCase);
        node.setRangeLineHeight(start, end, segment.lineHeight);
        node.setRangeLetterSpacing(start, end, segment.letterSpacing);
      }

      segment.fillStyleId
        ? node.setRangeFillStyleId(start, end, segment.fillStyleId)
        : node.setRangeFills(start, end, segment.fills);
    }
  }

  public getStyleMixedTextSegments(node: TextNode): {
    segments: StyledTextSegment[];
    textList: string[];
    jointList: string[];
  } {
    const segments = node.getStyledTextSegments([
      "fontSize",
      "fontName",
      "fontWeight",
      "textDecoration",
      "textCase",
      "lineHeight",
      "letterSpacing",
      "fills",
      "textStyleId",
      "fillStyleId",
      "listOptions",
      "indentation",
      "hyperlink",
      "openTypeFeatures",
    ]);

    // sentence end list
    const textList: string[] = [];
    const jointList: string[] = [];
    const endRegex = /\s*$/;
    for (const segment of segments) {
      const text = segment.characters;
      const match = text.match(endRegex);
      jointList.push(match ? match[0] : "");
      textList.push(text.replace(endRegex, ""));
      figma.loadFontAsync(segment.fontName);
    }

    return {
      segments,
      textList,
      jointList,
    };
  }

  public *walkTree(
    node: SceneNode,
    skipInvisibleNode: boolean
  ): Generator<SceneNode, any, unknown> {
    if (skipInvisibleNode && !node.visible) {
      return;
    }

    yield node;
    if ("children" in node) {
      for (let child of node.children) {
        yield* this.walkTree(child, skipInvisibleNode);
      }
    }
  }
}
