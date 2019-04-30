import { INode, Node } from '@core/node/Node';
import { Bind } from '@core/utils/bind';
import { Define } from '@core/utils/define';

import { GameState, IGameState } from 'components/GameState';

export interface IGameStateNode extends INode {
  gameState: IGameState;
}

@Bind()
export class GameStateNode extends Node implements IGameStateNode {
  @Define(GameState)
  public readonly gameState!: IGameState;
}
