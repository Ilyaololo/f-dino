import { injectable as Injectable } from 'inversify';

import { ICore } from '@core/Core';
import { INodeList } from '@core/node/NodeList';
import { ISystem, System } from '@core/system/System';
import { Bind } from '@core/utils/bind';

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
  public destroy(core: ICore): void {
    this.soundNodeList = null;
  }
}
