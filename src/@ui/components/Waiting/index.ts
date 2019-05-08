import React from 'react';

import compose from 'recompose/compose';
import setDisplayName from 'recompose/setDisplayName';

import withStyles from 'react-jss';

import { Theme, WithStyles, withTheme } from '@ui/helpers/Theme';

import { Waiting } from './Waiting';

export interface Props {
  children?: React.ReactNode;
  onClick(): void;
}

export interface EnhancedProps extends Props, WithStyles {
}

const styles = (theme: Theme) => ({
  buttonGroup: {
    display: 'flex',
  },
  container: {
    backgroundColor: theme.palette.background.default,
    borderRadius: '5px',
    boxShadow: `0px 0px 0px 0px ${theme.palette.divider}`,
    height: 'auto',
    paddingBottom: '15px',
    paddingTop: '15px',
    width: '300px',
  },
  root: {
    alignItems: 'center',
    backgroundColor: theme.palette.action.active,
    display: 'flex',
    height: '100%',
    left: '0px',
    position: 'fixed',
    right: '0px',
    top: '0px',
    width: '100%',
  },
});

const enhance = compose(
  withTheme(),

  withStyles(styles),

  setDisplayName('Waiting'),
);

export default enhance(Waiting);
