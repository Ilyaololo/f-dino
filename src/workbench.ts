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
import { Player } from 'components/Player';
import { Renderer } from 'components/Renderer';
import { Scene } from 'components/Scene';
import { Sound } from 'components/Sound';

import { CameraView } from 'graphics/CameraView';
import { DinoView } from 'graphics/DinoView';
import { LightView } from 'graphics/LightView';
import { MazeView } from 'graphics/MazeView';
import { PlayerView } from 'graphics/PlayerView';
import { RendererView } from 'graphics/RendererView';
import { SceneView } from 'graphics/SceneView';

import { CameraSystem } from 'systems/CameraSystem';
import { CollisionSystem } from 'systems/CollisionSystem';
import { DinoSystem } from 'systems/DinoSystem';
import { GameStateSystem } from 'systems/GameStateSystem';
import { LightSystem } from 'systems/LightSystem';
import { MazeSystem } from 'systems/MazeSystem';
import { PlayerSystem } from 'systems/PlayerSystem';
import { RendererSystem } from 'systems/RendererSystem';
import { SceneSystem } from 'systems/SceneSystem';
import { SoundSystem } from 'systems/SoundSystem';

export interface IWorkbench {
  prepare(): void;
  render(time: number): void;
}

@Bind()
export class Workbench implements IWorkbench {
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
    // Primary systems.
    this.core.appendSystem(new SceneSystem());
    this.core.appendSystem(new CameraSystem());
    this.core.appendSystem(new LightSystem());

    // Secondary systems.
    this.core.appendSystem(new GameStateSystem());
    this.core.appendSystem(new CollisionSystem());
    this.core.appendSystem(new SoundSystem());

    // Game systems.
    this.core.appendSystem(new MazeSystem());
    this.core.appendSystem(new DinoSystem());
    this.core.appendSystem(new PlayerSystem());

    // Render system.
    this.core.appendSystem(new RendererSystem());
  }

  /**
   * Configure ECS Entity.
   */
  private appendEntity(): void {
    //#region Game entity.

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

    gameEntity.set(new Player(
      new PlayerView(),
    ));

    gameEntity.set(new Maze(
      new MazeView(),
    ));

    gameEntity.set(new Renderer(
      new RendererView(),
    ));

    this.core.appendEntity(gameEntity);

    //#endregion

    //#region Dino entity.

    const dinoEntity = new Entity('dino');

    dinoEntity.set(new Dino(
      new DinoView(),
    ));

    this.core.appendEntity(dinoEntity);

    //#endregion
  }

  /**
   * Load entities and systems.
   */
  public prepare(): void {
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
