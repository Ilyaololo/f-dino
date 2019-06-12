import { Bind, Define, INode, Node } from 'f-ecs';

import { IScene, Scene } from 'components/Scene';

export interface ISceneNode extends INode {
  sceneComponent: IScene;
}

@Bind()
export class SceneNode extends Node implements ISceneNode {
  @Define(Scene)
  public readonly sceneComponent!: IScene;
}
