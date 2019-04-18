import { inject } from 'inversify';

export interface IStorage {
}

export const STORAGE = Symbol('storage');

export const IStorage = inject(STORAGE);
