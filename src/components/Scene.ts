import { Components, IComponents } from '@core/components/Components';
import { Bind } from '@core/utils/bind';

import { ISceneView } from 'graphics/SceneView';

export interface IScene extends IComponents {
  sceneView: ISceneView;
}

@Bind()
export class Scene extends Components implements IScene {
  public readonly displayName: string = 'scene';

  constructor(
    public readonly sceneView: ISceneView,
  ) {
    super();
  }
}
