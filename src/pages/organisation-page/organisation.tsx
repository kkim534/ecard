import React from 'react';
import {Row,Col,Form,Button} from 'react-bootstrap'; 


export const OrganisationPage: React.FunctionComponent = (props: any) => {
   
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
    return (
          <>
            <div className = "container">
            <h2>Create an Organisation</h2>
                <Row>
                    <Col>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label column sm="2">Organisation Name</Form.Label>
                                <Col sm="10">
                                    <input type="text" className="form-control" minLength={1} maxLength={150} name="Name" required />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label column sm="2">Organisation Address</Form.Label>
                                <Col sm="10">
                                    <textarea className="form-control" name="Address" aria-label="Address"></textarea>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col sm={{ span: 10, offset: 2 }}>
                                    <Button type="submit" className="btn-btn">Create</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </div>
        </>
    )
};

