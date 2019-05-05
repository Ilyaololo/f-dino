import { FogExp2, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

import { Bind } from '@core/utils/bind';

export interface IRendererView {
  renderer: WebGLRenderer;
  destroy(): void;
  start(scene: Scene, camera: PerspectiveCamera): void;
  update(scene: Scene, camera: PerspectiveCamera): void;
}

@Bind()
export class RendererView implements IRendererView {
  public renderer!: WebGLRenderer;

  private static readonly MAX_HEIGHT: number = window.screen.availHeight;
  private static readonly MAX_WIDTH: number = window.screen.availWidth;

  private readonly innerRef: HTMLElement | null = document.getElementById('container');

  private camera!: PerspectiveCamera;
  private scene!: Scene;

  /**
   * Resize event handler.
   */
  private onResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  /**
   * Start scene.
   */
  public start(scene: Scene, camera: PerspectiveCamera): void {
    this.camera = camera;
    this.scene = scene;

    this.renderer = new WebGLRenderer();

    if (this.scene.fog) {
      this.renderer.setClearColor(this.scene.fog.color);
    }

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(RendererView.MAX_WIDTH, RendererView.MAX_HEIGHT);

    window.addEventListener('resize', this.onResize);

    if (!this.innerRef) {
      throw new Error("Can't find DOM element #container");
    }

    this.innerRef.appendChild(this.renderer.domElement);
  }

  /**
   * Destroy scene.
   */
  public destroy(): void {
    window.removeEventListener('resize', this.onResize);

    if (this.innerRef) {
      this.innerRef.removeChild(this.renderer.domElement);
    }
  }

  /**
   * Update scene.
   */
  public update(scene: Scene, camera: PerspectiveCamera): void {
    if (this.renderer) {
      this.renderer.render(scene, camera);
    }
  }
}
