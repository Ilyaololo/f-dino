import { Bind, Define, INode, Node } from 'f-ecs';

import { IPlayer, Player } from 'components/Player';

export interface IPlayerNode extends INode {
  playerComponent: IPlayer;
}

@Bind()
export class PlayerNode extends Node implements IPlayerNode {
  @Define(Player)
  public readonly playerComponent!: IPlayer;
}
