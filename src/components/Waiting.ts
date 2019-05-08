import { Components, IComponents } from '@core/components/Components';
import { Bind } from '@core/utils/bind';

import { IWaitingView } from 'graphics/WaitingView';

export interface IWaiting extends IComponents {
  destroyed: boolean;
  rendered: boolean;
  waiting: boolean;
  waitingView: IWaitingView;
}

@Bind()
export class Waiting extends Components implements IWaiting {
  public readonly displayName: string = 'waitingComponent';

  public readonly destroyed: boolean = false;
  public readonly rendered: boolean = false;
  public readonly waiting: boolean = true;

  constructor(
    public readonly waitingView: IWaitingView,
  ) {
    super();
  }
}
