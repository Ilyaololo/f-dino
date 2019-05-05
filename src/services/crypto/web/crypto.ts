import { injectable as Injectable } from 'inversify';

import { Bind } from '@core/utils/bind';

import { ICrypto } from 'services/crypto/common/crypto';

@Bind()
@Injectable()
export class Crypto implements ICrypto {
}
