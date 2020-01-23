import React, { useState, useEffect } from "react";
import "./contacts.css";
import {Button,Col,Row} from 'react-bootstrap';
export const ContactsPage: React.FunctionComponent = (props: any) => {
    // let { contacts, recipients } = props

    const initialStateValue = [{ id: 0, name: " --- Select A Organisation --- " }];
    const [organisationList, setOrganisationList] = useState(initialStateValue);
    const [errors, setErrors] = useState([{ name: "" }]);
    useEffect(() => {
        if (organisationList.length == 1) {
            fetch("https://datacomecarduat.azurewebsites.net/api/Organisations", {
                headers: {
                    'ApiKey': '99d73981-632e-4aa7-8499-169e5da08ef3'
                }
            }) 
                .then(response => response.json())
                .then(data => {
                    setOrganisationList(data);
                });
        }
    }, [organisationList]);
    function validateForm(event: any) {
        var validEmailRegex =
            RegExp(/^(([^<>()\[\]\.,;:\s@\“]+(\.[^<>()\[\]\.,;:\s@\“]+)*)|(\“.+\“))@(([^<>()[\]\.,;:\s@\“]+\.)+[^<>()[\]\.,;:\s@\“]{2,})$/i);
        if (!validEmailRegex.test(event.target["Email"].value)) {
            setErrors([
                ...errors,
                {
                    name: "Email is not in valid format"

                }
            ]);
        }
    }

    const handleSubmit = (evt: any) => {
        evt.preventDefault();
        const data = new FormData(evt.target);
        var FN = evt.target["FirstName"].value;
        var LN = evt.target["Surname"].value;
        validateForm(evt);
        if (errors.length > 1) {
            var consolidatedError = '';
            for (let i = 0; i <= errors.length - 1; i++) {
                if (errors[i].name != "")
                    consolidatedError = consolidatedError + "\n" + errors[i].name;
            }
            alert(consolidatedError);
            return;
        }
        fetch("https://datacomecarduat.azurewebsites.net/api/People", {
            headers: {
                'ApiKey': '99d73981-632e-4aa7-8499-169e5da08ef3'
            },
            method: "Post",
            body: data,
        }).then(response => response)
            .then((responseJson) => {
                if (responseJson.status === 200)
                    alert("Contact " + FN + " " + LN + " created successfully");
                else
                    alert("Error while creating contact");
            })
    }
    return (
        <>
            <form onSubmit={handleSubmit} >
                <div className="form-group row">
                    <label className="control-label col-sm-6" htmlFor="FirstName">First Name</label>
                    <div className="col-md-3">
                        <input className="form-control" type="text" minLength={1} maxLength={50} name="FirstName" required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className=" control-label col-sm-6" htmlFor="Surname">Last Name</label>
                    <div className="col-md-3">
                        <input className="form-control" type="text" minLength={1} maxLength={50} name="Surname" required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className=" control-label col-sm-6" htmlFor="Email">Email</label>
                    <div className="col-md-3">
                        <input className="form-control" type="text" maxLength={100} name="Email" required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className=" control-label col-sm-6" htmlFor="Role">Role</label>
                    <div className="col-md-3">
                        <input className="form-control" type="text" minLength={5} maxLength={50} name="Role" required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className=" control-label col-sm-6" htmlFor="Organisation">Organisation</label>
                    <div className="col-md-3">
                        <select className="form-control" data-val="true" name="OrganisationId" required>
                            {organisationList.map(org =>
                                <option key={org.id} value={org.id}>{org.name}</option>
                            )}
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label className=" control-label col-sm-6" htmlFor="Role">Department</label>
                    <div className="col-md-3">
                        <input className="form-control" type="text" name="Department" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className=" control-label col-sm-6" htmlFor="Team">Team</label>
                    <div className="col-md-3">
                        <input className="form-control" type="text" name="Team" />
                    </div>
                </div>
                <div>
                    <Row className="justify-container">
                        <Col md="7"></Col>
                        <Col md="2">
                            <div className="float-right">
                                <Button type="submit" className="page-btn ">Submit</Button>
                                <Button type="reset" className="page-btn">Clear</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </form>
        </>

    )
}
export default ContactsPage;
