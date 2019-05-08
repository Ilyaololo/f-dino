import { Components, IComponents } from '@core/components/Components';
import { Bind } from '@core/utils/bind';

export interface IGameState extends IComponents {
  playing: boolean;
  initialized: boolean;
}

@Bind()
export class GameState extends Components implements IGameState {
  public readonly displayName: string = 'gameStateComponent';

  public initialized: boolean = false;
  public playing: boolean = false;
}
