import { Container } from 'inversify';

import { HTTP, IHttp } from 'services/http/common/http';
import { Http } from 'services/http/web/http';
import { IStorage, STORAGE } from 'services/storage/common/storage';
import { Storage } from 'services/storage/web/storage';

export function configureService(): Container {
  const container: Container = new Container();

  container.bind<IHttp>(HTTP).to(Http);
  container.bind<IStorage>(STORAGE).to(Storage);

  return container;
}
