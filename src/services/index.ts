import { Container } from 'inversify';

import { COOKIE, ICookie } from 'services/cookie/common/cookie';
import { Cookie } from 'services/cookie/web/cookie';
import { CRYPTO, ICrypto } from 'services/crypto/common/crypto';
import { Crypto } from 'services/crypto/web/crypto';
import { HTTP, IHttp } from 'services/http/common/http';
import { Http } from 'services/http/web/http';
import { ISession, SESSION } from 'services/session/common/session';
import { Session } from 'services/session/web/session';
import { IStorage, STORAGE } from 'services/storage/common/storage';
import { Storage } from 'services/storage/web/storage';

export function configureService(): Container {
  const container: Container = new Container();

  container.bind<ICookie>(COOKIE).to(Cookie);
  container.bind<ICrypto>(CRYPTO).to(Crypto);
  container.bind<IHttp>(HTTP).to(Http);
  container.bind<ISession>(SESSION).to(Session);
  container.bind<IStorage>(STORAGE).to(Storage);

  return container;
}
