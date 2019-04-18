import { inject } from 'inversify';

export interface IHttp {
}

export const HTTP = Symbol('http');

export const IHttp = inject(HTTP);
