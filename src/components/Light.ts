import { Bind, Components, IComponents } from 'f-ecs';

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
