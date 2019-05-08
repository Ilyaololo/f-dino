import { Components, IComponents } from '@core/components/Components';
import { Bind } from '@core/utils/bind';

import { IPlayerView } from 'graphics/PlayerView';

export interface IPlayer extends IComponents {
  playerView: IPlayerView;
  velocity: number;
}

@Bind()
export class Player extends Components implements IPlayer {
  public readonly displayName: string = 'playerComponent';

  /**
   * Reference.
   */
  public velocity!: number;

  constructor(
    public readonly playerView: IPlayerView,
  ) {
    super();
  }
}
