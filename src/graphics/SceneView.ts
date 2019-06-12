import { FogExp2, Scene } from 'three';

import { Bind } from 'f-ecs';

export interface ISceneView {
  scene: Scene;
}

@Bind()
export class SceneView implements ISceneView {
  public readonly scene!: Scene;

  constructor() {
    this.scene = new Scene();

    this.scene.fog = new FogExp2(0xcccccc, 0.0015);
  }
}
