import { Bind, Components, IComponents } from 'f-ecs';

import { IMazeView } from 'graphics/MazeView';

export interface IMaze extends IComponents {
  mazeView: IMazeView;
}

@Bind()
export class Maze extends Components implements IMaze {
  public readonly displayName: string = 'mazeComponent';

  constructor(
    public readonly mazeView: IMazeView,
  ) {
    super();
  }
}
