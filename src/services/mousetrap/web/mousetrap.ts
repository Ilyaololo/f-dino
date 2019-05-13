import { injectable as Injectable } from 'inversify';

import mousetrap from 'mousetrap';

import { Bind } from '@core/utils/bind';

import { IMousetrap } from 'services/mousetrap/common/mousetrap';

@Bind()
@Injectable()
export class Mousetrap implements IMousetrap {
}
