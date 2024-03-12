import "../core/base.css";
import Channel from "../core/channel";
import "./index.css";
import ReplaceFont from "./js/replace_font";
import TargetFont from "./js/target_font";

window.addEventListener("DOMContentLoaded", () => {
  const channel = new Channel("changeFonts", {
    init: "init",
    change: "change",
    focusNodes: "focusNodes",
    selectionChanged: "selectionChanged",
  });

  // On message
  let changeFonts;
  channel.onMessage((type, data) => {
    switch (type) {
      case channel.types.init:
        changeFonts = new ChangeFonts(channel, data);
        break;
      case channel.types.change:
        break;
      case channel.types.focusNodes:
        break;
      case channel.types.selectionChanged:
        changeFonts.emit({
          ...changeFonts.state,
          selectedFonts: data.selectedFonts,
        });
        break;
    }
  });

  // Init
  channel.sendMessage(channel.types.init);
});

class ChangeFonts {
  channel;
  html;
  state;

  constructor(channel, { selectedFonts, availableFonts }) {
    console.log("init!");
    this.channel = channel;
    this.html = {
      targetFont: new TargetFont(selectedFonts),
      replaceFont: new ReplaceFont(),
    };
    this.emit({
      selectedFonts,
      availableFonts,
    });
  }

  emit(state) {
    if (this.state === state) return;
    this.state = state;
    this.render();
  }

  render() {
    this.html.targetFont.init(this.state.selectedFonts);
  }
}
