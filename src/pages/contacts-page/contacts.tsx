import React, { useState, useContext } from 'react'
import { Contact } from './contact-model'
import { TextField, Button, Icon } from '@material-ui/core';
import { DataContext } from '../../contexts/data-context';



export const ContactsPage: React.FunctionComponent = (props: any) => {
    // let { contacts, recipients } = props

    let { data, setData } = useContext(DataContext);
    const [ContactList, setContacts] = useState(data.contacts)
    
    let [firstName, setFirstName] = useState(" ")
    

    function addContact(name: string) {
        var nameSplit = name.split(" ");
        let person = {
            firstName: nameSplit[0],
            lastName: nameSplit[1],
            email: nameSplit[2],
            role:nameSplit[3]
        } as Contact 
        
        setContacts(data.contacts = [...ContactList, person])
        setData({contacts: data.contacts});
    }

    return (
        <>
            <TextField
                inputProps={{
                    'data-testid':"nameinput"
                }}
                id="outlined-basic"                
                label={"Contact"}
                onChange={(ev) => {
                    setFirstName(firstName = ev.target.value)}
                }
            />
            <Button
                data-testid="addbutton"
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