import React from 'react';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Home } from './pages/home-page/Home';
import { ContactsPage } from './pages/contacts-page';
import DataContextProvider from './contexts/data-context';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { NavMenu } from './pages/layout/navbar/NavMenu';
import { MessagePage } from './pages/message-page/message';
import { OrganizationPage } from './pages/organization-page/organization';
import { CreateEvent } from './pages/events-page/CreateEvent';
import { ExportPage } from './pages/export-page/export';

const App: React.FC = () => {
  return (
    <DataContextProvider>
      <Router>
        <Container fluid>
          <Row>
            <Col xs={3} className="nav-alignments">
              <NavMenu />
            </Col>

            <Col xs={9}>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/contact">
                <ContactsPage />
              </Route>
              <Route exact path="/event">
                <CreateEvent />
              </Route>
              <Route exact path="/organization">
                <OrganizationPage />
              </Route>
              <Route exact path="/message">
                <MessagePage />
              </Route>
              <Route exact path="/export">
                <ExportPage />
              </Route>
            </Col>
          </Row>
        </Container>
      </Router>
    </DataContextProvider>

  );
}

//import { Footer } from './pages/layout/footer/Footer';  temporarily removed Footer from site 

export default App;
