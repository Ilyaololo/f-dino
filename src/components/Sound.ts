import { Bind, Components, IComponents } from 'f-ecs';

export interface ISound extends IComponents {
}

@Bind()
export class Sound extends Components implements ISound {
  public readonly displayName: string = 'soundComponent';
}
