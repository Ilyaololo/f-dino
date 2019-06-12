import { inject } from 'inversify';

export type BoundedCallback = (e: ExtendedKeyboardEvent, combo: string) => any;

export interface IMousetrap {
  addKeycodes(keycodes: { [key: number]: string }): void;
  bind(keys: string | string[], callback: BoundedCallback, action?: string): void;
  reset(): void;
  trigger(keys: string, action?: string): void;
  unbind(keys: string | string[], action?: string): void;
}

export const MOUSETRAP = Symbol('mousetrap');

export const IMousetrap = inject(MOUSETRAP);
