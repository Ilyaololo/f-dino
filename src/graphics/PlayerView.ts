import { Clock } from 'three';

import { Bind } from 'f-ecs';

export interface IPlayerView {
}

@Bind()
export class PlayerView implements IPlayerView {
  private readonly clock: Clock;

  constructor() {
    this.clock = new Clock();
  }
}
