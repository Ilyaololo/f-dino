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
      const waitingNode = this.waitingNodeList.head;

      if (!waitingNode.waitingComponent.rendered) {
        waitingNode.waitingComponent.waitingView.render({
          onClick: () => {
            waitingNode.waitingComponent.waiting = false;
          },
        });

        waitingNode.waitingComponent.rendered = true;
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
      const waitingNode = this.waitingNodeList.head;

      if (!waitingNode.waitingComponent.waiting) {
        if (!waitingNode.waitingComponent.destroyed) {
          waitingNode.waitingComponent.waitingView.destroy();

          waitingNode.waitingComponent.rendered = false;
          waitingNode.waitingComponent.destroyed = true;
        }

        if (this.gameStateNodeList && this.gameStateNodeList.head) {
          const gameStateNode = this.gameStateNodeList.head;

          gameStateNode.gameStateComponent.playing = true;
        }
      }
    }
  }
}
