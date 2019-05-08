import React from 'react';

import Button from 'reactstrap/lib/Button';
import ButtonGroup from 'reactstrap/lib/ButtonGroup';
import Container from 'reactstrap/lib/Container';

import { EnhancedProps } from './';

export const Waiting = React.memo((props: EnhancedProps) => {
  return (
    <div className={props.classes.root}>
      <Container className={props.classes.container}>
        <strong>Click to Play!</strong>
        <br />
        <br />
        W,A,S,D or arrow keys = move
        <br />
        Mouse = look around
        <br />
        <br />
        <ButtonGroup className={props.classes.buttonGroup}>
          <Button color="primary" size="md" onClick={props.onClick}>
            Play
          </Button>
        </ButtonGroup>
      </Container>
    </div>
  );
});
