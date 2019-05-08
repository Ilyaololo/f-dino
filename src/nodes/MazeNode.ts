import { INode, Node } from '@core/node/Node';
import { Bind } from '@core/utils/bind';
import { Define } from '@core/utils/define';

import { IMaze, Maze } from 'components/Maze';

export interface IMazeNode extends INode {
  mazeComponent: IMaze;
}

@Bind()
export class MazeNode extends Node implements IMazeNode {
  @Define(Maze)
  public readonly mazeComponent!: IMaze;
}
