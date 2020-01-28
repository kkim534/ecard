import React from 'react';
import { Container, Card } from 'react-bootstrap';
import './Footer.css';

export const Footer: React.FunctionComponent = (props: any) => {
    return (
        <Container> 
            <Card className="fixed-bottom">
                <Card.Footer className="text-muted">
                    &copy; {new Date().getFullYear()} Copyright: <a href="https://www.datacom.co.nz/"> Datacom Systems Ltd</a>
                </Card.Footer>
            </Card>
        </Container>
    );
}
