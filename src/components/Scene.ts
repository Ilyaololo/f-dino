import { Bind, Components, IComponents } from 'f-ecs';

import { ISceneView } from 'graphics/SceneView';

export interface IScene extends IComponents {
  sceneView: ISceneView;
}

@Bind()
export class Scene extends Components implements IScene {
  public readonly displayName: string = 'sceneComponent';

  constructor(
    public readonly sceneView: ISceneView,
  ) {
    super();
  }
}
