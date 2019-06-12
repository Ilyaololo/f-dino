import { Container } from 'inversify';

import { configureService } from 'services';

import { Bind, ICore, Core, System } from 'f-ecs';

import { CollisionSystem, ICollisionSystem } from 'systems/CollisionSystem';
import { GameManagerSystem, IGameManagerSystem } from 'systems/GameManagerSystem';
import { RenderSystem, IRenderSystem } from 'systems/RenderSystem';
import { SoundSystem, ISoundSystem } from 'systems/SoundSystem';
import { WaitingSystem, IWaitingSystem } from 'systems/WaitingSystem';

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

    this.core = this.container.get(Core);
  }

  /**
   * Configure ECS Systems.
   */
  private appendSystem(): void {
    this.core.appendSystem(() => {
      this.container.bind<IGameManagerSystem>(GameManagerSystem).toSelf();

      return this.container.get(GameManagerSystem);
    });

    this.core.appendSystem(() => {
      this.container.bind<ISoundSystem>(SoundSystem).toSelf();

      return this.container.get(SoundSystem);
    });

    this.core.appendSystem(() => {
      this.container.bind<IWaitingSystem>(WaitingSystem).toSelf();

      return this.container.get(WaitingSystem);
    });

    this.core.appendSystem(() => {
      this.container.bind<ICollisionSystem>(CollisionSystem).toSelf();

      return this.container.get(CollisionSystem);
    });

    this.core.appendSystem(() => {
      this.container.bind<IRenderSystem>(RenderSystem).toSelf();

      return this.container.get(RenderSystem);
    });
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
