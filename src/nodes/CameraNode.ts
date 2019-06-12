import { Bind, Define, INode, Node } from 'f-ecs';

import { Camera, ICamera } from 'components/Camera';

export interface ICameraNode extends INode {
  cameraComponent: ICamera;
}

@Bind()
export class CameraNode extends Node implements ICameraNode {
  @Define(Camera)
  public readonly cameraComponent!: ICamera;
}
