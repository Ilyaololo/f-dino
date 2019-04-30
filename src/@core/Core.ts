import { IComponents } from '@core/components/Components';

import { IEntity } from '@core/entity/Entity';
import { EntityList, IEntityList } from '@core/entity/EntityList';

import { EventEmitter, IEventEmitter } from '@core/event/EventEmitter';

import { Node } from '@core/node/Node';
import { INodeList } from '@core/node/NodeList';
import { INodeManager, NodeManager } from '@core/node/NodeManager';

import { ISystem } from '@core/system/System';
import { ISystemList, SystemList } from '@core/system/SystemList';

import { Bind } from '@core/utils/bind';

import * as CONSTANTS from '@core/constants';

export interface ICore extends IEventEmitter {
  appendEntity(entity: IEntity): this;
  appendSystem(system: ISystem): this;
  getNodeList<T>(node: typeof Node): INodeList<T>;
  removeEntity(entity: IEntity): this;
  removeSystem(system: ISystem): this;
  update(time: number): void;
}

@Bind()
export class Core extends EventEmitter implements ICore {
  /**
   * Reference.
   */
  private readonly entities: IEntityList;

  /**
   * Reference.
   */
  private readonly nodes: Map<typeof Node, INodeManager>;

  /**
   * Reference.
   */
  private readonly systems: ISystemList;

  constructor() {
    super();

    this.entities = new EntityList();
    this.nodes = new Map();
    this.systems = new SystemList();
  }

  /**
   * Entity handler of event ENTITY_DELETE_COMPONENT_EVENT
   */
  private onEntityDeleteComponent(entity: IEntity, component: IComponents): void {
    this.nodes.forEach((node) => {
      node.delete(entity);
    });
  }

  /**
   * Entity handler of event ENTITY_SET_COMPONENT_EVENT
   */
  private onEntitySetComponent(entity: IEntity, component: IComponents): void {
    this.nodes.forEach((node) => {
      node.set(entity);
    });
  }

  /**
   * Add a entity to the core.
   */
  public appendEntity(entity: IEntity): this {
    if (this.entities.has(entity)) {
      throw new Error(`Entity '${entity.displayName}' is already used by another entity`);
    }

    this.entities.set(entity);

    entity.on(CONSTANTS.ENTITY_DELETE_COMPONENT_EVENT, this.onEntityDeleteComponent);
    entity.on(CONSTANTS.ENTITY_SET_COMPONENT_EVENT, this.onEntitySetComponent);

    this.nodes.forEach((node) => {
      node.set(entity);
    });

    return this;
  }

  /**
   * Remove a entity from the core.
   */
  public removeEntity(entity: IEntity): this {
    entity.off(CONSTANTS.ENTITY_DELETE_COMPONENT_EVENT, this.onEntityDeleteComponent);
    entity.off(CONSTANTS.ENTITY_SET_COMPONENT_EVENT, this.onEntitySetComponent);

    this.nodes.forEach((node) => {
      node.delete(entity);
    });

    this.entities.delete(entity);

    return this;
  }

  /**
   * Add a system to the core.
   */
  public appendSystem(system: ISystem): this {
    this.systems.set(system);

    system.start(this);

    return this;
  }

  /**
   * Remove a system from the core.
   */
  public removeSystem(system: ISystem): this {
    system.destroy(this);

    this.systems.delete(system);

    return this;
  }

  /**
   * Get a collection of nodes from the engine, based on the type of the node required.
   */
  public getNodeList<T>(node: typeof Node): INodeList<T> {
    if (this.nodes.has(node)) {
      return this.nodes.get(node)!.nodeList;
    }

    const nodes = new NodeManager(node);
    this.nodes.set(node, nodes);

    this.entities.forEach((entity) => {
      nodes.set(entity);
    });

    return nodes.nodeList;
  }

  /**
   * Update the engine. This causes the engine update loop to run, calling update on all the systems in the engine.
   */
  public update(time: number): void {
    this.systems.forEach((system) => {
      system.update(time);
    });
  }
}
