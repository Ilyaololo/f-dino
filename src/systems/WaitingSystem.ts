import { ICore } from '@core/Core';
import { INodeList } from '@core/node/NodeList';
import { ISystem, System } from '@core/system/System';
import { Bind } from '@core/utils/bind';

import { GameStateNode, IGameStateNode } from 'nodes/GameStateNode';
import { IWaitingNode, WaitingNode } from 'nodes/WaitingNode';

export interface IWaitingSystem extends ISystem {
}

@Bind()
export class WaitingSystem extends System implements IWaitingSystem {
  private gameStateNodeList: INodeList<IGameStateNode> | null = null;
  private waitingNodeList: INodeList<IWaitingNode> | null = null;

  /**
   * @override
   */
  public start(core: ICore): void {
    this.gameStateNodeList = core.getNodeList<IGameStateNode>(GameStateNode);
    this.waitingNodeList = core.getNodeList<IWaitingNode>(WaitingNode);

    if (this.waitingNodeList && this.waitingNodeList.head) {
      if (!this.waitingNodeList.head.waitingComponent.rendered) {
        this.waitingNodeList.head.waitingComponent.waitingView.render({
          onClick: () => {
            this.waitingNodeList!.head!.waitingComponent.waiting = false;
          },
        });

        this.waitingNodeList.head.waitingComponent.rendered = true;
      }
    }
  }

  /**
   * @override
   */
  public destroy(core: ICore): void {
    this.waitingNodeList = null;
  }

  /**
   * @override
   */
  public update(time: number): void {
    if (this.waitingNodeList && this.waitingNodeList.head) {
      if (!this.waitingNodeList.head.waitingComponent.waiting) {
        if (!this.waitingNodeList.head.waitingComponent.destroyed) {
          this.waitingNodeList.head.waitingComponent.waitingView.destroy();

          this.waitingNodeList.head.waitingComponent.rendered = false;
          this.waitingNodeList.head.waitingComponent.destroyed = true;
        }

        if (this.gameStateNodeList && this.gameStateNodeList.head) {
          this.gameStateNodeList.head.gameStateComponent.playing = true;
        }
      }
    }
  }
}
