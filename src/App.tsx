import React from 'react';
import './App.css';
import { Home } from './pages/home-page/Home';
import { ContactsPage } from './pages/contacts-page';
import DataContextProvider from './contexts/data-context';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { NavMenu } from './pages/home-page/NavMenu';
import EventsPage from './pages/events-page/events';
import { MessagePage } from './pages/message-page/message';
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
            <Route exact path="/addContact">
              <ContactsPage />
            </Route>
            <Route exact path="/message">
              <MessagePage />
            </Route>
          </div>
        </Router>
      </DataContextProvider>
    </div>
  );
}


export default App;
