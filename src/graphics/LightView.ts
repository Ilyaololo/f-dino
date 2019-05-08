import { DirectionalLight, Scene } from 'three';

import { Bind } from '@core/utils/bind';

export interface ILightView {
  primary: DirectionalLight;
  secondary: DirectionalLight;
}

@Bind()
export class LightView implements ILightView {
  public readonly primary: DirectionalLight;
  public readonly secondary: DirectionalLight;

  constructor() {
    this.primary = new DirectionalLight(0xffffff);
    this.primary.position.set(1, 1, 1);

    this.secondary = new DirectionalLight(0xffffff, 0.4);
    this.secondary.position.set(1, -1, -1);
  }
}
