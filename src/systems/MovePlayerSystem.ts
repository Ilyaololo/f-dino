import { injectable as Injectable } from 'inversify';

import { Bind, ICore, INodeList, ISystem, System } from 'f-ecs';

import { IPlayerNode, PlayerNode } from 'nodes/PlayerNode';

export interface IMovePlayerSystem extends ISystem {
}

@Bind()
@Injectable()
export class MovePlayerSystem extends System implements IMovePlayerSystem {
  private playerNodeList: INodeList<IPlayerNode> | null = null;

  /**
   * @override
   */
  public start(core: ICore): void {
    this.playerNodeList = core.getNodeList<IPlayerNode>(PlayerNode);
  }

  /**
   * @override
   */
  public destroy(): void {
    this.playerNodeList = null;
  }

  /**
   * @override
   */
  public update(time: number): void {
    //
  }
}
