import { Components, IComponents } from '@core/components/Components';
import { Bind } from '@core/utils/bind';

export interface ICollision extends IComponents {
}

@Bind()
export class Collision extends Components implements ICollision {
  public readonly displayName: string = 'collisionComponent';
}
