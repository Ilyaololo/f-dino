import { Components, IComponents } from '@core/components/Components';
import { Bind } from '@core/utils/bind';

import { IRendererView } from 'graphics/RendererView';

export interface IRenderer extends IComponents {
  rendererView: IRendererView;
}

@Bind()
export class Renderer extends Components implements IRenderer {
  public readonly displayName: string = 'rendererComponent';

  constructor(
    public readonly rendererView: IRendererView,
  ) {
    super();
  }
}
