import { FileLoader, ObjectLoader, Scene } from 'three';

import { Bind } from '@core/utils/bind';
import { deg } from '@core/utils/deg';

import { DINOSCALE } from 'configs';

export interface IDinoView {
}

@Bind()
export class DinoView implements IDinoView {
  constructor(
    private readonly scene: Scene,
  ) {
    // this.geometry = payload.geometry;
    // this.materials = payload.materials;
    //
    // const dino = new Mesh(this.geometry, this.materials);
    //
    // // Scale the size of the dino
    // dino.scale.set(DINOSCALE, DINOSCALE, DINOSCALE);
    // dino.rotation.y = deg(90);
    // dino.position.set(30, 0, -400);
    // dino.name = 'model';
    //
    // this.scene.add(dino);
  }
}
