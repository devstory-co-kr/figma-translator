export class Notification {
  private static handler: NotificationHandler | undefined;
  public static i(
    text: string,
    optional?: {
      button?: { text: string; action: () => boolean | void };
    }
  ) {
    Notification.handler?.cancel();
    Notification.handler = figma.notify(text, { button: optional?.button });
  }

  static e(
    text: string,
    optional?: {
      button?: { text: string; action: () => boolean | void };
    }
  ) {
    Notification.handler?.cancel();
    Notification.handler = figma.notify(text, {
      error: true,
      button: optional?.button,
    });
  }
}
