import { Bind, Define, INode, Node } from 'f-ecs';

import { GameState, IGameState } from 'components/GameState';

export interface IGameStateNode extends INode {
  gameStateComponent: IGameState;
}

@Bind()
export class GameStateNode extends Node implements IGameStateNode {
  @Define(GameState)
  public readonly gameStateComponent!: IGameState;
}
