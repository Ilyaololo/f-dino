import { Bind, Define, INode, Node } from 'f-ecs';

import { IMaze, Maze } from 'components/Maze';

export interface IMazeNode extends INode {
  mazeComponent: IMaze;
}

@Bind()
export class MazeNode extends Node implements IMazeNode {
  @Define(Maze)
  public readonly mazeComponent!: IMaze;
}
