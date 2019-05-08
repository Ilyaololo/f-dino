import { INode, Node } from '@core/node/Node';
import { Bind } from '@core/utils/bind';
import { Define } from '@core/utils/define';

import { IWaiting, Waiting } from 'components/Waiting';

export interface IWaitingNode extends INode {
  waitingComponent: IWaiting;
}

@Bind()
export class WaitingNode extends Node implements IWaitingNode {
  @Define(Waiting)
  public readonly waitingComponent!: IWaiting;
}
