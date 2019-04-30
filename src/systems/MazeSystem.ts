import { ICore } from '@core/Core';
import { INodeList } from '@core/node/NodeList';
import { ISystem, System } from '@core/system/System';
import { Bind } from '@core/utils/bind';

import { IMazeNode, MazeNode } from 'nodes/MazeNode';

export interface IMazeSystem extends ISystem {
}

@Bind()
export class MazeSystem extends System implements IMazeSystem {
  private maze!: INodeList<IMazeNode> | null;

  /**
   * @override
   */
  public start(core: ICore): void {
    this.maze = core.getNodeList<IMazeNode>(MazeNode);
  }

  /**
   * @override
   */
  public destroy(core: ICore): void {
    this.maze = null;
  }
}
