export class Strings {
  // A higher match rate returns a lower score, and if there is a mismatch, -1 is returned.
  public static search(text: string, pattern: string): number {
    if (text.length < pattern.length) {
      return -1;
    } else if (!pattern) {
      return 0;
    }

    let match = 0;
    let score = 0;
    const t = text.toLocaleLowerCase();
    const p = pattern.toLocaleLowerCase();

    for (let i = 0; i < t.length; i++) {
      if (t[i] === p[match]) {
        score = i - match;
        match++;
        if (match === p.length) {
          return score;
        }
      }
    }

    return -1;
  }
}
