import { ICore } from '@core/Core';
import { INodeList } from '@core/node/NodeList';
import { ISystem, System } from '@core/system/System';
import { Bind } from '@core/utils/bind';

import { AudioNode, IAudioNode } from 'nodes/AudioNode';

export interface IAudioSystem extends ISystem {
}

@Bind()
export class AudioSystem extends System implements IAudioSystem {
  private audio!: INodeList<IAudioNode> | null;

  /**
   * @override
   */
  public start(core: ICore): void {
    this.audio = core.getNodeList<IAudioNode>(AudioNode);
  }

  /**
   * @override
   */
  public destroy(core: ICore): void {
    this.audio = null;
  }
}
