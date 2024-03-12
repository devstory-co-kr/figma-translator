import { Notification } from "../../../util/notification";
import { ConfigService } from "../../components/config/config.interface";
import { FigmaService } from "../../components/figma/figma.interface";
import { Cmd } from "../cmd";
import {
  ChangeFontsChangeState,
  ChangeFontsDeleteReplaceFontHistoryState,
  ChangeFontsFocusState,
  ChangeFontsInitState,
  ChangeFontsTargets,
} from "./change_fonts.state";

enum MsgType {
  init = "init",
  focus = "focus",
  change = "change",
  deleteReplaceFontHistory = "deleteReplaceFontHistory",
  selectionChanged = "selectionChanged",
  replaceFontHistoryChanged = "replaceFontHistoryChanged",
}

export default class ChangeFontsCmd implements Cmd {
  constructor(
    private figmaService: FigmaService,
    private configService: ConfigService
  ) {}

  public async onRun(args: any): Promise<void> {
    figma.showUI(__uiFiles__.changeFonts, {
      width: 300,
      height: 330,
      title: `Change Fonts`,
    });
  }

  public async onMessage(
    message: any,
    props: OnMessageProperties
  ): Promise<void> {
    switch (<MsgType>message.type) {
      case MsgType.init:
        await this.onInit();
        // add selection change listener
        figma.on("selectionchange", async () => {
          await this.sendSelectionChanged();
        });
        break;
      case MsgType.focus:
        this.onFocus(message.data as ChangeFontsFocusState);
        break;
      case MsgType.change:
        await this.onChange(message.data as ChangeFontsChangeState);
        break;
      case MsgType.deleteReplaceFontHistory:
        await this.onDeleteReplaceFontHistory(
          message.data as ChangeFontsDeleteReplaceFontHistoryState
        );
        break;
    }
  }

  private async onDeleteReplaceFontHistory({
    replaceFont,
  }: ChangeFontsDeleteReplaceFontHistoryState): Promise<void> {
    // Delete replace font history
    const previousHistory =
      (await this.configService.getReplaceFontHistory()) ?? [];
    const replaceFontHistory = previousHistory.filter(
      (history) =>
        history.family !== replaceFont.family ||
        history.style !== replaceFont.style
    );
    this.configService.setReplaceFontHistory(replaceFontHistory);

    // Send replace font history changed
    figma.ui.postMessage({
      type: MsgType.replaceFontHistoryChanged,
      data: {
        replaceFontHistory,
      },
    });
  }

  private async saveReplaceFontHistoryChanged(
    replaceFont: FontName
  ): Promise<void> {
    // Save replace font history
    const previousHistory =
      (await this.configService.getReplaceFontHistory()) ?? [];
    const history = previousHistory.find(
      (history) =>
        history.family === replaceFont.family &&
        history.style === replaceFont.style
    );
    const replaceFontHistory = history
      ? previousHistory
      : [...previousHistory, replaceFont];
    this.configService.setReplaceFontHistory(replaceFontHistory);

    // Send replace font history changed
    figma.ui.postMessage({
      type: MsgType.replaceFontHistoryChanged,
      data: {
        replaceFontHistory,
      },
    });
  }

  private async sendSelectionChanged(): Promise<void> {
    const targets = await this.getSelectedTargetFonts();
    figma.ui.postMessage({
      type: MsgType.selectionChanged,
      data: {
        targets,
      },
    });
  }

  private async onInit(): Promise<void> {
    const availableFonts = await figma.listAvailableFontsAsync();
    const targets = await this.getSelectedTargetFonts();
    const replaceFontHistory =
      (await this.configService.getReplaceFontHistory()) ?? [];

    figma.ui.postMessage({
      type: MsgType.init,
      data: <ChangeFontsInitState>{
        targets,
        availableFonts,
        replaceFontHistory,
        replaceFont: {
          family: availableFonts[0].fontName.family,
          style: availableFonts[0].fontName.style,
        },
      },
    });
  }

  private onFocus({ targets }: ChangeFontsFocusState): void {
    const nodes = this.getCheckedTargetNodes(targets);
    if (nodes.length === 0) {
      Notification.i("Please select the target font you want to focus.");
      return;
    }
    figma.currentPage.selection = nodes;
  }

  private async onChange({
    targets,
    replaceFont,
  }: ChangeFontsChangeState): Promise<void> {
    const nodes = this.getCheckedTargetNodes(targets);
    if (nodes.length === 0) {
      Notification.i("Please select the target font you want to change.");
      return;
    }

    let nNode = 0;
    for (const node of nodes) {
      const textNode = await figma.getNodeByIdAsync(node.id);
      if (!textNode) {
        continue;
      }
      await this.figmaService.replaceText({
        node: textNode as TextNode,
        autoSize: false,
        fonts: [replaceFont],
        cb: (textList) => textList,
      });
      nNode++;
      Notification.i(`${nNode}/${nodes.length} changing...`);
    }

    Notification.i(`${nNode} fonts changed.`);
    await this.sendSelectionChanged();
    await this.saveReplaceFontHistoryChanged(replaceFont);
  }

  private getCheckedTargetNodes(targets: ChangeFontsTargets): TextNode[] {
    const textNodes: TextNode[] = [];
    for (const family of Object.keys(targets)) {
      for (const { nodes, isChecked } of Object.values(targets[family])) {
        if (isChecked) {
          textNodes.push(...nodes);
        }
      }
    }
    return textNodes;
  }

  private async getSelectedTargetFonts(): Promise<ChangeFontsTargets> {
    const selectedFonts = await this.figmaService.getFontsFromSelection();
    const targets = <ChangeFontsTargets>{};
    for (const family of Object.keys(selectedFonts ?? {})) {
      for (const [style, nodes] of Object.entries(selectedFonts[family])) {
        if (!targets[family]) targets[family] = {};
        targets[family][style] = {
          nodes,
          isChecked: false,
        };
      }
    }
    return targets;
  }
}
