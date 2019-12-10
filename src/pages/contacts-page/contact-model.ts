export interface ContactProps {
    contacts: Contact[],
    recipients: Contact[]
}


export interface Contact {
    firstName: string,
    lastName: string,
    email: string,
    role: string
}




