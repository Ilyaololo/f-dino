import { Bind, Components, IComponents } from 'f-ecs';

import { IDinoView } from 'graphics/DinoView';

export interface IDino extends IComponents {
  dinoView: IDinoView;
}

@Bind()
export class Dino extends Components implements IDino {
  public readonly displayName: string = 'dinoComponent';

  constructor(
    public readonly dinoView: IDinoView,
  ) {
    super();
  }
}
