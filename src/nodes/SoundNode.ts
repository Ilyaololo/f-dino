import { INode, Node } from '@core/node/Node';
import { Bind } from '@core/utils/bind';
import { Define } from '@core/utils/define';

import { ISound, Sound } from 'components/Sound';

export interface ISoundNode extends INode {
  soundComponent: ISound;
}

@Bind()
export class SoundNode extends Node implements ISoundNode {
  @Define(Sound)
  public readonly soundComponent!: ISound;
}
