import { ICore } from '@core/Core';
import { INodeList } from '@core/node/NodeList';
import { ISystem, System } from '@core/system/System';
import { Bind } from '@core/utils/bind';

import { IPlayerNode, PlayerNode } from 'nodes/PlayerNode';

export interface IPlayerSystem extends ISystem {
}

@Bind()
export class PlayerSystem extends System implements IPlayerSystem {
  private playerNodeList: INodeList<IPlayerNode> | null = null;

  /**
   * @override
   */
  public start(core: ICore): void {
    this.playerNodeList = core.getNodeList<IPlayerNode>(PlayerNode);

    if (this.playerNodeList && this.playerNodeList.head) {
      this.playerNodeList.head.player.playerView.start();
    }
  }

  /**
   * @override
   */
  public destroy(core: ICore): void {
    if (this.playerNodeList && this.playerNodeList.head) {
      this.playerNodeList.head.player.playerView.destroy();
    }

    this.playerNodeList = null;
  }

  /**
   * @override
   */
  public update(time: number): void {
    if (this.playerNodeList && this.playerNodeList.head) {
      this.playerNodeList.head.player.playerView.update();
    }
  }
}
