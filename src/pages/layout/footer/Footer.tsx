import React from 'react';
import { Container, Card } from 'react-bootstrap';
import './Footer.css';

export const Footer: React.FunctionComponent = (props: any) => {
    return (
        <Card>
            <Card.Footer className="text-muted">
                &copy; {new Date().getFullYear()} Copyright: <a href="https://www.datacom.co.nz/"> Datacom</a>
            </Card.Footer>
        </Card>
    );
}
