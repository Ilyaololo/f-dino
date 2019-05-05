import { INode, Node } from '@core/node/Node';
import { Bind } from '@core/utils/bind';
import { Define } from '@core/utils/define';

import { IScene, Scene } from 'components/Scene';

export interface ISceneNode extends INode {
  scene: IScene;
}

@Bind()
export class SceneNode extends Node implements ISceneNode {
  @Define(Scene)
  public readonly scene!: IScene;
}
