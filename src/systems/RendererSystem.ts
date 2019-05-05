import { ICore } from '@core/Core';
import { INodeList } from '@core/node/NodeList';
import { ISystem, System } from '@core/system/System';
import { Bind } from '@core/utils/bind';

import { CameraNode, ICameraNode } from 'nodes/CameraNode';
import { IRendererNode, RendererNode } from 'nodes/RendererNode';
import { ISceneNode, SceneNode } from 'nodes/SceneNode';

export interface IRendererSystem extends ISystem {
}

@Bind()
export class RendererSystem extends System implements IRendererSystem {
  private cameraNodeList: INodeList<ICameraNode> | null = null;
  private rendererNodeList: INodeList<IRendererNode> | null = null;
  private sceneNodeList: INodeList<ISceneNode> | null = null;

  /**
   * @override
   */
  public start(core: ICore): void {
    this.cameraNodeList = core.getNodeList<ICameraNode>(CameraNode);
    this.rendererNodeList = core.getNodeList<IRendererNode>(RendererNode);
    this.sceneNodeList = core.getNodeList<ISceneNode>(SceneNode);

    if (this.rendererNodeList && this.rendererNodeList.head) {
      if (this.sceneNodeList && this.sceneNodeList.head) {
        if (this.cameraNodeList && this.cameraNodeList.head) {
          this.rendererNodeList.head.renderer.rendererView.start(
            this.sceneNodeList.head.scene.sceneView.scene,
            this.cameraNodeList.head.camera.cameraView.camera,
          );
        }
      }
    }
  }

  /**
   * @override
   */
  public destroy(core: ICore): void {
    if (this.rendererNodeList && this.rendererNodeList.head) {
      this.rendererNodeList.head.renderer.rendererView.destroy();
    }

    this.cameraNodeList = null;
    this.rendererNodeList = null;
    this.sceneNodeList = null;
  }

  /**
   * @override
   */
  public update(time: number): void {
    if (this.rendererNodeList && this.rendererNodeList.head) {
      if (this.sceneNodeList && this.sceneNodeList.head) {
        if (this.cameraNodeList && this.cameraNodeList.head) {
          this.rendererNodeList.head.renderer.rendererView.update(
            this.sceneNodeList.head.scene.sceneView.scene,
            this.cameraNodeList.head.camera.cameraView.camera,
          );
        }
      }
    }
  }
}
