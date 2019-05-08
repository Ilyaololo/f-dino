import { ICore } from '@core/Core';
import { INodeList } from '@core/node/NodeList';
import { ISystem, System } from '@core/system/System';
import { Bind } from '@core/utils/bind';

import { IUserInputEventNode, UserInputEventNode } from 'nodes/UserInputEventNode';

export interface IUserInputSystem extends ISystem {
}

@Bind()
export class UserInputSystem extends System implements IUserInputSystem {
  private userInputEventNodeList: INodeList<IUserInputEventNode> | null = null;

  /**
   * @override
   */
  public start(core: ICore): void {
    this.userInputEventNodeList = core.getNodeList<IUserInputEventNode>(UserInputEventNode);
  }

  /**
   * @override
   */
  public destroy(core: ICore): void {
    this.userInputEventNodeList = null;
  }
}
