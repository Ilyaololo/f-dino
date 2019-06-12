import { injectable as Injectable } from 'inversify';

import { Bind, ICore, INodeList, ISystem, System } from 'f-ecs';

import { CollisionNode, ICollisionNode } from 'nodes/CollisionNode';

export interface ICollisionSystem extends ISystem {
}

@Bind()
@Injectable()
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
  public destroy(): void {
    this.collisionNodeList = null;
  }
}
