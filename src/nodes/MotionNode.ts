import { INode, Node } from '@core/node/Node';
import { Bind } from '@core/utils/bind';
import { Define } from '@core/utils/define';

import { IMotion, Motion } from 'components/Motion';

export interface IMotionNode extends INode {
}

@Bind()
export class MotionNode extends Node implements IMotionNode {
  @Define(Motion)
  public readonly motion!: IMotion;
}
