import { Components, IComponents } from '@core/components/Components';
import { Bind } from '@core/utils/bind';

import { IDinoView } from 'graphics/DinoView';

export interface IDino extends IComponents {
}

@Bind()
export class Dino extends Components implements IDino {
  public readonly displayName: string = 'dinoComponent';

  constructor(
    private readonly view: IDinoView,
  ) {
    super();
  }
}
