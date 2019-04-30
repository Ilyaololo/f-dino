import { INode, Node } from '@core/node/Node';
import { Bind } from '@core/utils/bind';
import { Define } from '@core/utils/define';

import { Audio, IAudio } from 'components/Audio';

export interface IAudioNode extends INode {
  audio: IAudio;
}

@Bind()
export class AudioNode extends Node implements IAudioNode {
  @Define(Audio)
  public readonly audio!: IAudio;
}
