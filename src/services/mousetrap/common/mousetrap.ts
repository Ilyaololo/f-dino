import { inject } from 'inversify';

export interface IMousetrap {
}

export const MOUSETRAP = Symbol('mousetrap');

export const IMousetrap = inject(MOUSETRAP);
