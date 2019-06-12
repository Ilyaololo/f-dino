import { Bind, Define, INode, Node } from 'f-ecs';

import { IWaiting, Waiting } from 'components/Waiting';

export interface IWaitingNode extends INode {
  waitingComponent: IWaiting;
}

@Bind()
export class WaitingNode extends Node implements IWaitingNode {
  @Define(Waiting)
  public readonly waitingComponent!: IWaiting;
}
