export class InvalidFrameNameException extends Error {
  node: SceneNode;
  constructor(node: SceneNode) {
    super();
    this.node = node;
  }
}
