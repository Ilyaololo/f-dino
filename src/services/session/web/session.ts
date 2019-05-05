import { injectable as Injectable } from 'inversify';

import { Bind } from '@core/utils/bind';

import { ISession } from 'services/session/common/session';

@Bind()
@Injectable()
export class Session implements ISession {
}
