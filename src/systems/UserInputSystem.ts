import { injectable as Injectable } from 'inversify';

import { Bind, ICore, INodeList, ISystem, System } from 'f-ecs';

import { IMousetrap } from 'services/mousetrap/common/mousetrap';

import { IUserInputEventNode, UserInputEventNode } from 'nodes/UserInputEventNode';

export interface IUserInputSystem extends ISystem {
}

@Bind()
@Injectable()
export class UserInputSystem extends System implements IUserInputSystem {
  private userInputEventNodeList: INodeList<IUserInputEventNode> | null = null;

  constructor(
    @IMousetrap private readonly mousetrap: IMousetrap,
  ) {
    super();
  }

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

  /**
   * @override
   */
  public update(time: number): void {
    //
  }
}
