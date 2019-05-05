import 'core-js';
import 'reflect-metadata';

import { Container } from 'inversify';

import { configureService } from 'services';

import { Core, ICore } from '@core/Core';
import { Entity } from '@core/entity/Entity';
import { Bind } from '@core/utils/bind';

import { Camera } from 'components/Camera';
import { Collision } from 'components/Collision';
import { Dino } from 'components/Dino';
import { GameState } from 'components/GameState';
import { Light } from 'components/Light';
import { Maze } from 'components/Maze';
import { Motion } from 'components/Motion';
import { Renderer } from 'components/Renderer';
import { Scene } from 'components/Scene';
import { Sound } from 'components/Sound';

import { CameraView } from 'graphics/CameraView';
import { DinoView } from 'graphics/DinoView';
import { LightView } from 'graphics/LightView';
import { MazeView } from 'graphics/MazeView';
import { RendererView } from 'graphics/RendererView';
import { SceneView } from 'graphics/SceneView';

import { CameraSystem } from 'systems/CameraSystem';
import { CollisionSystem } from 'systems/CollisionSystem';
import { DinoSystem } from 'systems/DinoSystem';
import { GameStateSystem } from 'systems/GameStateSystem';
import { LightSystem } from 'systems/LightSystem';
import { MazeSystem } from 'systems/MazeSystem';
import { MotionSystem } from 'systems/MotionSystem';
import { RendererSystem } from 'systems/RendererSystem';
import { SceneSystem } from 'systems/SceneSystem';
import { SoundSystem } from 'systems/SoundSystem';

interface IWorkbench {
  load(): void;
  render(time: number): void;
}

@Bind()
class Workbench implements IWorkbench {
  /**
   * Core reference.
   */
  private readonly core: ICore;

  /**
   * DI container reference.
   */
  private readonly container: Container;

  constructor() {
    this.container = configureService();

    this.core = new Core();
  }

  /**
   * Configure ECS Systems.
   */
  private appendSystem(): void {
    this.core.appendSystem(new SceneSystem());

    this.core.appendSystem(new CameraSystem());

    this.core.appendSystem(new LightSystem());

    this.core.appendSystem(new GameStateSystem());

    this.core.appendSystem(new CollisionSystem());

    this.core.appendSystem(new SoundSystem());

    this.core.appendSystem(new MotionSystem());

    this.core.appendSystem(new MazeSystem());

    this.core.appendSystem(new DinoSystem());

    this.core.appendSystem(new RendererSystem());
  }

  /**
   * Configure ECS Entity.
   */
  private appendEntity(): void {
    const gameEntity = new Entity('game');

    gameEntity.set(new Scene(
      new SceneView(),
    ));

    gameEntity.set(new Camera(
      new CameraView(),
    ));

    gameEntity.set(new Light(
      new LightView(),
    ));

    gameEntity.set(new GameState());

    gameEntity.set(new Collision());

    gameEntity.set(new Sound());

    gameEntity.set(new Motion());

    gameEntity.set(new Maze(
      new MazeView(),
    ));

    gameEntity.set(new Renderer(
      new RendererView(),
    ));

    this.core.appendEntity(gameEntity);

    const dinoEntity = new Entity('dino');

    dinoEntity.set(new Dino(
      new DinoView(),
    ));

    this.core.appendEntity(dinoEntity);
  }

  public load(): void {
    this.appendEntity();
    this.appendSystem();

    this.render(0);
  }

  /**
   * Main loop.
   */
  public render(time: number): void {
    this.core.update(time);

    requestAnimationFrame(this.render);
  }
}

const workbench: IWorkbench = new Workbench();

document.addEventListener('DOMContentLoaded', workbench.load, {
  passive: false,
});
