import { ICore } from '@core/Core';
import { Bind } from '@core/utils/bind';

export interface ISystem {
  next: this | null;
  previous: this | null;
  destroy(ctx: ICore): void;
  init(ctx: ICore): void;
  update(time: number): void;
}

@Bind()
export class System implements ISystem {
  /**
   * Reference on next system in a system list.
   */
  public next: this | null = null;

  /**
   * Reference on previous system in a system list.
   */
  public previous: this | null = null;

  /**
   * Called after the system is applied to the core
   */
  public init(ctx: ICore): void {
    //
  }

  /**
   * Called after the system is destroyed from the core
   */
  public destroy(ctx: ICore): void {
    //
  }

  /**
   * Called on every frame renderer.
   */
  public update(time: number): void {
    //
  }
}
