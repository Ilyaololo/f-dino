import { ICore } from '@core/Core';
import { INodeList } from '@core/node/NodeList';
import { ISystem, System } from '@core/system/System';
import { Bind } from '@core/utils/bind';

import { DinoNode } from 'nodes/DinoNode';

export interface IDinoSystem extends ISystem {
}

@Bind()
export class DinoSystem extends System implements IDinoSystem {
  private dino!: INodeList | null;

  /**
   * @override
   */
  public start(core: ICore): void {
    this.dino = core.getNodeList(DinoNode);
  }

  /**
   * @override
   */
  public destroy(core: ICore): void {
    this.dino = null;
  }
}
