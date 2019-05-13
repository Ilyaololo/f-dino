import { injectable as Injectable } from 'inversify';

import { ICore } from '@core/Core';
import { Entity, IEntity } from '@core/entity/Entity';
import { Bind } from '@core/utils/bind';

import { IEntityManager } from 'services/entity/common/entity';

import { Camera } from 'components/Camera';
import { Collision } from 'components/Collision';
import { Dino } from 'components/Dino';
import { GameState } from 'components/GameState';
import { Light } from 'components/Light';
import { Maze } from 'components/Maze';
import { Player } from 'components/Player';
import { Renderer } from 'components/Renderer';
import { Scene } from 'components/Scene';
import { Sound } from 'components/Sound';
import { Waiting } from 'components/Waiting';

import { CameraView } from 'graphics/CameraView';
import { DinoView } from 'graphics/DinoView';
import { LightView } from 'graphics/LightView';
import { MazeView } from 'graphics/MazeView';
import { PlayerView } from 'graphics/PlayerView';
import { RendererView } from 'graphics/RendererView';
import { SceneView } from 'graphics/SceneView';
import { WaitingView } from 'graphics/WaitingView';

@Bind()
@Injectable()
export class EntityManager implements IEntityManager {
  constructor(
    private readonly core: ICore,
  ) {
  }

  public createGameEntity(): IEntity {
    const entity = new Entity('game');

    entity.set(new Scene(
      new SceneView(),
    ));

    entity.set(new Camera(
      new CameraView(),
    ));

    entity.set(new Light(
      new LightView(),
    ));

    entity.set(new Waiting(
      new WaitingView(),
    ));

    entity.set(new GameState());

    entity.set(new Collision());

    entity.set(new Sound());

    entity.set(new Renderer(
      new RendererView(),
    ));

    this.core.appendEntity(entity);

    return entity;
  }

  public createMazeEntity(): IEntity {
    const entity = new Entity('maze');

    entity.set(new Maze(
      new MazeView(),
    ));

    this.core.appendEntity(entity);

    return entity;
  }

  public createDinoEntity(): IEntity {
    const entity = new Entity('dino');

    entity.set(new Dino(
      new DinoView(),
    ));

    this.core.appendEntity(entity);

    return entity;
  }

  public createPlayerEntity(): IEntity {
    const entity = new Entity('player');

    entity.set(new Player(
      new PlayerView(),
    ));

    this.core.appendEntity(entity);

    return entity;
  }
}
