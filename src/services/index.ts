import { Container } from 'inversify';

import { Core } from 'f-ecs';

import { ENTITY_MANAGER, IEntityManager } from 'services/entity/common/entity';
import { EntityManager } from 'services/entity/web/entity';
import { IMousetrap, MOUSETRAP } from 'services/mousetrap/common/mousetrap';
import { Mousetrap } from 'services/mousetrap/web/mousetrap';

export function configureService(): Container {
  const container: Container = new Container({
    defaultScope: 'Singleton',
  });

  container.bind(Core).toSelf();
  container.bind<IEntityManager>(ENTITY_MANAGER).to(EntityManager);
  container.bind<IMousetrap>(MOUSETRAP).to(Mousetrap);

  return container;
}
