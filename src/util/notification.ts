export class Notification {
  static i(
    text: string,
    optional?: {
      button?: { text: string; action: () => boolean | void };
    }
  ) {
    figma.notify(text, { button: optional?.button });
  }

  static e(
    text: string,
    optional?: {
      button?: { text: string; action: () => boolean | void };
    }
  ) {
    figma.notify(text, { error: true, button: optional?.button });
  }
}
