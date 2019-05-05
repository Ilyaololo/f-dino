import { inject } from 'inversify';

export interface ISession {
}

export const SESSION = Symbol('session');

export const ISession = inject(SESSION);
