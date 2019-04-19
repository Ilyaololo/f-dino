import { Components, IComponents } from '@core/components/Components';
import { Bind } from '@core/utils/bind';

export interface IAudio extends IComponents {
}

@Bind()
export class Audio extends Components implements IAudio {
  public readonly displayName: string = 'audio';
}
