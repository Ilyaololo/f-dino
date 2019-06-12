import { Bind, Define, INode, Node } from 'f-ecs';

import { ILight, Light } from 'components/Light';

export interface ILightNode extends INode {
  lightComponent: ILight;
}

@Bind()
export class LightNode extends Node implements ILightNode {
  @Define(Light)
  public readonly lightComponent!: ILight;
}
