import { Bind, Components, IComponents } from 'f-ecs';

export interface IUserInputEvent extends IComponents {
}

@Bind()
export class UserInputEvent extends Components implements IUserInputEvent {
  public readonly displayName: string = 'waitingComponent';
}
