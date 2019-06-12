import { Bind, Define, INode, Node } from 'f-ecs';

import { Collision, ICollision } from 'components/Collision';

export interface ICollisionNode extends INode {
  collisionComponent: ICollision;
}

@Bind()
export class CollisionNode extends Node implements ICollisionNode {
  @Define(Collision)
  public readonly collisionComponent!: ICollision;
}
