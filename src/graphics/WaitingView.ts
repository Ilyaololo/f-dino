import React from 'react';
import ReactDOM from 'react-dom';

import { Bind } from '@core/utils/bind';

import Waiting, { Props as WaitingProps } from '@ui/components/Waiting';

export interface IWaitingView {
  destroy(): void;
  render(props: WaitingProps): void;
}

@Bind()
export class WaitingView implements IWaitingView {
  /**
   * DOM element reference.
   */
  private readonly innerRef: HTMLElement | null = document.getElementById('banner');

  public render(props: WaitingProps): void {
    if (!this.innerRef) {
      throw new Error("Can't find DOM element #banner");
    }

    const element = React.createElement(Waiting, {
      onClick() {
        props.onClick();
      },
    });

    ReactDOM.render(element, this.innerRef);
  }

  public destroy(): void {
    ReactDOM.unmountComponentAtNode(this.innerRef!);
  }
}
