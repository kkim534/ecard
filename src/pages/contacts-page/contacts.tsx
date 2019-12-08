import React, { useState } from 'react'
import { ContactProps, Contact } from './contact-model'
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';


export const ContactsPage: React.FunctionComponent<ContactProps> = (props: ContactProps) => {
    const { contacts, recipients } = props
    let [ firstName, setFirstName ] = useState("First name")
    return (
        <>
            <TextField 
                id="outlined-basic" 
                label={firstName} 
                onChange={(ev) => setFirstName(firstName = ev.target.value)}
            />
            <h1>{contacts[0].firstName}</h1>
            <h1>{recipients[0].lastName}</h1>
        </>
    )
}

export default ContactsPage;