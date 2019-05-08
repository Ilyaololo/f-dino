import { ICore } from '@core/Core';
import { INodeList } from '@core/node/NodeList';
import { ISystem, System } from '@core/system/System';
import { Bind } from '@core/utils/bind';

import { CameraNode, ICameraNode } from 'nodes/CameraNode';
import { DinoNode, IDinoNode } from 'nodes/DinoNode';
import { ILightNode, LightNode } from 'nodes/LightNode';
import { IMazeNode, MazeNode } from 'nodes/MazeNode';
import { IRendererNode, RendererNode } from 'nodes/RendererNode';
import { ISceneNode, SceneNode } from 'nodes/SceneNode';

export interface IRendererSystem extends ISystem {
}

@Bind()
export class RendererSystem extends System implements IRendererSystem {
  private cameraNodeList: INodeList<ICameraNode> | null = null;
  private dinoNodeList: INodeList<IDinoNode> | null = null;
  private lightNodeList: INodeList<ILightNode> | null = null;
  private mazeNodeList: INodeList<IMazeNode> | null = null;
  private rendererNodeList: INodeList<IRendererNode> | null = null;
  private sceneNodeList: INodeList<ISceneNode> | null = null;

  /**
   * @override
   */
  public start(core: ICore): void {
    this.cameraNodeList = core.getNodeList<ICameraNode>(CameraNode);
    this.dinoNodeList = core.getNodeList<IDinoNode>(DinoNode);
    this.lightNodeList = core.getNodeList<ILightNode>(LightNode);
    this.mazeNodeList = core.getNodeList<IMazeNode>(MazeNode);
    this.rendererNodeList = core.getNodeList<IRendererNode>(RendererNode);
    this.sceneNodeList = core.getNodeList<ISceneNode>(SceneNode);

    if (this.sceneNodeList && this.sceneNodeList.head) {
      // Add fog to the scene
      if (this.rendererNodeList && this.rendererNodeList.head) {
        if (this.sceneNodeList.head.sceneComponent.sceneView.scene.fog) {
          this.rendererNodeList.head.rendererComponent.rendererView.renderer.setClearColor(
            this.sceneNodeList.head.sceneComponent.sceneView.scene.fog.color,
          );
        }
      }

      // Add camera to the scene
      if (this.cameraNodeList && this.cameraNodeList.head) {
        this.sceneNodeList.head.sceneComponent.sceneView.scene.add(
          this.cameraNodeList.head.cameraComponent.cameraView.camera,
        );
      }

      // Add light to the scene
      if (this.lightNodeList && this.lightNodeList.head) {
        this.sceneNodeList.head.sceneComponent.sceneView.scene.add(
          this.lightNodeList.head.lightComponent.lightView.primary,
        );

        this.sceneNodeList.head.sceneComponent.sceneView.scene.add(
          this.lightNodeList.head.lightComponent.lightView.secondary,
        );
      }

      // Add maze to the scene
      if (this.mazeNodeList && this.mazeNodeList.head) {
        // cube
        this.mazeNodeList.head.mazeComponent.mazeView.maze.forEach((cube) => {
          this.sceneNodeList!.head!.sceneComponent.sceneView.scene.add(cube);
        });

        // ground
        this.sceneNodeList.head.sceneComponent.sceneView.scene.add(
          this.mazeNodeList.head.mazeComponent.mazeView.ground,
        );
      }
    }
  }

  /**
   * @override
   */
  public destroy(core: ICore): void {
    this.cameraNodeList = null;
    this.dinoNodeList = null;
    this.lightNodeList = null;
    this.mazeNodeList = null;
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
          this.rendererNodeList.head.rendererComponent.rendererView.renderer.render(
            this.sceneNodeList.head.sceneComponent.sceneView.scene,
            this.cameraNodeList.head.cameraComponent.cameraView.camera,
          );
        }
      }
    }
  }
}
