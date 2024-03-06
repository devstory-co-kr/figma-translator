export default class Platform {
  html = {
    container: document.getElementById("platformContainer"),
    android: document.getElementById("platformAndroid"),
    ios: document.getElementById("platformIos"),
  };

  android = "Android";
  ios = "iOS";

  _state;
  get state() {
    return this._state;
  }
  set state(value) {
    this._state = value;
    this.render();
  }

  constructor(platform, onPlatformChanged) {
    this.state = {
      platform,
    };

    this.html.container.addEventListener("click", (event) => {
      if (event.target.type === "radio" && event.target.checked)
        this.state = {
          ...this.state,
          platform: event.target.value,
        };
      onPlatformChanged(this.state.platform);
    });
  }

  render() {
    const isAndroid = this.state.platform === this.android;
    this.html.android.checked = isAndroid;
    this.html.ios.checked = !isAndroid;
  }
}
