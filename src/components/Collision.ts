import { Bind, Components, IComponents } from 'f-ecs';

export interface ICollision extends IComponents {
}

@Bind()
export class Collision extends Components implements ICollision {
  public readonly displayName: string = 'collisionComponent';
}
