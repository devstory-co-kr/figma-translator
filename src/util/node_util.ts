import { Translator } from "../translator/translator";

function* walkTree(
  node: SceneNode,
  skipInvisibleNode: boolean
): Generator<SceneNode> {
  if (skipInvisibleNode && !node.visible) {
    return;
  }

  yield node;
  if ("children" in node) {
    for (let child of node.children) {
      yield* walkTree(child, skipInvisibleNode);
    }
  }
}

interface SearchForArgs {
  node: SceneNode;
  skipInvisibleNode: boolean;
  cb: (node: SceneNode) => Promise<void>;
}
export async function searchFor(args: SearchForArgs) {
  const walker = walkTree(args.node, args.skipInvisibleNode);
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

export function getNodeListByType(
  nodeList: readonly SceneNode[],
  typeList: string[]
): SceneNode[] {
  const results: SceneNode[] = [];
  for (const node of nodeList) {
    console.log(node.type);
    if (typeList.includes(node.type)) {
      results.push(node);
    }
  }
  return results;
}

export async function translate(
  node: SceneNode,
  targetLang: Record<string, string>,
  translator: Translator,
  isPaid: boolean
) {
  if (node.type === "TEXT") {
    const text = node.characters;
    const isStyleMixed = node.fontName === figma.mixed;
    if (isStyleMixed) {
      // mixed font
      const segments = node.getStyledTextSegments(["fontName"]);
      const results = await Promise.all([
        ...segments.map((segment) => figma.loadFontAsync(segment.fontName)),
        translator.bulkTranslate(
          segments.map((segment) => segment.characters),
          targetLang!.q,
          isPaid
        ),
      ]);
      const translatedTextList = results[results.length - 1] ?? [];
      node.characters = translatedTextList.join("");
      for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        const start = translatedTextList
          .slice(0, i)
          .reduce((p, c) => p + c.length, 0);
        const end = start + translatedTextList[i].length;
        // console.log(i, start, end, translatedTextList[i]);
        node.setRangeFontName(start, end, segment.fontName);
      }
    } else {
      // mono font
      await figma.loadFontAsync(node.fontName as FontName);
      node.characters = await translator.translate(text, targetLang!.q, isPaid);
    }
  }
}
