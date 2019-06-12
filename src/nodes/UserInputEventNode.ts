import { Bind, Define, INode, Node } from 'f-ecs';

import { IUserInputEvent, UserInputEvent } from 'components/UserInputEvent';

export interface IUserInputEventNode extends INode {
  userInputEventComponent: IUserInputEvent;
}

@Bind()
export class UserInputEventNode extends Node implements IUserInputEventNode {
  @Define(UserInputEvent)
  public readonly userInputEventComponent!: IUserInputEvent;
}
