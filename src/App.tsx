import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ContactsPage } from './pages/contacts-page';
import { Contact, ContactProps} from './pages/contacts-page/contact-model';


let person = {
  firstName: "Jiyoung",
  lastName: "Park",
  email: "test@live.com",
  role: "Datacom"
} as Contact


let dummyContactProps = {
  contacts: [person],
  recipients: [person, person, person]
} as ContactProps





const App: React.FC = () => {
  return (
    <div className="App">
      <ContactsPage {...dummyContactProps}/>
    </div>
  );
}


export default App;
