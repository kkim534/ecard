import React from 'react';
import './App.css';
import { Home } from './pages/home-page/Home';
import { ContactsPage } from './pages/contacts-page';
import DataContextProvider from './contexts/data-context';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { NavMenu } from './pages/layout/navbar/NavMenu';
import { Footer } from './pages/layout/footer/Footer';
import { MessagePage } from './pages/message-page/message';
import { OrganisationPage } from './pages/organization-page/organization';
import { CreateEvent } from './pages/events-page/CreateEvent';
import { ExportPage } from './pages/export-page/export';

const App: React.FC = () => {
  return (
    <div className="App">
      <DataContextProvider>
        <Router>
          <NavMenu />
          <div>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/contact">
              <ContactsPage />
            </Route>
            <Route exact path="/event">
              <CreateEvent />
            </Route>
            <Route exact path="/organisation">
              <OrganisationPage />
            </Route>
            <Route path="/message/:eventId">
              <MessagePage />
            </Route>
            <Route exact path="/export">
              <ExportPage />
            </Route>
          </div>
          <Footer />
        </Router>
      </DataContextProvider>
    </div>
  );
}

export default App;
