import React, {useState, useContext} from 'react';
import './message.css';
import { Form, FormGroup,Col, Button } from 'react-bootstrap';
// import {message} from './message-model';

// import { Button} from 'react-bootstrap';
// import {DataContext} from '../../contexts/data-context';


export interface messages {
    EventID: string;
    SenderID: Int8Array,
    RecipientID: Int8Array,
    message: string
}

//Submit EventMessage
//const handleSubmit = (evt:any) => 

export const MessagePage: React.FunctionComponent = (props:any) => {

    let[EventID,setEventID] = useState(" ")
    let[SenderID,setSenderID]= useState(" ")
    let[RecipientID,setRecipientID]= useState(" ")
    let[message,setMessage]= useState(" ")


    return(
        <>
        <div>
            <h1>(EventName)</h1>
            <form>
                <div class = "form-group"
                </div>
            </form>

        
        </div>
        

        </>
    )
}; 










