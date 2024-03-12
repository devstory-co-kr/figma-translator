import { Notification } from "../../../util/notification";
import { FigmaService } from "../../components/figma/figma.interface";
import { Cmd } from "../cmd";
import {
  ChangeFontsFocusState,
  ChangeFontsInitState,
  ChangeFontsTargets,
} from "./change_fonts.state";

enum MsgType {
  init = "init",
  focus = "focus",
  change = "change",
  selectionChanged = "selectionChanged",
}

export default class ChangeFontsCmd implements Cmd {
  constructor(private figmaService: FigmaService) {}

  public async onRun(args: any): Promise<void> {
    figma.showUI(__uiFiles__.changeFonts, {
      width: 300,
      height: 400,
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
        this.addSelectionChangeListener();
        break;
      case MsgType.focus:
        const { targets } = message.data as ChangeFontsFocusState;
        this.onFocusNodes(targets);
        break;
      case MsgType.change:
        break;
    }
  }

  private addSelectionChangeListener(): void {
    figma.on("selectionchange", async () => {
      const targets = await this.getSelectedTargetFonts();
      figma.ui.postMessage({
        type: MsgType.selectionChanged,
        data: {
          targets,
        },
      });
    });
  }

  private async onInit(): Promise<void> {
    const availableFonts = await figma.listAvailableFontsAsync();
    const targets = await this.getSelectedTargetFonts();

    figma.ui.postMessage({
      type: MsgType.init,
      data: <ChangeFontsInitState>{
        targets,
        availableFonts,
        replaceFont: {
          family: availableFonts[0].fontName.family,
          style: availableFonts[0].fontName.style,
        },
      },
    });
  }

  private onFocusNodes(targets: ChangeFontsTargets): void {
    const textNodes: TextNode[] = [];
    for (const family of Object.keys(targets)) {
      for (const { nodes, isChecked } of Object.values(targets[family])) {
        if (isChecked) {
          textNodes.push(...nodes);
        }
      }
    }
    if (textNodes.length === 0) {
      Notification.i("Please select the target font you want to focus on.");
      return;
    }
    figma.currentPage.selection = textNodes;
  }

  private onChange(): void {
    Notification.i("on change!");
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
