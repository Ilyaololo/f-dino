import 'core-js';
import 'reflect-metadata';

import * as THREE from 'three';

import { Container } from 'inversify';

import { configureService } from 'services';

import { Core, ICore } from '@core/Core';
import { Entity } from '@core/entity/Entity';
import { Bind } from '@core/utils/bind';

import { Audio } from 'components/Audio';
import { Collision } from 'components/Collision';
import { Dino } from 'components/Dino';
import { GameState } from 'components/GameState';
import { Maze } from 'components/Maze';
import { Motion } from 'components/Motion';

import { DinoView } from 'graphics/DinoView';
import { MazeView } from 'graphics/MazeView';

import { AudioSystem } from 'systems/AudioSystem';
import { CollisionSystem } from 'systems/CollisionSystem';
import { DinoSystem } from 'systems/DinoSystem';
import { GameStateSystem } from 'systems/GameStateSystem';
import { MazeSystem } from 'systems/MazeSystem';
import { MotionSystem } from 'systems/MotionSystem';

interface IWorkbench {
  render(time: number): void;
}

@Bind()
class Workbench implements IWorkbench {
  /**
   * Max height of workbench.
   */
  private static readonly MAX_HEIGHT: number = window.innerHeight;

  /**
   * Max width of workbench.
   */
  private static readonly MAX_WIDTH: number = window.innerWidth;

  /**
   * Core reference.
   */
  private readonly core: ICore;

  /**
   * DI container reference.
   */
  private readonly container: Container;

  /**
   * Scene perspective camera.
   */
  private readonly camera: THREE.PerspectiveCamera;

  /**
   * Scene WebGL renderer.
   */
  private readonly renderer: THREE.WebGLRenderer;

  /**
   * Scene reference.
   */
  private readonly scene: THREE.Scene;

  constructor() {
    this.container = configureService();

    this.renderer = new THREE.WebGLRenderer();
    this.scene = new THREE.Scene();

    this.core = new Core();

    this.scene.fog = new THREE.FogExp2(0xcccccc, 0.0015);

    const aspect = window.innerWidth / window.innerHeight;
    const far = 2000;
    const fov = 60;
    const near = 1;

    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    this.camera.position.y = 20;
    this.camera.position.x = 0;
    this.camera.position.z = 0;

    this.scene.add(this.camera);

    this.renderer.setClearColor(this.scene.fog.color);

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(Workbench.MAX_WIDTH, Workbench.MAX_HEIGHT);

    const ref = document.getElementById('container');
    if (!ref) {
      throw new Error('Can\'t find DOM element #container');
    }

    this.appendLight();

    this.appendSystem();
    this.appendEntity();

    ref.appendChild(this.renderer.domElement);

    window.addEventListener('resize', this.onResize);
  }

  /**
   * Configure ECS Systems.
   */
  private appendSystem(): void {
    this.core
      .appendSystem(new GameStateSystem())
      .appendSystem(new CollisionSystem())
      .appendSystem(new AudioSystem())
      .appendSystem(new MotionSystem())
      .appendSystem(new MazeSystem())
      .appendSystem(new DinoSystem());
  }

  /**
   * Configure ECS Entity.
   */
  private appendEntity(): void {
    //#region Game Entity.
    const gameEntity = new Entity('game');

    gameEntity
      .set(new GameState())
      .set(new Collision())
      .set(new Audio())
      .set(new Motion())
      .set(new Maze(
        new MazeView(this.scene),
      ));
    //#endregion

    //#region Dino Entity.
    const dinoEntity = new Entity('dino');

    dinoEntity
      .set(new Dino(
        new DinoView(this.scene),
      ));
    //#endregion

    this.core
      .appendEntity(gameEntity)
      .appendEntity(dinoEntity);
  }

  /**
   * Append light to the scene.
   */
  private appendLight(): void {
    const primary = new THREE.DirectionalLight(0xffffff);
    primary.position.set(1, 1, 1);
    this.scene.add(primary);

    const secondary = new THREE.DirectionalLight(0xffffff, 0.4);
    secondary.position.set(1, -1, -1);
    this.scene.add(secondary);
  }

  /**
   * Resize event handler.
   */
  private onResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  /**
   * Main loop.
   */
  public render(time: number): void {
    this.renderer.render(this.scene, this.camera);
    this.core.update(time);

    requestAnimationFrame(this.render);
  }
}

const workbench: IWorkbench = new Workbench();

workbench.render(0);
