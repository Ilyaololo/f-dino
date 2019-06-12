import { Bind, Define, INode, Node } from 'f-ecs';

import { IRender, Render } from 'components/Render';

export interface IRenderNode extends INode {
  renderComponent: IRender;
}

@Bind()
export class RenderNode extends Node implements IRenderNode {
  @Define(Render)
  public readonly renderComponent!: IRender;
}
