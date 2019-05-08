import { Components, IComponents } from '@core/components/Components';
import { Bind } from '@core/utils/bind';

import { ICameraView } from 'graphics/CameraView';

export interface ICamera extends IComponents {
  cameraView: ICameraView;
}

@Bind()
export class Camera extends Components implements ICamera {
  public readonly displayName: string = 'cameraComponent';

  constructor(
    public readonly cameraView: ICameraView,
  ) {
    super();
  }
}
