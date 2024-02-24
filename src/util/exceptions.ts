export class InvalidFrameNameException extends Error {
  node: SceneNode;
  constructor(node: SceneNode) {
    super();
    this.node = node;
  }
}

export class InvalidArgument extends Error {
  constructor(message: string) {
    super(message);
  }
}
