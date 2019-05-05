import { injectable as Injectable } from 'inversify';

import { Bind } from '@core/utils/bind';

import { ICookie } from 'services/cookie/common/cookie';

@Bind()
@Injectable()
export class Cookie implements ICookie {
}
