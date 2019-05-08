import { Components, IComponents } from '@core/components/Components';
import { Bind } from '@core/utils/bind';

export interface IUserInputEvent extends IComponents {
}

@Bind()
export class UserInputEvent extends Components implements IUserInputEvent {
  public readonly displayName: string = 'waitingComponent';
}
