import { INode, Node } from '@core/node/Node';
import { Bind } from '@core/utils/bind';
import { Define } from '@core/utils/define';

import { IPlayer, Player } from 'components/Player';

export interface IPlayerNode extends INode {
  player: IPlayer;
}

@Bind()
export class PlayerNode extends Node implements IPlayerNode {
  @Define(Player)
  public readonly player!: IPlayer;
}
