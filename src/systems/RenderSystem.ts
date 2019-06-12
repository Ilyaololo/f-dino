import { injectable as Injectable } from 'inversify';

import { Bind, ICore, INodeList, ISystem, System } from 'f-ecs';

import { CameraNode, ICameraNode } from 'nodes/CameraNode';
import { DinoNode, IDinoNode } from 'nodes/DinoNode';
import { ILightNode, LightNode } from 'nodes/LightNode';
import { IMazeNode, MazeNode } from 'nodes/MazeNode';
import { IRenderNode, RenderNode } from 'nodes/RenderNode';
import { ISceneNode, SceneNode } from 'nodes/SceneNode';

export interface IRenderSystem extends ISystem {
}

@Bind()
@Injectable()
export class RenderSystem extends System implements IRenderSystem {
  private cameraNodeList: INodeList<ICameraNode> | null = null;

  private dinoNodeList: INodeList<IDinoNode> | null = null;

  private lightNodeList: INodeList<ILightNode> | null = null;

  private mazeNodeList: INodeList<IMazeNode> | null = null;

  private rendererNodeList: INodeList<IRenderNode> | null = null;

  private sceneNodeList: INodeList<ISceneNode> | null = null;

  /**
   * Resize event handler.
   */
  private onResize(e: UIEvent): void {
    if (this.cameraNodeList && this.cameraNodeList.head) {
      const { camera } = this.cameraNodeList.head.cameraComponent.cameraView;

      if (this.rendererNodeList && this.rendererNodeList.head) {
        const { renderer } = this.rendererNodeList.head.renderComponent.renderView;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    }
  }

  /**
   * @override
   */
  public async start(core: ICore): Promise<void> {
    this.cameraNodeList = core.getNodeList<ICameraNode>(CameraNode);
    this.dinoNodeList = core.getNodeList<IDinoNode>(DinoNode);
    this.lightNodeList = core.getNodeList<ILightNode>(LightNode);
    this.mazeNodeList = core.getNodeList<IMazeNode>(MazeNode);
    this.rendererNodeList = core.getNodeList<IRenderNode>(RenderNode);
    this.sceneNodeList = core.getNodeList<ISceneNode>(SceneNode);

    if (this.sceneNodeList && this.sceneNodeList.head) {
      const { scene } = this.sceneNodeList.head.sceneComponent.sceneView;

      // Add fog on the scene.
      if (this.rendererNodeList && this.rendererNodeList.head) {
        const { renderer } = this.rendererNodeList.head.renderComponent.renderView;

        if (scene.fog) {
          renderer.setClearColor(
            scene.fog.color,
          );
        }
      }

      // Add camera on the scene.
      if (this.cameraNodeList && this.cameraNodeList.head) {
        const { camera } = this.cameraNodeList.head.cameraComponent.cameraView;

        scene.add(camera);
      }

      // Add light on the scene.
      if (this.lightNodeList && this.lightNodeList.head) {
        const { lightView } = this.lightNodeList.head.lightComponent;

        scene.add(lightView.primary);
        scene.add(lightView.secondary);
      }

      // Add maze to the scene
      if (this.mazeNodeList && this.mazeNodeList.head) {
        const { mazeView } = this.mazeNodeList.head.mazeComponent;

        // cube
        mazeView.maze.forEach((cube) => {
          scene.add(cube);
        });

        // ground
        scene.add(mazeView.ground);
      }

      if (this.dinoNodeList && this.dinoNodeList.head) {
        const { dinoView } = this.dinoNodeList.head.dinoComponent;

        try {
          const dino = await dinoView.load();

          scene.add(dino);
        } catch (err) {
          console.error(err);
        }
      }
    }

    window.addEventListener('resize', this.onResize);
  }

  /**
   * @override
   */
  public destroy(): void {
    this.cameraNodeList = null;
    this.dinoNodeList = null;
    this.lightNodeList = null;
    this.mazeNodeList = null;
    this.rendererNodeList = null;
    this.sceneNodeList = null;

    window.removeEventListener('resize', this.onResize);
  }

  /**
   * @override
   */
  public update(): void {
    if (this.rendererNodeList && this.rendererNodeList.head) {
      if (this.sceneNodeList && this.sceneNodeList.head) {
        if (this.cameraNodeList && this.cameraNodeList.head) {
          const { camera } = this.cameraNodeList.head.cameraComponent.cameraView;
          const { renderer } = this.rendererNodeList.head.renderComponent.renderView;
          const { scene } = this.sceneNodeList.head.sceneComponent.sceneView;

          renderer.render(scene, camera);
        }
      }
    }
  }
}
