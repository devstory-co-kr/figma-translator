import "./index.css";

window.addEventListener("DOMContentLoaded", () => {
  const targetLocalesContainer = document.getElementById(
    "targetLocalesContainer"
  );

  const msgType = {
    init: "init",
  };

  let targetLocales = [];
  onmessage = (event) => {
    const msg = event.data.pluginMessage;
    switch (msg.type) {
      case msgType.init:
        console.log("come", msg);
        targetLocales = msg.data.targetLocales;
        for (const l of targetLocales) {
          const item = `<div class="row" style="align-items: center">
            <input type="checkbox" value="${l.locale}" name="${l.locale}" id="${l.locale}" />
            <label for="${l.locale}" style="display: block; width: 100%; padding: 4px">${l.name} (${l.locale})</label>
          </div>`;
          targetLocalesContainer.insertAdjacentHTML("beforeend", item);
        }
        break;
    }
  };

  function sendMessage(type, data) {
    parent.postMessage(
      { pluginMessage: { html: "createTemplates", type, data } },
      "*"
    );
  }

  targetLocalesContainer.addEventListener("click", function (event) {
    console.log(event, event.target, event.target.id);
    // TODO : 클릭 이벤트 처리 구현 중
  });

  sendMessage(msgType.init);
});
