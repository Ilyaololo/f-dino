import { INode, Node } from '@core/node/Node';
import { Bind } from '@core/utils/bind';
import { Define } from '@core/utils/define';

import { IRenderer, Renderer } from 'components/Renderer';

export interface IRendererNode extends INode {
  renderer: IRenderer;
}

@Bind()
export class RendererNode extends Node implements IRendererNode {
  @Define(Renderer)
  public readonly renderer!: IRenderer;
}
