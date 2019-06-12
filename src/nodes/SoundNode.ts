import { Bind, Define, INode, Node } from 'f-ecs';

import { ISound, Sound } from 'components/Sound';

export interface ISoundNode extends INode {
  soundComponent: ISound;
}

@Bind()
export class SoundNode extends Node implements ISoundNode {
  @Define(Sound)
  public readonly soundComponent!: ISound;
}
