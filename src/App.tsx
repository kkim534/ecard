import React from 'react';
import './App.css';
import { Home } from './pages/home-page/Home';
import { ContactsPage } from './pages/contacts-page';
import DataContextProvider from './contexts/data-context';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { NavMenu } from './pages/home-page/NavMenu';

const App: React.FC = () => {
  return (
    <div className="App">
      <DataContextProvider>
        <Router>
          <NavMenu/>
          <div>
          <Route exact path="/">
            <Home/> 
            </Route>
          <Route exact path="/AddContact">
            <ContactsPage/>
            </Route>
            </div>
        </Router>
      </DataContextProvider>
    </div>
  );
}

export default App;
