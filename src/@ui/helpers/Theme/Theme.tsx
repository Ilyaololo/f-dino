import React from 'react';

import getDisplayName from 'recompose/getDisplayName';

import { ThemeProvider, WithSheet } from 'react-jss';

export interface WithStyles extends WithSheet<any, any, any> {
}

export interface Action {
  active: string;
  disabled: string;
  disabledBackground: string;
  hover: string;
  hoverOpacity: number;
  selected: string;
}

export interface Background {
  default: string;
  paper: string;
}

export interface Common {
  black: string;
  white: string;
}

export interface Error {
  contrastText: string;
  dark: string;
  light: string;
  main: string;
}

export interface Primary {
  main: string;
}

export interface Secondary {
  main: string;
}

export interface Text {
  disabled: string;
  hint: string;
  primary: string;
  secondary: string;
}

export interface Palette {
  action: Action;
  background: Background;
  common: Common;
  divider: string;
  error: Error;
  primary: Primary;
  secondary: Secondary;
  text: Text;
}

export interface Theme {
  palette: Palette;
}

const theme: Theme = {
  palette: {
    action: {
      active: 'rgba(0,0,0,0.54)',
      disabled: 'rgba(0,0,0,0.26)',
      disabledBackground: 'rgba(0,0,0,0.12)',
      hover: 'rgba(0,0,0,0.08)',
      hoverOpacity: 0.08,
      selected: 'rgba(0,0,0,0.14)',
    },
    background: {
      default: '#fafafa',
      paper: '#fff',
    },
    common: {
      black: '#000',
      white: '#fff',
    },
    divider: 'rgba(0,0,0,0.12)',
    error: {
      contrastText: '#fff',
      dark: '#d32f2f',
      light: '#e57373',
      main: '#f44336',
    },
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: 'rgb(225,0,80)',
    },
    text: {
      disabled: 'rgba(0,0,0,0.38)',
      hint: 'rgba(0,0,0,0.38)',
      primary: 'rgba(0,0,0,0.87)',
      secondary: 'rgba(0,0,0,0.54)',
    },
  },
};

export function withTheme(): any {
  return (WrappedComponent: React.ComponentType<any>): React.ComponentType<any> => {
    const Component = (props: any) => {
      return (
        <ThemeProvider theme={theme}>
          <WrappedComponent {...props} />
        </ThemeProvider>
      );
    };

    Component.displayName = `withTheme(${getDisplayName(WrappedComponent)})`;

    return Component;
  };
}
