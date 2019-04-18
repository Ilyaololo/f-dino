import { IComponents } from '@core/components/Components';
import { INode, Node } from '@core/node/Node';
import { Bind } from '@core/utils/bind';

export interface INodePool {
  get(): INode;
  dispose(node: INode): void;
}

@Bind()
export class NodePool implements INodePool {
  /**
   * Reference on the last item in the node list, or null if the list contains no nodes.
   */
  private tail: INode | null = null;

  constructor(
    private readonly node: typeof Node,
    private readonly components: Map<string, IComponents>,
  ) {
  }

  /**
   * Fetches a node from the pool.
   */
  public get(): INode {
    if (this.tail) {
      const node = this.tail;

      this.tail = this.tail.previous;
      node.previous = null;

      return node;
    }

    return new this.node();
  }

  /**
   * Adds a node to the pool.
   */
  public dispose(node: INode): void {
    for (const component of this.components) {
      const key = component[0];
      const value = component[1];

      node[String(value)] = null;
    }

    node.entity = null;
    node.next = null;
    node.previous = null;

    this.tail = node;
  }
}
