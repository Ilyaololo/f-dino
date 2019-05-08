import { INode, Node } from '@core/node/Node';
import { Bind } from '@core/utils/bind';
import { Define } from '@core/utils/define';

import { IUserInputEvent, UserInputEvent } from 'components/UserInputEvent';

export interface IUserInputEventNode extends INode {
  userInputEventComponent: IUserInputEvent;
}

@Bind()
export class UserInputEventNode extends Node implements IUserInputEventNode {
  @Define(UserInputEvent)
  public readonly userInputEventComponent!: IUserInputEvent;
}
