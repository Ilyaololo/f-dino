import { FogExp2, Scene } from 'three';

import { Bind } from '@core/utils/bind';

export interface ISceneView {
  scene: Scene;
  start(): void;
}

@Bind()
export class SceneView implements ISceneView {
  public scene!: Scene;

  public start(): void {
    this.scene = new Scene();

    this.scene.fog = new FogExp2(0xcccccc, 0.0015);
  }
}
