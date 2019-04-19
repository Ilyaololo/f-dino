import { Components, IComponents } from '@core/components/Components';
import { Bind } from '@core/utils/bind';

export interface IMotion extends IComponents {
}

@Bind()
export class Motion extends Components implements IMotion {
  public readonly displayName: string = 'motion';
}
