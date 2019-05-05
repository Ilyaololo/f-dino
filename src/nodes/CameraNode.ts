import { INode, Node } from '@core/node/Node';
import { Bind } from '@core/utils/bind';
import { Define } from '@core/utils/define';

import { Camera, ICamera } from 'components/Camera';

export interface ICameraNode extends INode {
  camera: ICamera;
}

@Bind()
export class CameraNode extends Node implements ICameraNode {
  @Define(Camera)
  public readonly camera!: ICamera;
}
