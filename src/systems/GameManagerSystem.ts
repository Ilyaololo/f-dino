import { ICore } from '@core/Core';
import { INodeList } from '@core/node/NodeList';
import { ISystem, System } from '@core/system/System';
import { Bind } from '@core/utils/bind';

import { IEntityManager } from 'entity';

import { GameStateNode, IGameStateNode } from 'nodes/GameStateNode';

export interface IGameManagerSystem extends ISystem {
}

@Bind()
export class GameManagerSystem extends System implements IGameManagerSystem {
  private gameStateNodeList: INodeList<IGameStateNode> | null = null;

  constructor(
    private readonly entities: IEntityManager,
  ) {
    super();
  }

  /**
   * @override
   */
  public start(core: ICore): void {
    this.gameStateNodeList = core.getNodeList<IGameStateNode>(GameStateNode);
  }

  /**
   * @override
   */
  public destroy(core: ICore): void {
    this.gameStateNodeList = null;
  }

  /**
   * @override
   */
  public update(time: number): void {
    if (this.gameStateNodeList && this.gameStateNodeList.head) {
      const gameStateNode = this.gameStateNodeList.head;

      if (gameStateNode.gameStateComponent.playing) {
        if (!gameStateNode.gameStateComponent.initialized) {
          this.entities.createDinoEntity();
          this.entities.createPlayerEntity();

          gameStateNode.gameStateComponent.initialized = true;
        }
      }
    }
  }
}
