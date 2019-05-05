import { inject } from 'inversify';

export interface ICrypto {
}

export const CRYPTO = Symbol('crypto');

export const ICrypto = inject(CRYPTO);
