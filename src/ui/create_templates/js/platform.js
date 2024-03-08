export default class Platform {
  html = {
    container: document.getElementById("platformContainer"),
    android: document.getElementById("platformAndroid"),
    ios: document.getElementById("platformIos"),
  };

  android = "Android";
  ios = "iOS";

  state;
  emit(state) {
    if (this.state === state) return;
    this.state = state;
    this.render();
  }

  constructor(platform, onPlatformChanged) {
    this.emit({
      platform,
    });

    this.html.container.addEventListener("click", (event) => {
      if (event.target.type === "radio" && event.target.checked)
        this.emit({
          ...this.state,
          platform: event.target.value,
        });
      onPlatformChanged(this.state.platform);
    });
  }

  render() {
    const isAndroid = this.state.platform === this.android;
    this.html.android.checked = isAndroid;
    this.html.ios.checked = !isAndroid;
  }
}
