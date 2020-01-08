import React from 'react';
import './App.css';
import { ContactsPage } from './pages/contacts-page';
import DataContextProvider from './contexts/data-context';

const App: React.FC = () => {
  return (
    <div className="App">
      <DataContextProvider>
        <ContactsPage />
      </DataContextProvider>
    </div>
  );
}

export default App;
