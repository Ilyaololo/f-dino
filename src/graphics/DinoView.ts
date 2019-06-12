import { Group, MeshPhongMaterial, DoubleSide } from 'three';
import { MaterialCreator, MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

import { Bind, deg } from 'f-ecs';

export interface IDinoView {
  dino: Group | null;
  load(): Promise<Group>;
}

@Bind()
export class DinoView implements IDinoView {
  private readonly objLoader: OBJLoader;

  public dino: Group | null;

  constructor() {
    this.dino = null;
    this.objLoader = new OBJLoader();
  }

  public load(): Promise<Group> {
    return new Promise((resolve, reject) => {
      const url = '/resources/models/obj/dino/dino.obj';

      const onLoad = (group: Group) => {
        this.dino = group;

        this.dino.position.set(0, 10, -100);
        this.dino.rotation.y = deg(0);
        this.dino.scale.set(
          Number(process.env.DINOSCALE),
          Number(process.env.DINOSCALE),
          Number(process.env.DINOSCALE),
        );

        resolve(this.dino);
      };

      const onProgress = () => {
      };

      const onError = (e: ErrorEvent) => {
        reject(e);
      };

      this.objLoader.load(url, onLoad, onProgress, onError);
    });
  }
}
