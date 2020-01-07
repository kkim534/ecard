import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ContactsPage } from './pages/contacts-page';
import { Contact, ContactProps} from './pages/contacts-page/contact-model';
import DataContextProvider from './contexts/data-context';


// let person = {
//   firstName: "Jiyoung",
//   lastName: "Park",
//   email: "test@live.com",
//   role: "Datacom"
// } as Contact


// let dummyContactProps = {
//   contacts: [person],
//   recipients: [person, person, person]
// } as ContactProps





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
