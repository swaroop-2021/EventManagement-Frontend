import React, { useEffect } from 'react';
import { useState } from 'react';
import validator from "validator";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from "react-router-dom";
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
  }
  from 'mdb-react-ui-kit';
import authService from '../services/auth.service';
// import "./signup.css";
// import "https://unicons.iconscout.com/release/v4.0.0/css/line.css";
function Signup () {
    const navigate=useNavigate();
    const [values,setValues]=useState({
        name:"",
        email:"",
        password:"",
        department:"",
        phoneNumber:"",
        semester:1,
        gender:"",
        userType:"",
        usn:"",
    });

    const [nameError,setNameError]=useState("");
    const [emailError,setEmailError]=useState("");
    const [passwordError,setPasswordError]=useState("");
    const [departmentError,setDepartmentError]=useState("");
    const [phonenumberError,setPhonenumberError]=useState("");
    const [semesterError,setSemesterError]=useState("");
    const [genderError,setGenderError]=useState("");
    const [userTypeError,setUserTypeError]=useState("");
    const [usnError,setUsnError]=useState("");
    const [authError,setAuthError]=useState("");
    
    useEffect(() => {
        if(authService.getCurrentUser())
        {
            navigate("/");
        }
    }, [authError]);

    const handleNameInputChange=(event)=>{
        setValues(values=>({...values,name:event.target.value}))
        if(event.target.value.length<4){
            setNameError("Name length should be minimum 4 ");
        }
        else{
            setNameError(null);
        }
    }
    const handleEmailInputChange=(event)=>{
        setValues(values=>({...values,email:event.target.value}))
        if(!validator.isEmail(event.target.value)){
            setEmailError("Invalid Email ID");
        }
        else{
            setEmailError(null);
        }
    }
    const handlePasswordInputChange=(event)=>{
        setValues(values=>({...values,password:event.target.value}))
        if(event.target.value.length<7){
            setPasswordError("Password length should be minimum 7");
        }
        else{
            setPasswordError(null);
        }
    }
    const handleDepartmentInputChange=(event)=>{
        setValues(values=>({...values,department:event.target.value}))
        if(event.target.value.length<4){
            setDepartmentError("Department length should be minimum 4 ");
        }
        else{
            setDepartmentError(null);
        }
    }
    const handleSemesternumberInputChange=(event)=>{
        setValues(values=>({...values,semester:event.target.value}))
        if(event.target.value>8 || event.target.value<0){
            setSemesterError("Invalid Semester");
        }
        else{
            setSemesterError(null);
        }
    }
    const handleGenderInputChange=(event)=>{
        setValues(values=>({...values,gender:event.target.value}))
        if(event.target.value==="male" || event.target.value==="female"){
            setGenderError(null);
        }
        else{
            setGenderError("Invalid Gender");
        }
    }
    const handleUserTypeInputChange=(event)=>{
        setValues(values=>({...values,userType:event.target.value}))
        if(event.target.value.length<4){
            setUserTypeError("UserType length should be minimum 4 ");
        }
        else{
            setUserTypeError(null);
        }
    }
    const handleUsnInputChange=(event)=>{
        setValues(values=>({...values,usn:event.target.value}))
        if(event.target.value.length<4){
            setUsnError("usn length should be minimum 4 ");
        }
        else{
            setUsnError(null);
        }
    }
    const handlePhoneNumberInputChange=(event)=>{
        setValues(values=>({...values,phoneNumber:event.target.value}))
        if(event.target.value.toString().length<10){
            setPhonenumberError("Number length should be minimum 10 ");
        }
        else{
            setPhonenumberError(null);
        }
    }

    const signUp=(event)=>{
        // event.preventDefault();
        if(values.name.length<4){
            setNameError("Name length should be minimum 4 ");
        }
        else{
            setNameError(null);
        }
        
        if(!validator.isEmail(values.email)){
            setEmailError("Invalid Email ID");
        }
        else{
            setEmailError(null);
        }
        
        if(values.password.length<7){
            setPasswordError("Password length should be minimum 7");
        }
        else{
            setPasswordError(null);
        }
        
        if(values.department.length<4){
            setDepartmentError("Department length should be minimum 4 ");
        }
        else{
            setDepartmentError(null);
        }
        
        if(values.semester<0 || values.semester>8){
            setSemesterError("Invalid Semester");
        }
        else{
            setSemesterError(null);
        }
        
        if(values.gender==="male" || values.gender==="female"){
            setGenderError(null);
        }
        else{
            setGenderError("Invalid Gender");
        }
        
        if(values.name.length<4){
            setUserTypeError("UserType length should be minimum 4 ");
        }
        else{
            setUserTypeError(null);
        }
        
        if(values.usn.length<4){
            setUsnError("usn length should be minimum 4 ");
        }
        else{
            setUsnError(null);
        }
        
        if(values.phoneNumber.toString().length<10){
            setPhonenumberError("Number length should be minimum 10 ");
        }
        else{
            setPhonenumberError(null);
        }

        if(!nameError && !emailError && !passwordError && !departmentError && !phonenumberError && !semesterError && !genderError && !userTypeError && !usnError){   
            console.log("hello"); 
            fetch("http://"+process.env.REACT_APP_API_URL + "register",{
                    method: 'POST',
                    body: JSON.stringify({values}),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    }
                })
                .then(res=>{return res.json()})
                .then(data=>{
                    console.log(data);
                    if(data.message && data.message==="Signed Up Successfully")
                    {
                        setAuthError("");
                        alert("Signed Up Successfully");
                        navigate("/login");
                    }
                    else if(!data.message){
                        console.log(data.error);
                        setAuthError(data.error);
                    }
                    else{
                        setAuthError(data.message);
                    }
                })
                .catch(err=>console.log(err));
        }
    }
    
	return(
        
        <MDBContainer className="my-5">
                
    <MDBCard alignment='center'>
    <MDBRow className='align-items-center justify-content-center g-0'>

        

        <MDBCol md='6'>
        <MDBCardBody className=' d-flex flex-column'></MDBCardBody>
        
        <div className='d-flex flex-row mt-2'>
            <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
            <span className="h1 fw-bold" alignment='center'>Registration Form </span>
        </div>


        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Full Name' id='name' type='text' size="lg" required value={values.name} onChange={handleNameInputChange} />
        <small>{nameError}</small>
        
        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Email' id='email' type='text' size="lg" required value={values.email} onChange={handleEmailInputChange}/>
        <small>{emailError}</small>

        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Gender' id='gender' type='text' size="lg" required value={values.gender} onChange={handleGenderInputChange} />
        <small>{genderError}</small>


        {/* <div style={{display:"flex"}}>

            <div>
                <DropdownButton size="lg" id="dropdown-basic-button" title="Gender">
                    <Dropdown.Item eventKey="1">male</Dropdown.Item>
                    <Dropdown.Item eventKey="2">female</Dropdown.Item>
                </DropdownButton>
            </div>

            <div>
                <DropdownButton size="lg" id="dropdown-basic-button" title="User Type">
                    <Dropdown.Item  evetKey="1">user</Dropdown.Item>
                    <Dropdown.Item  evetKey="2">organizer</Dropdown.Item>
                </DropdownButton>
            </div>
        </div>

        <br /> */}


        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Mobile Number' id='number' type='number' size="lg" required  onChange={handlePhoneNumberInputChange}/>
        <small>{phonenumberError}</small>

        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Department' id='department' type='text' size="lg" required value={values.department} onChange={handleDepartmentInputChange}/>
        <small>{departmentError}</small>
        
        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='USN' id='usn' type='text' size="lg" required value={values.usn} onChange={handleUsnInputChange}/>
        <small>{usnError}</small>
        
        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Password' id='password' type='password' size="lg" required value={values.password} onChange={handlePasswordInputChange}/>
        <small>{passwordError}</small>
        
        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Semester' id='semester' type='numbe' size="lg"  required  onChange={handleSemesternumberInputChange}/>
        <small>{semesterError}</small>

        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Type' id='type' type='text' size="lg" required value={values.userType} onChange={handleUserTypeInputChange} />
        <small>{userTypeError}</small>
       
        <button className="mb-4 px-5 btn btn-primary" id="submit" size='lg' onClick={signUp}>REGISTER</button>
        <small id="auth-error">{authError}</small>
        
        
  
    </MDBCol>
    
    </MDBRow>
    </MDBCard>
</MDBContainer>
    );
}
export default Signup;
