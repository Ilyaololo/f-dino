import { ICore } from '@core/Core';
import { INodeList } from '@core/node/NodeList';
import { ISystem, System } from '@core/system/System';
import { Bind } from '@core/utils/bind';

import { CameraNode, ICameraNode } from 'nodes/CameraNode';
import { ISceneNode, SceneNode } from 'nodes/SceneNode';

export interface ICameraSystem extends ISystem {
}

@Bind()
export class CameraSystem extends System implements ICameraSystem {
  private cameraNodeList: INodeList<ICameraNode> | null = null;
  private sceneNodeList: INodeList<ISceneNode> | null = null;

  /**
   * @override
   */
  public start(core: ICore): void {
    this.cameraNodeList = core.getNodeList<ICameraNode>(CameraNode);
    this.sceneNodeList = core.getNodeList<ISceneNode>(SceneNode);

    if (this.cameraNodeList && this.cameraNodeList.head) {
      if (this.sceneNodeList && this.sceneNodeList.head) {
        this.cameraNodeList.head.camera.cameraView.start(this.sceneNodeList.head.scene.sceneView.scene);
      }
    }
  }

  /**
   * @override
   */
  public destroy(core: ICore): void {
    this.cameraNodeList = null;
    this.sceneNodeList = null;
  }
}
