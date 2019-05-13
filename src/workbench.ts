import { Container } from 'inversify';

import { configureService } from 'services';

import { Core, ICore } from '@core/Core';
import { Bind } from '@core/utils/bind';

import { ENTITY_MANAGER, IEntityManager } from 'services/entity/common/entity';
import { EntityManager } from 'services/entity/web/entity';

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
   * DI container reference.
   */
  private readonly container: Container;

  constructor() {
    this.container = configureService();

    this.core = new Core(this.container);

    this.container.bind<IEntityManager>(ENTITY_MANAGER).toDynamicValue(() => {
      return new EntityManager(this.core);
    });
  }

  /**
   * Configure ECS Systems.
   */
  private appendSystem(): void {
    this.core.appendSystem(GameManagerSystem);
    this.core.appendSystem(SoundSystem);
    this.core.appendSystem(WaitingSystem);

    this.core.appendSystem(CollisionSystem);
    this.core.appendSystem(MovePlayerSystem);
    this.core.appendSystem(UserInputSystem);

    this.core.appendSystem(RendererSystem);
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
