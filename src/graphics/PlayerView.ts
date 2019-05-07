import { Clock } from 'three';

import { Bind } from '@core/utils/bind';

export interface IPlayerView {
  destroy(): void;
  start(): void;
  update(): void;
}

@Bind()
export class PlayerView implements IPlayerView {
  private clock!: Clock;

  public start(): void {
    this.clock = new Clock();
  }

  public destroy(): void {
    //
  }

  public update(): void {
    const delta = this.clock.getDelta();
  }
}
