import * as THREE from 'three';

import { Bind } from '@core/utils/bind';
import { deg } from '@core/utils/deg';

import { UNITHEIGHT, UNITWIDTH } from 'configs';

export interface IMazeView {
}

@Bind()
export class MazeView implements IMazeView {
  constructor(
    private readonly scene: THREE.Scene,
  ) {
    const map = [
      [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0],
      [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
    ];

    const geometry = new THREE.BoxGeometry(UNITWIDTH, UNITHEIGHT, UNITWIDTH);
    const material = new THREE.MeshPhongMaterial({
      color: 0x81cfe0,
    });

    // Keep cubes within boundry walls
    const widthOffset = UNITWIDTH / 2;
    // Put the bottom of the cube at y = 0
    const heightOffset = UNITHEIGHT / 2;

    const totalCubesWide = map[0].length;

    // tslint:disable-next-line:no-increment-decrement
    for (let i = 0; i < totalCubesWide; i++) {
      // tslint:disable-next-line:no-increment-decrement
      for (let j = 0; j < map[i].length; j++) {
        // If a 1 is found, add a cube at the corresponding position
        if (map[i][j]) {
          // Make the cube
          const cube = new THREE.Mesh(geometry, material);
          // Set the cube position
          cube.position.z = (i - totalCubesWide / 2) * UNITWIDTH + widthOffset;
          cube.position.y = heightOffset;
          cube.position.x = (j - totalCubesWide / 2) * UNITWIDTH + widthOffset;
          // Add the cube
          this.scene.add(cube);
          // Used later for collision detection
          // collidableObjects.push(cube);
        }
      }
    }
    // Create the ground based on the map size the matrix/cube size produced
    const mapSize = totalCubesWide * UNITWIDTH;

    // Create the ground geometry and material
    const groundGeo = new THREE.PlaneGeometry(mapSize, mapSize);
    const groundMat = new THREE.MeshPhongMaterial({
      color: 0xA0522D,
      side: THREE.DoubleSide,
      // shading: THREE.FlatShading,
    });

    // Create the ground and rotate it flat
    const ground = new THREE.Mesh(groundGeo, groundMat);

    ground.position.set(0, 1, 0);
    ground.rotation.x = deg(90);

    this.scene.add(ground);
  }
}
