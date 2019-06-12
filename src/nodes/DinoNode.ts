import { Bind, Define, INode, Node } from 'f-ecs';

import { Dino, IDino } from 'components/Dino';

export interface IDinoNode extends INode {
  dinoComponent: IDino;
}

@Bind()
export class DinoNode extends Node implements IDinoNode {
  @Define(Dino)
  public readonly dinoComponent!: IDino;
}
