import { ICore } from '@core/Core';
import { INodeList } from '@core/node/NodeList';
import { ISystem, System } from '@core/system/System';
import { Bind } from '@core/utils/bind';

import { IMotionNode, MotionNode } from 'nodes/MotionNode';

export interface IMotionSystem extends ISystem {
}

@Bind()
export class MotionSystem extends System implements IMotionSystem {
  private motionNodeList: INodeList<IMotionNode> | null = null;

  /**
   * @override
   */
  public start(core: ICore): void {
    this.motionNodeList = core.getNodeList<IMotionNode>(MotionNode);
  }

  /**
   * @override
   */
  public destroy(core: ICore): void {
    this.motionNodeList = null;
  }

  /**
   * @override
   */
  public update(time: number): void {
    if (this.motionNodeList) {
      this.motionNodeList.forEach((node) => {
        //
      });
    }
  }
}
