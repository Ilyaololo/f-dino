import { EventEmitter } from '@core/event/EventEmitter';
import { INode } from '@core/node/Node';
import { Bind } from '@core/utils/bind';

import * as CONSTANTS from '@core/constants';

export interface INodeList extends EventEmitter {
  head: INode | null;
  tail: INode | null;
  [Symbol.iterator](): Iterator<INode>;
  clear(): void;
  delete(node: INode): void;
  forEach(cb: (node: INode) => void): void;
  set(node: INode): void;
}

@Bind()
export class NodeList extends EventEmitter implements INodeList {
  /**
   * Reference on the first item in the node list, or null if the list contains no nodes.
   */
  public head: INode | null = null;

  /**
   * Reference on the last item in the node list, or null if the list contains no nodes.
   */
  public tail: INode | null = null;

  /**
   * Iterable method.
   */
  public [Symbol.iterator](): Iterator<INode> & { __value: INode } {
    const itr: any = {};

    // initial loop value
    itr.__value = this.head;

    itr.next = () => {
      if (!itr.__value) {
        return {
          done: true,
          value: null,
        };
      }

      const value = itr.__value;

      // mutate loop value
      itr.__value = value.next;

      return {
        done: !value,
        value,
      };
    };

    return itr;
  }

  /**
   * Remove a node from the node list.
   */
  public delete(node: INode): void {
    if (this.head === node) {
      this.head = this.head.next;
    }

    if (this.tail === node) {
      this.tail = this.tail.previous;
    }

    if (node.previous) {
      node.previous.next = node.next;
    }

    if (node.next) {
      node.next.previous = node.previous;
    }

    this.emit(CONSTANTS.NODE_LIST_DELETE_NODE_EVENT, node);
  }

  /**
   * Add a node to the node list.
   */
  public set(node: INode): void {
    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;

      node.next = null;
      node.previous = null;
    } else {
      this.tail.next = node;

      node.previous = this.tail;
      node.next = null;

      this.tail = node;
    }

    this.emit(CONSTANTS.NODE_LIST_SET_NODE_EVENT, node);
  }

  /**
   * Performs the specified action for each element in an node list.
   */
  public forEach(cb: (node: INode) => void): void {
    for (const node of this) {
      cb(node);
    }
  }

  /**
   * Remove all node from the node list.
   */
  public clear(): void {
    for (const node of this) {
      node.previous = null;
      node.next = null;

      this.emit(CONSTANTS.NODE_LIST_DELETE_NODE_EVENT, node);
    }
  }
}
