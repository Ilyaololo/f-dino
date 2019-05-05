import { Components, IComponents } from '@core/components/Components';
import { Bind } from '@core/utils/bind';

import { IMazeView } from 'graphics/MazeView';

export interface IMaze extends IComponents {
  mazeView: IMazeView;
}

@Bind()
export class Maze extends Components implements IMaze {
  public readonly displayName: string = 'maze';

  constructor(
    public readonly mazeView: IMazeView,
  ) {
    super();
  }
}
