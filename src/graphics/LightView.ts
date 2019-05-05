import { DirectionalLight, Scene } from 'three';

import { Bind } from '@core/utils/bind';

export interface ILightView {
  start(scene: Scene): void;
}

@Bind()
export class LightView implements ILightView {
  private scene!: Scene;

  public start(scene: Scene): void {
    this.scene = scene;

    const primary = new DirectionalLight(0xffffff);
    primary.position.set(1, 1, 1);

    this.scene.add(primary);

    const secondary = new DirectionalLight(0xffffff, 0.4);
    secondary.position.set(1, -1, -1);

    this.scene.add(secondary);
  }
}
