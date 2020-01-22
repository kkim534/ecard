import React, { useState,useEffect } from "react";
import "./contacts.css";
import {Button} from "react-bootstrap"

export const ContactsPage: React.FunctionComponent = (props: any) => {
    // let { contacts, recipients } = props
   const initialStateValue = [{ id: 0, name: " --- Select A Organisation --- "}];
    const[organisationList,setOrganisationList] = useState(initialStateValue);
     const [errors, setErrors] = useState([{name: ""}]);
    useEffect(() =>{
        if(organisationList.length == 1)
        {
        fetch("http://datacomecarduat.azurewebsites.net/api/Organisations")
            .then(response => response.json())
            .then(data => {
                setOrganisationList(data);
            });
        }
    },[organisationList]);
    function validateForm(event:any)
    {
        var  validEmailRegex =
            RegExp(/^(([^<>()\[\]\.,;:\s@\“]+(\.[^<>()\[\]\.,;:\s@\“]+)*)|(\“.+\“))@(([^<>()[\]\.,;:\s@\“]+\.)+[^<>()[\]\.,;:\s@\“]{2,})$/i);
            if (!validEmailRegex.test(event.target["Email"].value)) {
               setErrors([
                   ...errors,
                    {
                        name:"Email is not in valid format"

                    }
                ]);
            }
    }
    // let handleChange = (e) => {
    //     let name = e.target.name;
    //     let value = e.target.value;
    //   }
    const handleSubmit = (evt: any) => {
        evt.preventDefault();
        const data = new FormData(evt.target);
        var FN = evt.target["FirstName"].value;
        var LN = evt.target["Surname"].value;
        validateForm(evt);
        if(errors.length > 1)
        {
            var consolidatedError = '';
            for(let i=0; i<= errors.length-1;i++){
                if(errors[i].name != "")
                consolidatedError = consolidatedError + "\n" + errors[i].name;
            }
            alert(consolidatedError);
            return;
        }
        fetch("https://datacomecarduat.azurewebsites.net/api/People",{
            method: "Post",
            body: data,
        }).then(response => response)
            .then((responseJson) => {
                if(responseJson.status === 200)
                    alert("Contact " + FN + "" + LN + "created successfully");
                else
                alert("Error while creating contact");
               })
    }
    return (
        <>
        <form onSubmit={handleSubmit} >
        <div className="form-group row">
        <label className= "control-label col-sm-1" htmlFor="FirstName">First Name</label>
                    <div className= "col-md-3">
                        <input className= "form-control" type="text" minLength={2} maxLength={50} name= "FirstName" required />
                    </div>
        </div>
        <div className= "form-group row">
        <label className= "control-label col-sm-1" htmlFor= "Surname">Last Name</label>
                    <div className="col-md-3">
                        <input className= "form-control" type= "text" minLength={2} maxLength={50} name= "Surname" required />
                    </div>
        </div>
        <div className= "form-group row">
        <label className= "control-label col-sm-1" htmlFor= "Email" >Email</label>
                    <div className= "col-md-3">
                        <input className= "form-control" type= "text"  maxLength={100} name= "Email" required />
                    </div>
        </div>
        <div className= "form-group row">
        <label className= "control-label col-sm-1" htmlFor= "Role">Role</label>
                    <div className= "col-md-3">
                        <input className= "form-control" type= "text" minLength={2} maxLength={50} name= "Role" required />
                    </div>
        </div>
        <div className= "form-group row">
        <label className= "control-label col-sm-1" htmlFor= "Organisation">Organisation</label>
                    <div className= "col-md-3">
                    <select className= "form-control" data-val= "true" name= "OrganisationId"  required>
                            {/* <option value=“”>--Select Organisation--</option> */}
                            {organisationList.map(org =>
                                <option key={org.id} value={org.id}>{org.name}</option>
                            )}
                        </select>
                    </div>
        </div>
        <div className= "form-group row">
        <label className= "control-label col-sm-1" htmlFor="Department">Department</label>
                    <div className="col-md-3">
                        <input className="form-control" type="text" name="Department" />
                    </div>
        </div>
        <div className="form-group row">
        <label className="control-label col-sm-1" htmlFor="Team">Team</label>
                    <div className="col-md-3">
                        <input className="form-control" type="text"name="Team" />
                    </div>
        </div>
                <div className="form-group row">
                    <div className="col-md-3">
                        <Button type="submit" className="btn-btn"> Submit</Button>
                        <Button type="reset" className="btn-btn"> Cancel</Button>
                    </div>
                </div>
            </form>
        </>
    )
}
export default ContactsPage;