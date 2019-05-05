import { ICore } from '@core/Core';
import { INodeList } from '@core/node/NodeList';
import { ISystem, System } from '@core/system/System';
import { Bind } from '@core/utils/bind';

import { ILightNode, LightNode } from 'nodes/LightNode';
import { ISceneNode, SceneNode } from 'nodes/SceneNode';

export interface ILightSystem extends ISystem {
}

@Bind()
export class LightSystem extends System implements ILightSystem {
  private lightNodeList: INodeList<ILightNode> | null = null;
  private sceneNodeList: INodeList<ISceneNode> | null = null;

  /**
   * @override
   */
  public start(core: ICore): void {
    this.lightNodeList = core.getNodeList<ILightNode>(LightNode);
    this.sceneNodeList = core.getNodeList<ISceneNode>(SceneNode);

    if (this.lightNodeList && this.lightNodeList.head) {
      if (this.sceneNodeList && this.sceneNodeList.head) {
        this.lightNodeList.head.light.lightView.start(this.sceneNodeList.head.scene.sceneView.scene);
      }
    }
  }

  /**
   * @override
   */
  public destroy(core: ICore): void {
    this.lightNodeList = null;
    this.sceneNodeList = null;
  }
}
