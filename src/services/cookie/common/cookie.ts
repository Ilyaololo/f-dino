import { inject } from 'inversify';

export interface ICookie {
}

export const COOKIE = Symbol('cookie');

export const ICookie = inject(COOKIE);
