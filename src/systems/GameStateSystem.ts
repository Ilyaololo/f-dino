import { ICore } from '@core/Core';
import { INodeList } from '@core/node/NodeList';
import { ISystem, System } from '@core/system/System';
import { Bind } from '@core/utils/bind';

import { GameStateNode, IGameStateNode } from 'nodes/GameStateNode';

export interface IGameStateSystem extends ISystem {
}

@Bind()
export class GameStateSystem extends System implements IGameStateSystem {
  private gameStateNodeList: INodeList<IGameStateNode> | null = null;

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
}
