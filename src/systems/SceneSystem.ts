import { ICore } from '@core/Core';
import { INodeList } from '@core/node/NodeList';
import { ISystem, System } from '@core/system/System';
import { Bind } from '@core/utils/bind';

import { ISceneNode, SceneNode } from 'nodes/SceneNode';

export interface ISceneSystem extends ISystem {
}

@Bind()
export class SceneSystem extends System implements ISceneSystem {
  private sceneNodeList: INodeList<ISceneNode> | null = null;

  /**
   * @override
   */
  public start(core: ICore): void {
    this.sceneNodeList = core.getNodeList<ISceneNode>(SceneNode);

    if (this.sceneNodeList && this.sceneNodeList.head) {
      this.sceneNodeList.head.scene.sceneView.start();
    }
  }

  /**
   * @override
   */
  public destroy(core: ICore): void {
    this.sceneNodeList = null;
  }
}
