import React, { useState, useEffect } from "react";
import { Container, Button, Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import {
    SortingState, PagingState, IntegratedSorting, IntegratedPaging,
    IntegratedFiltering, SearchState
} from '@devexpress/dx-react-grid';
import {
    Grid, Table, TableHeaderRow, PagingPanel,
    Toolbar, SearchPanel
} from '@devexpress/dx-react-grid-bootstrap4';
import "./contacts.css";

export const ContactsPage: React.FunctionComponent = (props: any) => {
    // let { contacts, recipients } = props

    const initialStateValue = [{ id: 0, name: " --- Select A Organisation --- " }];
    const [organisationList, setOrganisationList] = useState(initialStateValue);

    const [peopleList, setPeopleList] = useState([{ id: 0, firstName: "", surname: "", email: "", role: "", department: "", team: "" }]);
    const [people, setPeople] = useState({ id: 0, firstName: "", surname: "", email: "", organisationid: 0, role: "", department: "", team: "" });

    const [errors, setErrors] = useState([{ name: "" }]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //const handlePeople = () => setPeople(people);

    useEffect(() => {
        if (peopleList.length === 1) {
            fetch("https://datacomecarduat.azurewebsites.net/api/People", {
                headers: {
                    'ApiKey': '99d73981-632e-4aa7-8499-169e5da08ef3'
                }
            })
                .then(response => response.json())
                .then(data => {
                    setPeopleList(data);
                });
        }
    }, [peopleList]);


    useEffect(() => {
        if (organisationList.length === 1) {
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
            RegExp(/^(([^<>()[\].,;:\s@“]+(\.[^<>()[\].,;:\s@“]+)*)|(“.+“))@(([^<>()[\].,;:\s@“]+\.)+[^<>()[\].,;:\s@“]{2,})$/i);
        if (!validEmailRegex.test(event.target["Email"].value)) {
            setErrors([
                ...errors,
                {
                    name: "Email is not in valid format"

                }
            ]);
        }
    }


    function showAddContact() {
        setPeople({ id: 0, firstName: "", surname: "", email: "", organisationid: 0, role: "", department: "", team: "" });
        handleShow();
    }

    const handleSubmit = (evt: any) => {
        evt.preventDefault();
        const data = new FormData(evt.target);
        var verb = "";
        var successMessage = "";
        // var id = evt.target["Id"].value;
        var FN = evt.target["FirstName"].value;
        var LN = evt.target["Surname"].value;
        if (true) {
            verb = "Post";
            successMessage = "Contact " + FN + " " + LN + " created successfully"
        }
        else {
            verb = "Put";
            successMessage = "Contact " + FN + " " + LN + " Modified successfully"
        }

        validateForm(evt);
        if (errors.length > 1) {
            var consolidatedError = '';
            for (let i = 0; i <= errors.length - 1; i++) {
                if (errors[i].name !== "")
                    consolidatedError = consolidatedError + "\n" + errors[i].name;
            }
            alert(consolidatedError);
            return;
        }
        fetch("https://datacomecarduat.azurewebsites.net/api/People", {
            headers: {
                'ApiKey': '99d73981-632e-4aa7-8499-169e5da08ef3'
            },
            method: verb,
            body: data,
        }).then(response => response)
            .then((responseJson) => {
                if (responseJson.status === 200) {
                    alert(successMessage);
                    fetch("https://datacomecarduat.azurewebsites.net/api/People", {
                        headers: {
                            'ApiKey': '99d73981-632e-4aa7-8499-169e5da08ef3'
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            setPeopleList(data);
                        });
                    handleClose();
                }
                else
                    alert("Error while creating contact");
            })
    }

    const [columns] = useState([
        { name: 'firstName', title: 'First name' },
        { name: 'surname', title: 'Surname' },
        { name: 'email', title: 'Email' },
        { name: 'role', title: 'Role' },
        { name: 'organisation', title: 'Organisation' },
        { name: 'department', title: 'Department' },
        { name: 'team', title: 'Team' },
    ]);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{"Add Contact"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <input type="hidden" id="Id" name="Id" defaultValue={people.id} ></input> */}
                    <form id="Contactform" onSubmit={handleSubmit} >
                        <div className="form-group row">
                            <label className="control-label col-sm-4" htmlFor="FirstName">First Name</label>
                            <div className="col-md-8">
                                <input id="FirstName" className="form-control" type="text" minLength={1} maxLength={50} defaultValue={people.firstName} name="FirstName" required />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className=" control-label col-sm-4" htmlFor="Surname">Last Name</label>
                            <div className="col-md-8">
                                <input id="Surname" className="form-control" type="text" minLength={1} maxLength={50} defaultValue={people.surname} name="Surname" required />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="control-label col-sm-4" htmlFor="Email">Email</label>
                            <div className="col-md-8">
                                <input id="Email" className="form-control" type="text" maxLength={100} defaultValue={people.email} name="Email" required />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="control-label col-sm-4" htmlFor="Role">Role</label>
                            <div className="col-md-8">
                                <input id="Role" className="form-control" type="text" minLength={2} maxLength={50} defaultValue={people.role} name="Role" required />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="control-label col-sm-4" htmlFor="Organisation">Organisation</label>
                            <div className="col-md-8">
                                <select id="OrganisationId" className="form-control" data-val="true" defaultValue={people.organisationid} name="OrganisationId" required>
                                    <option key={0} value={0}>Please Select an Organisation</option>
                                    {organisationList.map(org =>
                                        <option key={org.id} value={org.id}>{org.name}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className=" control-label col-sm-4" htmlFor="Department">Department</label>
                            <div className="col-md-8">
                                <input id="Department" className="form-control" type="text" defaultValue={people.department} name="Department" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className=" control-label col-sm-4" htmlFor="Team">Team</label>
                            <div className="col-md-8">
                                <input id="Team" className="form-control" type="text" name="Team" defaultValue={people.team} />
                            </div>
                        </div>
                        <div>
                            <Row className="justify-container">

                                <Col md="4"></Col>
                                <Col md="7">
                                    <div >
                                        <Button type="submit" className="btn-btn page-btn ">Submit</Button>
                                        <Button type="reset" className="btn-btn page-btn">Clear</Button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Container fluid id="contacts-container">
                <div className="heading-container">
                    <h1>Contacts</h1>
                </div>

                <div className="content">

                    <Row className="justify-content-md-center">
                        <Col><Button variant="primary" className="float-right" onClick={showAddContact}>Create Contact</Button></Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="card">
                                <Grid rows={peopleList} columns={columns}>
                                    <PagingState
                                        defaultCurrentPage={0}
                                        pageSize={10}
                                    />
                                    <IntegratedPaging />
                                    <SearchState defaultValue="" />
                                    <IntegratedFiltering />
                                    <SortingState
                                        defaultSorting={[{ columnName: 'firstName', direction: 'asc' }]}
                                    />
                                    <IntegratedSorting />
                                    <Table />
                                    <TableHeaderRow showSortingControls />
                                    <Toolbar />
                                    <SearchPanel />
                                    <PagingPanel />
                                </Grid>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>






        </>

    )
}
export default ContactsPage;
