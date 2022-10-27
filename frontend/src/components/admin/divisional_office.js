
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBModal, MDBCardBody, MDBIcon, MDBCardText, MDBModalDialog ,MDBModalBody ,MDBModalFooter,MDBModalContent,MDBModalHeader,MDBModalTitle, MDBBtn, MDBCol, MDBRow , MDBCardTitle, MDBCardFooter} from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';
import axios from 'axios';
import {PatternFormat} from 'react-number-format';
import Navbar from "./adminNav";
import passwordValidator from 'password-validator';
var schema = new passwordValidator();

function AdminDashboard() {
    
    schema
    .is().min(4)                               
    .is().max(100)                             
    .has().uppercase()                         
    .has().lowercase()                         
    .has().digits(2)       
    .has().not().spaces()  
    .is().not().oneOf(['Passw0rd', 'Password123']);


    const [deoAdd, setDeoAdd] = useState(false);
    const toggleShow = () => setDeoAdd(!deoAdd);

    
    const [deoEdit, setDeoEdit] = useState(false);
    const toggleShowEdit = () => setDeoEdit(!deoEdit);

    const [telephoneNumber, setTelephoneNumber] = useState("");
    const [faxNumber, setFaxNumber] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebSite] = useState("");
    const [address, setAddress] = useState("");
    const [office, setOffice] = useState("Divisional Office of");
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");

    const [telephoneNumberEdit, setTelephoneNumberEdit] = useState("");
    const [faxNumberEdit, setFaxNumberEdit] = useState("");
    const [emailEdit, setEmailEdit] = useState("");
    const [websiteEdit, setWebSiteEdit] = useState("");
    const [addressEdit, setAddressEdit] = useState("");
    const [officeEdit, setOfficeEdit] = useState("");
    const [deoIdEdit, setDeoIdEdit] = useState("");


    
   const [allDivisionalOffice,setAllDivisionalOffice] = useState([])
   useEffect(() => {
       axios.get("http://localhost:5000/divisionalOffice/allDivisionalOffice")
       .then(res => setAllDivisionalOffice(res.data))
       .catch(error => console.log(error));
   },[])

    function saveEducationDivisionalOffice() {
        const addEDO ={office, address, telephoneNumber, faxNumber, email, website,username,password}

        axios.post("http://localhost:5000/divisionalOffice/addDivisionalOffice",addEDO).then(() =>{

        Swal.fire({  
            title: "Success!",
            text: "Divisional Office Adding Success!",
            icon: 'success',
            confirmButtonText: "OK",
            type: "success"}).then(okay => {
                if (okay) {
                    window.location.href = "/DivisionalOffice";
                }
        });

        
        }).catch((err)=>{

            Swal.fire({  
            title: "Error!",
            text: "Divisional Office Adding Not Success",
            icon: 'error',
            confirmButtonText: "OK",
            type: "success"})
        })
    }

    function back(){
        window.location.href = "Admin_Dashboard";
    }

    const [messageEmail, setMessageEmail] = useState('');
    const [messageEmailColor, setMessageEmailColor] = useState('');
    function setFunEmail(e){
        const input = e;
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input))
        {
            setMessageEmail('Valid Email Address');
            setMessageEmailColor("green");
        } else {
            setMessageEmail('Invalid Email Address');
            setMessageEmailColor("red");
        }
        setEmail(e);
    }

    const [isValidCPassword, setIsValidCfPassword] = useState(false);
    const [msgPassword, setMessagePassword] = useState('');
    function setFunPassword(event){
        const pass = event;
        if(schema.validate(pass) === false) {
            setIsValidCfPassword("Red");
            setMessagePassword('Password is not strong');
        }else{
            setIsValidCfPassword("Green");
            setMessagePassword('Password is strong');
        }
        setpassword(event);
    }

    const [cPassColor, setCPassColor] = useState(false);
    const [messageCfpassword, setCPassMessage] = useState('');
    function setFunCPassword(event){
        const ConfirmPassword = event;
       
        if ((ConfirmPassword === password) && (ConfirmPassword !=='') && (ConfirmPassword!== null) ) {
            setCPassColor("green");
            setCPassMessage('Password Are Matching');
        } else {
            setCPassColor("red");
            setCPassMessage('Passwords Are Not Match');
        }
    }

    function editDeo(id,office,address,telephoneNumber,faxNumber,email,website,username,password){
        setTelephoneNumberEdit(telephoneNumber);
        setFaxNumberEdit(faxNumber);
        setEmailEdit(email);
        setWebSiteEdit(website);
        setAddressEdit(address);
        setOfficeEdit(office);
        setDeoIdEdit(id);
        setDeoEdit(!deoEdit);
    }

    function EditEducationDivisionalOffice(){
        Swal.fire({
            title: 'Do you want to update educational divisional office?' ,
            icon: 'warning',
            confirmButtonText: 'Yes',
            showDenyButton: true,
            denyButtonText: 'No',
           
        }).then((result) => {
            if (result['isConfirmed']){
                    const updateDEO ={deoIdEdit,addressEdit,telephoneNumberEdit,faxNumberEdit}
                    axios.put("http://localhost:5000/divisionalOffice/updateDivisionalOffice",updateDEO).then(() =>{
    
                    Swal.fire({  
                        title: "Success!",
                        text: "Educational Divisional Office Updating Success",
                        icon: 'success',
                        confirmButtonText: "OK",
                        type: "success"}).then(okay => {
                            if (okay) {
                                axios.get("http://localhost:5000/divisionalOffice/allDivisionalOffice")
                                .then(res => setAllDivisionalOffice(res.data))
                                .catch(error => console.log(error));

                                setDeoEdit(!deoEdit);
                            }
                    });
            
                    
                    }).catch((err)=>{
            
                        Swal.fire({  
                        title: "Error!",
                        text: "System Error!. Divisional Office Not Updated.",
                        icon: 'error',
                        confirmButtonText: "OK",
                        type: "success"})
                    })
            }else{
                Swal.fire({  
                    title: "Warning!",
                    text: "Educational Divisional Office Updating Canceled",
                    icon: 'warning',
                    confirmButtonText: "OK",
                    type: "success"
                })
            }
        });
    }
    return (
        <div>
        <div class="dashboard-main-wrapper">
            <Navbar/>
            <div class="dashboard-wrapper">
                <div class="container" style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i><small>ADMIN</small><br/>&nbsp;&nbsp;&nbsp;&nbsp;Dashboard</h4>
                    <hr/>
                    <div className="text-end">
                        <MDBBtn color="dark" size='sm' className='shadow-0 p-2 mr-2' style={{letterSpacing:'1px'}}  onClick={toggleShow} >Add Divisional Office</MDBBtn>
                        <MDBBtn color="dark" size='sm' className='shadow-0 p-2' style={{letterSpacing:'1px'}} onClick={back} >Back</MDBBtn>
                    </div>
                    <MDBRow className='mt-3' >
                    {allDivisionalOffice.map((d_office,key) => (
                        <MDBCol sm='4'>
                            <MDBCard >
                            <MDBCardBody>
                                <MDBCardTitle className='text-dark fw-bold text-uppercase' style={{letterSpacing:'1px'}}>{d_office.office}</MDBCardTitle>
                                <MDBCardText className="mt-3 ml-3" style={{lineHeight:'125%'}}>
                                    <MDBIcon fas icon="phone" className='text-muted' /> &nbsp;&nbsp;Telephone : {d_office.telephoneNumber}<br/>
                                    <MDBIcon fas icon="map-marker" className='text-muted' /> &nbsp;&nbsp;&nbsp;Address : {d_office.address}<br/>
                                    <MDBIcon fas icon="fax" className='text-muted' /> &nbsp;&nbsp;Fax : {d_office.faxNumber}<br/>
                                    <MDBIcon fas icon="envelope" className='text-muted' /> &nbsp;&nbsp;Email : {d_office.email}<br/>
                                </MDBCardText>
                                <MDBBtn  style={{backgroundColor:'#443E56'}}  size='sm' className="shadow-0" href={d_office.email}><MDBIcon size='1x' fas icon="globe" /></MDBBtn>&nbsp;
                                <MDBBtn  style={{backgroundColor:'#3E5647'}}  size='sm' className="shadow-0" onClick={()=>editDeo(d_office._id,d_office.office,d_office.address,d_office.telephoneNumber,d_office.faxNumber,d_office.email,d_office.website,d_office.username,d_office.password)}>Edit <MDBIcon fas icon="long-arrow-alt-right" /></MDBBtn>
                            </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    ))}
                    </MDBRow>
                </div>
            </div>
            <MDBModal show={deoAdd} staticBackdrop setShow={setDeoAdd} tabIndex='-1'>
                <MDBModalDialog size='xl'>
                <MDBModalContent>
                    <MDBModalHeader className="bg-dark">
                        <MDBModalTitle className="text-white" style={{fontWeight:'200'}}>Add New Education Divisional Office</MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody className="p-5">
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Office</h6>
                            <input type="text" class="bg-light form-control" value={office} onChange={(e) =>{
                                setOffice(e.target.value);
                            }}/>
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Address</h6>
                            <input type="text" class="bg-light form-control" onChange={(e) =>{
                                setAddress(e.target.value);
                            }} />
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Telephone Number</h6>
                            <PatternFormat format="0#########" allowEmptyFormatting  class="bg-light form-control"  onChange={(e) =>{
                                setTelephoneNumber(e.target.value);
                            }} />
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Fax</h6>
                             <PatternFormat format="0#########" allowEmptyFormatting  class="bg-light form-control"  onChange={(e) =>{
                                setFaxNumber(e.target.value);
                            }} />
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Email</h6>
                            <input type="text" class="bg-light form-control" disabled  onChange={(e) =>{
                                setFunEmail(e.target.value);
                            }} />
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Website</h6>
                            <input type="url" class="bg-light form-control"  onChange={(e) =>{
                                setWebSite(e.target.value);
                            }}/>
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Username</h6>
                            <input type="url" class="bg-light form-control"  onChange={(e) =>{
                                setusername(e.target.value);
                            }}/>
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Password</h6>
                            <input type="password" class="bg-light form-control"  onChange={(e) =>{
                                setFunPassword(e.target.value);
                            }}/>
                            <span style={{fontSize:'12px', margin:'0px', padding:'0px', color: isValidCPassword}}   >
                                    {msgPassword}
                            </span>
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Confirm Password</h6>
                            <input type="password" class="form-control" id="cpass" placeholder="" onChange={(e) =>{
                                setFunCPassword(e.target.value);
                            }}/>
                            <span style={{fontSize:'12px', margin:'0px', padding:'0px', color: cPassColor}}   >
                                {messageCfpassword}
                            </span>
                        </div>
                    </MDBModalBody>
                    <MDBModalFooter>
                    <MDBBtn color='danger' onClick={toggleShow}>
                        Close
                    </MDBBtn>
                    <MDBBtn color='success' onClick={saveEducationDivisionalOffice}>Save</MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            <MDBModal show={deoEdit} staticBackdrop setShow={setDeoEdit} tabIndex='-1'>
                <MDBModalDialog size='xl'>
                <MDBModalContent>
                    <MDBModalHeader className="bg-dark">
                        <MDBModalTitle className="text-white" style={{fontWeight:'200'}}>Edit Education Divisional Office</MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={toggleShowEdit}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody className="p-5">
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Office</h6>
                            <input type="text" class=" form-control" value={officeEdit} disabled style={{backgroundColor:'#FDD1D1' , color:'#C23434'}}  title="This text field can not edit." onChange={(e) =>{
                                setOfficeEdit(e.target.value);
                            }}/>
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Address</h6>
                            <input type="text" class="bg-light form-control" value={addressEdit} onChange={(e) =>{
                                setAddressEdit(e.target.value);
                            }} />
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Telephone Number</h6>
                            <PatternFormat format="##########" allowEmptyFormatting value={telephoneNumberEdit} class="bg-light form-control"  onChange={(e) =>{
                                setTelephoneNumberEdit(e.target.value);
                            }} />
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Fax</h6>
                             <PatternFormat format="0#########" allowEmptyFormatting  class="bg-light form-control"  value={faxNumberEdit}  onChange={(e) =>{
                                setFaxNumberEdit(e.target.value);
                            }} />
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Email</h6>
                            <input type="text" class="form-control" value={emailEdit} style={{backgroundColor:'#FDD1D1' , color:'#C23434'}}   title="This text field can not edit." disabled onChange={(e) =>{
                                setEmailEdit(e.target.value);
                            }} />
                            <span style={{fontSize:'12px', margin:'0px', padding:'0px' , color : messageEmailColor}}   >
                                {messageEmail}
                            </span>
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Website</h6>
                            <input type="url" class=" form-control" value={websiteEdit} disabled  style={{backgroundColor:'#FDD1D1' , color:'#C23434'}} title="This text field can not edit." onChange={(e) =>{
                                setWebSiteEdit(e.target.value);
                            }}/>
                        </div>
                    </MDBModalBody>
                    <MDBModalFooter>
                    <MDBBtn color='danger' onClick={toggleShowEdit}>
                        Close
                    </MDBBtn>
                    <MDBBtn color='success' onClick={EditEducationDivisionalOffice}>Edit</MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
          </div>
        </div>
      )
};


export default AdminDashboard;