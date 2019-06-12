import { injectable as Injectable } from 'inversify';

import { Bind, ICore, INodeList, ISystem, System } from 'f-ecs';

import { IEntityManager } from 'services/entity/common/entity';

import { GameStateNode, IGameStateNode } from 'nodes/GameStateNode';

export interface IGameManagerSystem extends ISystem {
}

@Bind()
@Injectable()
export class GameManagerSystem extends System implements IGameManagerSystem {
  private gameStateNodeList: INodeList<IGameStateNode> | null = null;

  constructor(
    @IEntityManager private readonly entityManager: IEntityManager,
  ) {
    super();
  }

  /**
   * @override
   */
  public start(core: ICore): void {
    this.gameStateNodeList = core.getNodeList<IGameStateNode>(GameStateNode);

    this.entityManager.createGameEntity();
    this.entityManager.createMazeEntity();

    this.entityManager.createDinoEntity();
  }

  /**
   * @override
   */
  public destroy(): void {
    this.gameStateNodeList = null;
  }

  /**
   * @override
   */
  public update(): void {
    if (this.gameStateNodeList && this.gameStateNodeList.head) {
      const { gameStateComponent } = this.gameStateNodeList.head;

      // if (gameStateComponent.playing) {
      //   if (!gameStateComponent.initialized) {
      //     this.entityManager.createDinoEntity();
      //     this.entityManager.createPlayerEntity();
      //
      //     gameStateComponent.initialized = true;
      //   }
      // }
    }
  }
}
