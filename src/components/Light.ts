import { Components, IComponents } from '@core/components/Components';
import { Bind } from '@core/utils/bind';

import { ILightView } from 'graphics/LightView';

export interface ILight extends IComponents {
  lightView: ILightView;
}

@Bind()
export class Light extends Components implements ILight {
  public readonly displayName: string = 'lightComponent';

  constructor(
    public readonly lightView: ILightView,
  ) {
    super();
  }
}
