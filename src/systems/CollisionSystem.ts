import { ICore } from '@core/Core';
import { INodeList } from '@core/node/NodeList';
import { ISystem, System } from '@core/system/System';
import { Bind } from '@core/utils/bind';

import { CollisionNode } from 'nodes/CollisionNode';

export interface ICollisionSystem extends ISystem {
}

@Bind()
export class CollisionSystem extends System implements ICollisionSystem {
  private collision!: INodeList | null;

  public init(ctx: ICore): void {
    this.collision = ctx.getNodeList(CollisionNode);
  }

  public destroy(ctx: ICore): void {
    this.collision = null;
  }
}
