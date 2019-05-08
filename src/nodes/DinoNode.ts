import { INode, Node } from '@core/node/Node';
import { Bind } from '@core/utils/bind';
import { Define } from '@core/utils/define';

import { Dino, IDino } from 'components/Dino';

export interface IDinoNode extends INode {
  dinoComponent: IDino;
}

@Bind()
export class DinoNode extends Node implements IDinoNode {
  @Define(Dino)
  public readonly dinoComponent!: IDino;
}
