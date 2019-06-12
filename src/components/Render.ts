import { Bind, Components, IComponents } from 'f-ecs';

import { IRendererView } from 'graphics/RenderView';

export interface IRender extends IComponents {
  renderView: IRendererView;
}

@Bind()
export class Render extends Components implements IRender {
  public readonly displayName: string = 'renderComponent';

  constructor(
    public readonly renderView: IRendererView,
  ) {
    super();
  }
}
