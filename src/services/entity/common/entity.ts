import { inject } from 'inversify';

import { IEntity } from 'f-ecs';

export interface IEntityManager {
  createDinoEntity(): IEntity;
  createGameEntity(): IEntity;
  createMazeEntity(): IEntity;
  createPlayerEntity(): IEntity;
}

export const ENTITY_MANAGER = Symbol('entity-manager');

export const IEntityManager = inject(ENTITY_MANAGER);
