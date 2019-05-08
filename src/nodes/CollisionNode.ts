import { INode, Node } from '@core/node/Node';
import { Bind } from '@core/utils/bind';
import { Define } from '@core/utils/define';

import { Collision, ICollision } from 'components/Collision';

export interface ICollisionNode extends INode {
  collisionComponent: ICollision;
}

@Bind()
export class CollisionNode extends Node implements ICollisionNode {
  @Define(Collision)
  public readonly collisionComponent!: ICollision;
}
