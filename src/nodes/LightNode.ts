import { INode, Node } from '@core/node/Node';
import { Bind } from '@core/utils/bind';
import { Define } from '@core/utils/define';

import { ILight, Light } from 'components/Light';

export interface ILightNode extends INode {
  light: ILight;
}

@Bind()
export class LightNode extends Node implements ILightNode {
  @Define(Light)
  public readonly light!: ILight;
}
