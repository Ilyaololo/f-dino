import { PerspectiveCamera, Scene } from 'three';

import { Bind } from '@core/utils/bind';

export interface ICameraView {
  camera: PerspectiveCamera;
  start(scene: Scene): void;
}

@Bind()
export class CameraView implements ICameraView {
  public camera!: PerspectiveCamera;

  private scene!: Scene;

  public start(scene: Scene): void {
    this.scene = scene;

    const aspect = window.innerWidth / window.innerHeight;
    const far = 2000;
    const fov = 60;
    const near = 1;

    this.camera = new PerspectiveCamera(fov, aspect, near, far);

    this.camera.position.y = 20;
    this.camera.position.x = 0;
    this.camera.position.z = 0;

    this.scene.add(this.camera);
  }
}
