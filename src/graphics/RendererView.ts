import { WebGLRenderer } from 'three';

import { Bind } from '@core/utils/bind';

export interface IRendererView {
  renderer: WebGLRenderer;
}

@Bind()
export class RendererView implements IRendererView {
  /**
   * WebGL renderer reference.
   */
  public renderer!: WebGLRenderer;

  /**
   * Max available device height.
   */
  private static readonly MAX_HEIGHT: number = window.screen.availHeight;

  /**
   * Max available device width.
   */
  private static readonly MAX_WIDTH: number = window.screen.availWidth;

  /**
   * DOM element reference.
   */
  private readonly innerRef: HTMLElement | null = document.getElementById('container');

  constructor() {
    this.renderer = new WebGLRenderer();

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(RendererView.MAX_WIDTH, RendererView.MAX_HEIGHT);

    // window.addEventListener('resize', this.onResize);

    if (!this.innerRef) {
      throw new Error("Can't find DOM element #container");
    }

    this.innerRef.appendChild(this.renderer.domElement);
  }

  /**
   * Resize event handler.
   */
  private onResize(): void {
    // this.camera.aspect = window.innerWidth / window.innerHeight;
    // this.camera.updateProjectionMatrix();
    //
    // this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
