import { ICore } from '@core/Core';
import { INodeList } from '@core/node/NodeList';
import { ISystem, System } from '@core/system/System';
import { Bind } from '@core/utils/bind';

import { GameStateNode } from 'nodes/GameStateNode';

export interface IGameStateSystem extends ISystem {
}

@Bind()
export class GameStateSystem extends System implements IGameStateSystem {
  private gameState!: INodeList | null;

  public init(ctx: ICore): void {
    this.gameState = ctx.getNodeList(GameStateNode);
  }

  public destroy(ctx: ICore): void {
    this.gameState = null;
  }
}
