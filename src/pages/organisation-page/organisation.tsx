
import React, { useState,useEffect } from 'react';
import { Row, Col, Form, Button, Modal, Container } from 'react-bootstrap';
import { SortingState, PagingState, IntegratedSorting, IntegratedPaging, IntegratedFiltering, SearchState } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, PagingPanel, Toolbar, SearchPanel } from '@devexpress/dx-react-grid-bootstrap4';
import "./organisation.css";


export const OrganisationPage: React.FunctionComponent = (props: any) => {
    const [organisationList, setOrganisationList] = useState([{ id: 0, name: "", address: "" }])
    const [organisation, setOrganisation] = useState({ id: 0, name: "", address: "" })
    //const[errors, setErrors] = useState([{name:""}]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(()=>{
        if (organisationList.length ===1){
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

    const handleSubmit = (e: any) => {
        e.preventDefault(); //prevent browser refresh

        let org = new FormData(e.target);
        fetch("https://datacomecarduat.azurewebsites.net/api/Organisations", {
            headers: {
                'ApiKey': '99d73981-632e-4aa7-8499-169e5da08ef3'
            },
            method: "Post",
            body: org,
        }).then(response => response)
            .then((responseJson) => {
                if (responseJson.status === 200)
                    alert("Organisation created successfully");
                else
                    alert("Error while creating an organisation");
            })
    }
    const [columns] = useState([
        { name: "name", title: "Organisation Name" },
        { name: "address", title: "Organisation Address" }
    ]);

    function showAddOrganisation() {
        setOrganisation({ id: 0, name: "", address: "" });
        handleShow();
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{"Create Organisation"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="2">Organisation Name</Form.Label>
                            <input type="text" className="form-control" minLength={1} maxLength={150} name="Name" required />
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="2">Organisation Address</Form.Label>
                            <textarea className="form-control" name="Address" aria-label="Address" ></textarea>
                        </Form.Group>
                        <div>
                            <Button type="submit" className="btn-btn page-btn">Create</Button>
                            <Button type="reset" className="btn-btn page-btn">Clear</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col><h4>Organisations</h4></Col>
                    <Col><Button variant="primary" className="float-right" onClick={showAddOrganisation}>Create Organisation</Button></Col>
                </Row>
                <Row>
                    <Col>
                        <div className="card">
                            <Grid rows={organisationList} columns={columns}>
                                <PagingState
                                    defaultCurrentPage={0}
                                    pageSize={10}
                                />
                                <IntegratedPaging />
                                <SearchState defaultValue="" />
                                <IntegratedFiltering />
                                <SortingState defaultSorting={[{ columnName: "Name", direction: "asc" }]} />
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
            </Container>
        </>
    )
};
