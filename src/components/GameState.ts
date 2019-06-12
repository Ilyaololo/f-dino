import { Bind, Components, IComponents } from 'f-ecs';

export interface IGameState extends IComponents {
  playing: boolean;
  initialized: boolean;
}

@Bind()
export class GameState extends Components implements IGameState {
  public readonly displayName: string = 'gameStateComponent';

  /**
   * Reference.
   */
  public initialized: boolean = false;

  /**
   * Reference.
   */
  public playing: boolean = false;
}
