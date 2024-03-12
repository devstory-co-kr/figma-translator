import { Position, Size } from "../template/template.interface";
import { FigmaRepository } from "./figma.interface";

export class FigmaRepositoryImpl implements FigmaRepository {
  public async loadFonts(fontNameList: FontName[]): Promise<void> {
    await Promise.all([
      ...fontNameList.map((fontName) => figma.loadFontAsync(fontName)),
    ]);
  }

  public async setStyledMixedTextSegments({
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
  }): Promise<void> {
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const start = textList.slice(0, i).reduce((p, c) => p + c.length, 0);
      const jointSize = jointList.slice(0, i).reduce((p, c) => p + c.length, 0);
      const end = start + jointSize + textList[i].length;

      let fontName: FontName;
      const replaceFonts = fonts ?? [];
      if (replaceFonts.length === 1) {
        // If there is only one font you want to change
        fontName = replaceFonts[0];
      } else if (replaceFonts.length > 1) {
        // If there are multiple fonts you want to change
        let sameStyleFont: FontName | undefined;
        let regularStyleFont: FontName | undefined;
        for (const replaceFont of replaceFonts) {
          if (replaceFont.style.toLocaleLowerCase() === "regular") {
            regularStyleFont = replaceFont;
          }
          if (
            replaceFont.style.toLocaleLowerCase() ===
            segment.fontName.style.toLocaleLowerCase()
          ) {
            sameStyleFont = replaceFont;
            break;
          }
        }
        fontName = sameStyleFont ?? regularStyleFont ?? segment.fontName;
      } else {
        // Default
        fontName = segment.fontName;
      }

      node.setRangeFontSize(start, end, segment.fontSize + fontSizeDelta);
      node.setRangeFontName(start, end, fontName);
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
        ? await node.setRangeFillStyleIdAsync(start, end, segment.fillStyleId)
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
}
