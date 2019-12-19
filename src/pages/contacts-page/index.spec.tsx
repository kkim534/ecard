import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ContactsPage } from '.';
import { ContactProps, Contact } from './contact-model';
import { DataContext, DataModel } from './../../contexts/data-context';

const contactPageProps = {
  contacts: [
    {
      email: "test@test.est",
      firstName: "test",
      lastName: "test",
      role: "tester"
    }
  ],
  recipients: [
    {
      email: "test@test.est",
      firstName: "test",
      lastName: "test",
      role: "tester"
    }
  ]
} as ContactProps

test('add a contact', () => {
  let myContacts: Array<Contact> = [...contactPageProps.contacts]
  const setContacts = (newData: Partial<DataModel>) => {
    myContacts = newData.contacts!
  };
  const wrapper = render(
    <DataContext.Provider value={{data: {contacts: myContacts}, setData:setContacts}}>
      <ContactsPage/>
    </DataContext.Provider>
  );
  // const nameInput = wrapper.queryByTestId("nameinput");
  // const input = nameInput!.querySelector("input")!;
  const nameinput = wrapper.getByTestId("nameinput");
  // const input = nameinput.getElementsByTagName("input").item;
  const addbutton = wrapper.getByTestId("addbutton");

  fireEvent.change(nameinput, {
    target:{value:"i am testing here"}
  })
  fireEvent.click(addbutton);
  
  const result = myContacts.find((el) => {
    return el.firstName === "i" &&
    el.lastName === "am" &&
    el.email === "testing" &&
    el.role === "here"
  });
  expect(result).toBeDefined();
});
