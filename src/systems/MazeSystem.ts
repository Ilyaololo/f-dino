import { ICore } from '@core/Core';
import { INodeList } from '@core/node/NodeList';
import { ISystem, System } from '@core/system/System';
import { Bind } from '@core/utils/bind';

import { IMazeNode, MazeNode } from 'nodes/MazeNode';
import { ISceneNode, SceneNode } from 'nodes/SceneNode';

export interface IMazeSystem extends ISystem {
}

@Bind()
export class MazeSystem extends System implements IMazeSystem {
  private mazeNodeList: INodeList<IMazeNode> | null = null;
  private sceneNodeList: INodeList<ISceneNode> | null = null;

  /**
   * @override
   */
  public start(core: ICore): void {
    this.mazeNodeList = core.getNodeList<IMazeNode>(MazeNode);
    this.sceneNodeList = core.getNodeList<ISceneNode>(SceneNode);

    if (this.mazeNodeList && this.mazeNodeList.head) {
      if (this.sceneNodeList && this.sceneNodeList.head) {
        this.mazeNodeList.head.maze.mazeView.start(this.sceneNodeList.head.scene.sceneView.scene);
      }
    }
  }

  /**
   * @override
   */
  public destroy(core: ICore): void {
    this.mazeNodeList = null;
    this.sceneNodeList = null;
  }
}
