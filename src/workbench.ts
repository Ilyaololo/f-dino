import { Container } from 'inversify';

import { configureService } from 'services';

import { Core, ICore } from '@core/Core';
import { Bind } from '@core/utils/bind';

import { EntityManager, IEntityManager } from 'entity';

import { CollisionSystem } from 'systems/CollisionSystem';
import { GameManagerSystem } from 'systems/GameManagerSystem';
import { MovePlayerSystem } from 'systems/MovePlayerSystem';
import { RendererSystem } from 'systems/RendererSystem';
import { SoundSystem } from 'systems/SoundSystem';
import { UserInputSystem } from 'systems/UserInputSystem';
import { WaitingSystem } from 'systems/WaitingSystem';

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
   * Entity manager reference.
   */
  private readonly entities: IEntityManager;

  /**
   * DI container reference.
   */
  private readonly container: Container;

  constructor() {
    this.container = configureService();
    this.core = new Core();
    this.entities = new EntityManager(this.core);
  }

  /**
   * Configure ECS Systems.
   */
  private appendSystem(): void {
    this.entities.createGameEntity();
    this.entities.createMazeEntity();

    this.core.appendSystem(new GameManagerSystem(this.entities));
    this.core.appendSystem(new SoundSystem());
    this.core.appendSystem(new WaitingSystem());

    this.core.appendSystem(new CollisionSystem());
    this.core.appendSystem(new MovePlayerSystem());
    this.core.appendSystem(new UserInputSystem());

    this.core.appendSystem(new RendererSystem());
  }

  /**
   * Load entities and systems.
   */
  public prepare(): void {
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
