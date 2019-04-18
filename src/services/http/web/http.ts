import { injectable as Injectable } from 'inversify';

import { Bind } from '@core/utils/bind';

import { IHttp } from 'services/http/common/http';

@Bind()
@Injectable()
export class Http implements IHttp {
}
