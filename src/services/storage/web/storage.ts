import { injectable  as Injectable } from 'inversify';

import { Bind } from '@core/utils/bind';

import { IStorage } from 'services/storage/common/storage';

@Bind()
@Injectable()
export class Storage implements IStorage {
}
