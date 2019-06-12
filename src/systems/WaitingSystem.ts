import { injectable as Injectable } from 'inversify';

import { Bind, ICore, INodeList, ISystem, System } from 'f-ecs';

import { GameStateNode, IGameStateNode } from 'nodes/GameStateNode';
import { IWaitingNode, WaitingNode } from 'nodes/WaitingNode';

export interface IWaitingSystem extends ISystem {
}

@Bind()
@Injectable()
export class WaitingSystem extends System implements IWaitingSystem {
  /**
   * Reference.
   */
  private gameStateNodeList: INodeList<IGameStateNode> | null = null;

  /**
   * Reference.
   */
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
        waitingNode.waitingComponent.waitingView.render(/* {
          onClick: () => {
            waitingNode.waitingComponent.waiting = false;
          },
        } */);

        waitingNode.waitingComponent.rendered = true;
      }
    }
  }

  /**
   * @override
   */
  public destroy(): void {
    this.waitingNodeList = null;
  }

  /**
   * @override
   */
  public update(): void {
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
