import React, { useState, useContext } from 'react'
import { Contact } from './contact-model'
import { TextField, Button, Icon } from '@material-ui/core';
import { DataContext } from '../../contexts/data-context';

export const ContactsPage: React.FunctionComponent = (props: any) => {
    // let { contacts, recipients } = props

    let { data, setData } = useContext(DataContext);
    const [ContactList, setContacts] = useState(data.contacts)
    
    let [firstName, setFirstName] = useState(" ")
    let [lastName, setLastName] = useState(" ")
    let [email, setEmail] = useState(" ")
    let [role, setRole] = useState(" ")
    
    function addContact(firstName: string, lastName: string, email: string, role: string) {
        let person = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            role: role
        } as Contact 
        
        setContacts(data.contacts = [...ContactList, person])
        setData({contacts: data.contacts});
    }

    return (
        <>
            <div>
                <TextField
                    inputProps={{
                        'data-testid':"nameinput"
                    }}
                    id="first-name"                
                    label={"First Name"}
                    onChange={(ev) => {
                        setFirstName(firstName = ev.target.value)}
                    }
                />
                <TextField
                    inputProps={{
                        'data-testid':"nameinput"
                    }}
                    id="last-name"                
                    label={"Last Name"}
                    onChange={(ev) => {
                        setLastName(lastName = ev.target.value)}
                    }
                />
                <TextField
                    inputProps={{
                        'data-testid':"nameinput"
                    }}
                    id="email"                
                    label={"Email"}
                    onChange={(ev) => {
                        setEmail(email = ev.target.value)}
                    }
                />
                <TextField
                    inputProps={{
                        'data-testid':"nameinput"
                    }}
                    id="role"                
                    label={"Role"}
                    onChange={(ev) => {
                        setRole(role = ev.target.value)}
                    }
                />                                
            </div>
            <div>
                <Button
                    data-testid="addbutton"
                    variant="contained"
                    color="primary"
                    className={"test"}
                    endIcon={<Icon>add</Icon>}
                    onClick={() => addContact(firstName, lastName, email, role)}
                >
                    Add Contact
                </Button>
            </div>
            <div>
                {ContactList.map((s,i) => <div key={i}>{s.firstName + " " + s.lastName + " " + s.email + " " + s.role}</div>)}
            </div>
        </>
        
    )
}

export default ContactsPage;