import { injectable as Injectable } from 'inversify';

import mousetrap from 'mousetrap';
import { Bind } from 'f-ecs';

import { IMousetrap, BoundedCallback } from 'services/mousetrap/common/mousetrap';

@Bind()
@Injectable()
export class Mousetrap implements IMousetrap {
  constructor() {
    //
  }

  private stopCallback(e: ExtendedKeyboardEvent, element: Element, combo: string): boolean {
    return false;
  }

  public addKeycodes(keycodes: { [key: number]: string }): void {
    //
  }

  public bind(keys: string | string[], callback: BoundedCallback, action?: string): void {
    //
  }

  public reset(): void {
    //
  }

  public trigger(keys: string, action?: string): void {
    //
  }

  public unbind(keys: string|string[], action?: string): void {
    //
  }
}
