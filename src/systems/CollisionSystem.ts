import { ICore } from '@core/Core';
import { INodeList } from '@core/node/NodeList';
import { ISystem, System } from '@core/system/System';
import { Bind } from '@core/utils/bind';

import { CollisionNode, ICollisionNode } from 'nodes/CollisionNode';

export interface ICollisionSystem extends ISystem {
}

@Bind()
export class CollisionSystem extends System implements ICollisionSystem {
  private collisionNodeList: INodeList<ICollisionNode> | null = null;

  /**
   * @override
   */
  public start(core: ICore): void {
    this.collisionNodeList = core.getNodeList<ICollisionNode>(CollisionNode);
  }

  /**
   * @override
   */
  public destroy(core: ICore): void {
    this.collisionNodeList = null;
  }
}
