import { Components, IComponents } from '@core/components/Components';
import { Bind } from '@core/utils/bind';

export interface IGameState extends IComponents {
}

@Bind()
export class GameState extends Components implements IGameState {
  public readonly displayName: string = 'gameState';
}
