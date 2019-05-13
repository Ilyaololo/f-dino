import { injectable as Injectable } from 'inversify';

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
@Injectable()
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
      const sceneNode = this.sceneNodeList.head;

      // Add fog to the scene
      if (this.rendererNodeList && this.rendererNodeList.head) {
        const rendererNode = this.rendererNodeList.head;

        if (sceneNode.sceneComponent.sceneView.scene.fog) {
          rendererNode.rendererComponent.rendererView.renderer.setClearColor(
            sceneNode.sceneComponent.sceneView.scene.fog.color,
          );
        }
      }

      // Add camera to the scene
      if (this.cameraNodeList && this.cameraNodeList.head) {
        const cameraNode = this.cameraNodeList.head;

        sceneNode.sceneComponent.sceneView.scene.add(
          cameraNode.cameraComponent.cameraView.camera,
        );
      }

      // Add light to the scene
      if (this.lightNodeList && this.lightNodeList.head) {
        const lightNode = this.lightNodeList.head;

        sceneNode.sceneComponent.sceneView.scene.add(
          lightNode.lightComponent.lightView.primary,
        );

        sceneNode.sceneComponent.sceneView.scene.add(
          lightNode.lightComponent.lightView.secondary,
        );
      }

      // Add maze to the scene
      if (this.mazeNodeList && this.mazeNodeList.head) {
        const mazeNode = this.mazeNodeList.head;

        // cube
        mazeNode.mazeComponent.mazeView.maze.forEach((cube) => {
          sceneNode.sceneComponent.sceneView.scene.add(cube);
        });

        // ground
        sceneNode.sceneComponent.sceneView.scene.add(
          mazeNode.mazeComponent.mazeView.ground,
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
