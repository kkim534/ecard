import React, { useState } from 'react'
import { ContactProps, Contact } from './contact-model'
import { TextField, Fab, Button, Icon } from '@material-ui/core';



export const ContactsPage: React.FunctionComponent<ContactProps> = (props: ContactProps) => {
    const { contacts, recipients } = props


    let [ContactList, setContacts] = useState(props.contacts)
    
    let [firstName, setFirstName] = useState(" ")
    

    function addContact(name: string) {
        var nameSplit = name.split(" ");
        let person = {
            firstName: nameSplit[0],
            lastName: nameSplit[1],
            email: nameSplit[2],
            role:nameSplit[3]
        } as Contact 
        
        let NewContacts = [...ContactList]
        NewContacts.push(person)
        setContacts(NewContacts)
        // state - updates an array of list 

        //props.contacts.push(person);
        alert("Contacts successfully added!");
    }

    return (
        <>
            <TextField
                id="outlined-basic"
                label={"Contact"}
                onChange={(ev) => setFirstName(firstName = ev.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                className={"test"}
                endIcon={<Icon>add</Icon>}
                onClick={() => addContact(firstName)}
            >
                Add Contacts
            </Button>
            <div>
                {ContactList.map((s,i) => <div key={i}>{s.firstName + " " + s.lastName + " " + s.email + " " + s.role}</div>)}
            </div>
        </>
        
    )
}



export default ContactsPage;