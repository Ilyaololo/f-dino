import { ICore } from '@core/Core';
import { INodeList } from '@core/node/NodeList';
import { ISystem, System } from '@core/system/System';
import { Bind } from '@core/utils/bind';

import { IPlayerNode, PlayerNode } from 'nodes/PlayerNode';

export interface IMovePlayerSystem extends ISystem {
}

@Bind()
export class MovePlayerSystem extends System implements IMovePlayerSystem {
  private playerNodeList: INodeList<IPlayerNode> | null = null;

  /**
   * @override
   */
  public start(core: ICore): void {
    this.playerNodeList = core.getNodeList<IPlayerNode>(PlayerNode);
  }

  /**
   * @override
   */
  public destroy(core: ICore): void {
    this.playerNodeList = null;
  }

  /**
   * @override
   */
  public update(time: number): void {
    //
  }
}
