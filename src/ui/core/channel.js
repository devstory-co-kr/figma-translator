export default class Channel {
  types;

  constructor(types) {
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
      { pluginMessage: { html: "createTemplates", type, data } },
      "*"
    );
  }
}
