import "../core/base.css";
import Channel from "../core/channel";
import "./index.css";
import ChangeButton from "./js/change_button";
import FocusButton from "./js/focus_button";
import ReplaceFont from "./js/replace_font";
import TargetFont from "./js/target_font";

window.addEventListener("DOMContentLoaded", () => {
  const channel = new Channel("changeFonts", {
    init: "init",
    focus: "focus",
    change: "change",
    deleteReplaceFontHistory: "deleteReplaceFontHistory",
    selectionChanged: "selectionChanged",
    replaceFontHistoryChanged: "replaceFontHistoryChanged",
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
          targets: data.targets,
        });
        break;
      case channel.types.replaceFontHistoryChanged:
        changeFonts.emit({
          ...changeFonts.state,
          replaceFontHistory: data.replaceFontHistory,
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

  constructor(
    channel,
    { targets, availableFonts, replaceFontHistory, replaceFont }
  ) {
    this.channel = channel;
    this.html = {
      targetFont: new TargetFont(targets, ({ targets }) => {
        this.emit({
          ...this.state,
          targets,
        });
      }),
      replaceFont: new ReplaceFont(
        availableFonts,
        replaceFont,
        replaceFontHistory,
        // onChanged
        ({ replaceFont }) => {
          this.emit({
            ...this.state,
            replaceFont,
          });
        },
        // onHistoryDeleteButtonPressed
        (replaceFont) => {
          this.channel.sendMessage(
            this.channel.types.deleteReplaceFontHistory,
            {
              replaceFont,
            }
          );
        }
      ),
      focusButton: new FocusButton(() => {
        this.channel.sendMessage(this.channel.types.focus, {
          targets: this.state.targets,
        });
      }),
      changeButton: new ChangeButton(() => {
        this.channel.sendMessage(this.channel.types.change, {
          targets: this.state.targets,
          replaceFont: this.state.replaceFont,
        });
      }),
    };
    this.emit({
      targets,
      availableFonts,
      replaceFontHistory,
      replaceFont,
    });
  }

  emit(state) {
    if (this.state === state) return;
    this.state = state;
    this.render();
  }

  render() {
    this.html.targetFont.init(this.state.targets);
    this.html.replaceFont.init(
      this.state.availableFonts,
      this.state.replaceFont,
      this.state.replaceFontHistory
    );
  }
}
