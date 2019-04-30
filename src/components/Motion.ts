import { Components, IComponents } from '@core/components/Components';
import { Bind } from '@core/utils/bind';

export interface IMotion extends IComponents {
  velocity: number;
}

@Bind()
export class Motion extends Components implements IMotion {
  public readonly displayName: string = 'motion';

  /**
   * Reference.
   */
  public velocity!: number;
}
