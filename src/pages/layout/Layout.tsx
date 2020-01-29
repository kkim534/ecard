import React from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './navbar/NavMenu';

export const Layout : React.FunctionComponent = (props: any) => { 

  return (
    <div>
      <NavMenu />
      <Container>
        {props.children}
      </Container>
    </div>
  );
}

