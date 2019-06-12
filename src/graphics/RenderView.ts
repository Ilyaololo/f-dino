import { WebGLRenderer } from 'three';

import { Bind } from 'f-ecs';

export interface IRendererView {
  renderer: WebGLRenderer;
}

@Bind()
export class RenderView implements IRendererView {
  /**
   * WebGL renderer reference.
   */
  public renderer!: WebGLRenderer;

  /**
   * DOM element reference.
   */
  private readonly innerRef: HTMLCanvasElement | null = document.querySelector<HTMLCanvasElement>('#container canvas');

  constructor() {
    if (!this.innerRef) {
      throw new Error("Can't find DOM element #container");
    }

    this.renderer = new WebGLRenderer({
      canvas: this.innerRef,
    });

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
