import { Components, IComponents } from '@core/components/Components';
import { Bind } from '@core/utils/bind';

export interface ISound extends IComponents {
}

@Bind()
export class Sound extends Components implements ISound {
  public readonly displayName: string = 'soundComponent';
}
