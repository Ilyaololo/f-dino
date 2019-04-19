import { ICore } from '@core/Core';
import { INodeList } from '@core/node/NodeList';
import { ISystem, System } from '@core/system/System';
import { Bind } from '@core/utils/bind';

import { MotionNode } from 'nodes/MotionNode';

export interface IMotionSystem extends ISystem {
}

@Bind()
export class MotionSystem extends System implements IMotionSystem {
  private motion!: INodeList | null;

  /**
   * @override
   */
  public start(core: ICore): void {
    this.motion = core.getNodeList(MotionNode);
  }

  /**
   * @override
   */
  public destroy(core: ICore): void {
    this.motion = null;
  }

  /**
   * @override
   */
  public update(time: number): void {
    this.motion!.forEach((node) => {
      // console.log(node);
    });
  }
}
