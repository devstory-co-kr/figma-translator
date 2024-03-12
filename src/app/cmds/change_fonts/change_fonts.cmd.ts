import { Notification } from "../../../util/notification";
import { FigmaService } from "../../components/figma/figma.interface";
import { Cmd } from "../cmd";
import { ChangeFontsInitState } from "./change_fonts.state";

enum MsgType {
  init = "init",
  change = "change",
  focusNodes = "focusNodes",
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
      case MsgType.focusNodes:
        const { nodes } = message.data as { nodes: TextNode[] };
        this.onFocusNodes(nodes);
        break;
      case MsgType.change:
        break;
    }
  }

  private addSelectionChangeListener(): void {
    figma.on("selectionchange", async () => {
      const selectedFonts = await this.figmaService.getFontsFromSelection();
      figma.ui.postMessage({
        type: MsgType.selectionChanged,
        data: {
          selectedFonts,
        },
      });
    });
  }

  private async onInit(): Promise<void> {
    const availableFonts = await figma.listAvailableFontsAsync();
    const selectedFonts = await this.figmaService.getFontsFromSelection();
    figma.ui.postMessage({
      type: MsgType.init,
      data: <ChangeFontsInitState>{
        selectedFonts,
        availableFonts,
      },
    });
  }

  private onFocusNodes(nodes: TextNode[]): void {
    figma.currentPage.selection = nodes;
  }

  private onChange(): void {
    Notification.i("on change!");
  }
}
