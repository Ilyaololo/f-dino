import { PerspectiveCamera } from 'three';

import { Bind } from '@core/utils/bind';

export interface ICameraView {
  camera: PerspectiveCamera;
}

@Bind()
export class CameraView implements ICameraView {
  public readonly camera: PerspectiveCamera;

  constructor() {
    const aspect = window.innerWidth / window.innerHeight;
    const far = 2000;
    const fov = 60;
    const near = 1;

    this.camera = new PerspectiveCamera(fov, aspect, near, far);

    this.camera.position.y = 20;
    this.camera.position.x = 0;
    this.camera.position.z = 0;
  }
}
