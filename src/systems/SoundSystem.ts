import { injectable as Injectable } from 'inversify';

import { Bind, ICore, INodeList, ISystem, System } from 'f-ecs';

import { ISoundNode, SoundNode } from 'nodes/SoundNode';

export interface ISoundSystem extends ISystem {
}

@Bind()
@Injectable()
export class SoundSystem extends System implements ISoundSystem {
  private soundNodeList: INodeList<ISoundNode> | null = null;

  /**
   * @override
   */
  public start(core: ICore): void {
    this.soundNodeList = core.getNodeList<ISoundNode>(SoundNode);
  }

  /**
   * @override
   */
  public destroy(): void {
    this.soundNodeList = null;
  }
}
