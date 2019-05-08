import { BoxGeometry, DoubleSide, Mesh, MeshPhongMaterial, PlaneGeometry, Scene } from 'three';

import { Bind } from '@core/utils/bind';
import { deg } from '@core/utils/deg';

import { UNITHEIGHT, UNITWIDTH } from 'configs';

export interface IMazeView {
  maze: Mesh[];
  ground: Mesh;
}

@Bind()
export class MazeView implements IMazeView {
  public readonly maze: Mesh[] = [];
  public readonly ground: Mesh;

  constructor() {
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

    const geometry = new BoxGeometry(UNITWIDTH, UNITHEIGHT, UNITWIDTH);
    const material = new MeshPhongMaterial({
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
          const cube = new Mesh(geometry, material);

          // Set the cube position
          cube.position.z = (i - totalCubesWide / 2) * UNITWIDTH + widthOffset;
          cube.position.y = heightOffset;
          cube.position.x = (j - totalCubesWide / 2) * UNITWIDTH + widthOffset;

          this.maze.push(cube);
        }
      }
    }
    // Create the ground based on the map size the matrix/cube size produced
    const mapSize = totalCubesWide * UNITWIDTH;

    // Create the ground geometry and material
    const groundGeo = new PlaneGeometry(mapSize, mapSize);
    const groundMat = new MeshPhongMaterial({
      color: 0xA0522D,
      side: DoubleSide,
    });

    // Create the ground and rotate it flat
    this.ground = new Mesh(groundGeo, groundMat);

    this.ground.position.set(0, 1, 0);
    this.ground.rotation.x = deg(90);
  }
}
