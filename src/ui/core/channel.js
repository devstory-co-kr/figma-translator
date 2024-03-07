export default class Channel {
  html;
  types;

  constructor(html, types) {
    this.html = html;
    this.types = types;
  }

  onMessage(callback) {
    onmessage = (event) => {
      const msg = event.data.pluginMessage;
      const [type, data] = [msg.type, msg.data];
      callback(type, data);
    };
  }

  sendMessage(type, data) {
    parent.postMessage(
      { pluginMessage: { html: this.html, type, data } },
      "*"
    );
  }
}
