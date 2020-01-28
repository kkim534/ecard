import React from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './navbar/NavMenu';
import { Footer } from './footer/Footer';

export const Layout : React.FunctionComponent = (props: any) => { 

  return (
    <div>
      <NavMenu />
      <Container>
        {props.children}
      </Container>
      <Footer />
    </div>
  );
}

