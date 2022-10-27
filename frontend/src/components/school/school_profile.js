
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBModal, MDBCardBody, MDBIcon, MDBCardImage, MDBModalDialog ,MDBModalBody ,MDBModalFooter,MDBModalContent,MDBModalHeader,MDBModalTitle, MDBBtn, MDBCol, MDBRow , MDBCardTitle, MDBCardFooter} from 'mdb-react-ui-kit';
import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';
import Navbar from "./schoolNav";
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import {PatternFormat} from 'react-number-format';

function SchoolProfile() {
    const schoolUserName =  Cookies.get('username');
    function back(){
        window.location.href = "SchoolsDashboard";
    }

    //_id,name, address, telephoneNumber, faxNumber, email, website, schoolType, username, password, DEO, status, userType
    const get_profile = reactLocalStorage.getObject("School_profile");

    const id = get_profile[0];
    const [telephoneNumber, setTelephoneNumber] = useState(get_profile[3]);
    const [faxNumber, setFaxNumber] = useState(get_profile[4]);
    const [email, setEmail] = useState(get_profile[5]);
    const [website, setWebSite] = useState(get_profile[6]);
    const [address, setAddress] = useState(get_profile[2]);
    const [name, setName] = useState(get_profile[1]);
    const [username, setusername] = useState(get_profile[8]);
    const [password, setpassword] = useState(get_profile[9]);
    const [schoolType, setType] = useState(get_profile[7]);
    const [schoolLogo, setSchoolLogo] = useState("");
    
    
    const [oneSchool,setOneSchools] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/school/oneSchoolByUsername/"+schoolUserName)
        .then(res => {
            setOneSchools(res.data);
        })
        .catch(error => console.log(error));
    },[])

    function edit(){
        Swal.fire({
            title: 'Do you want to edit school profile?' ,
            icon :'warning',
            confirmButtonText: 'Yes',
            showDenyButton: true,
            denyButtonText: 'No',
           
          }).then((result) => {
            if (result['isConfirmed']){
                
                    const schoolUpdate = {id,name, address, telephoneNumber, faxNumber,schoolType, website}
                    axios.put("http://localhost:5000/school/updateSchool/"+id,schoolUpdate).then(() =>{
    
                    Swal.fire({  
                        title: "Success!",
                        text: "School Profile Edited!",
                        icon: 'success',
                        confirmButtonText: "OK",
                        type: "success"}).then(okay => {
                            if (okay) {
                                window.location.href = "/SchoolsDashboard";
                            }
                    });
        
            
                }).catch((err)=>{
    
                    Swal.fire({  
                        title: "Error!",
                        text: "School Profile Editing Not Deleted.",
                        icon: 'error',
                        confirmButtonText: "OK",
                        type: "success"
                    })
                })
              
            }else{
                Swal.fire({  
                    title: "Error!",
                    text: "School Profile Editing Canceled.",
                    icon: 'error',
                    confirmButtonText: "OK",
                    type: "success"
                })
            }
        })
    }
    return (
        <div>
        <div class="dashboard-main-wrapper">
            <Navbar/>
            <div class="dashboard-wrapper">
                <div class="container" style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i><small>SCHOOL</small><br/>&nbsp;&nbsp;&nbsp;&nbsp;Dashboard</h4>
                    <hr/>
                    <div className="text-end">
                        <MDBBtn color="dark" size='sm' className='shadow-0 p-2' style={{letterSpacing:'1px'}} onClick={back} >Back</MDBBtn>
                    </div>
                    <MDBRow className='mt-3' >
                        <MDBCol sm='12'>
                            <MDBCard >
                            <MDBCardBody className='p-5'>
                                {oneSchool.map((school,key) => (
                                    <div>
                                        <center>
                                            <MDBCardImage  src={'https://res.cloudinary.com/nadun/image/upload/v1654197415/'+school.logo} style={{width:'200px'}} className="mt-3 text-center"  position='top' alt='...' />
                                            <MDBCardTitle style={{color:'#000000'}} className='display-6 mt-3 text-decoration-underline'>{school.name}</MDBCardTitle>
                                        </center>
                                    </div>
                                ))}
                                <div class="mb-3 mt-5">
                                    <h6 className="fw-normal text-dark">School Name</h6>
                                    <input type="text" class="bg-light form-control" value={name}  onChange={(e) =>{
                                        setName(e.target.value);
                                    }}/>
                                </div>
                                <div class="mb-3">
                                    <h6 className="fw-normal text-dark">Address</h6>
                                    <input type="text" class="bg-light form-control" value={address} onChange={(e) =>{
                                        setAddress(e.target.value);
                                    }} />
                                </div>
                                <div class="mb-3">
                                    <h6 className="fw-normal text-dark">Telephone Number</h6>
                                    <PatternFormat format="0#########" allowEmptyFormatting value={telephoneNumber} class="bg-light form-control"  onChange={(e) =>{
                                        setTelephoneNumber(e.target.value);
                                    }} />
                                </div>
                                <div class="mb-3">
                                    <h6 className="fw-normal text-dark">Fax</h6>
                                    <PatternFormat format="0#########" allowEmptyFormatting value={faxNumber} class="bg-light form-control"  onChange={(e) =>{
                                        setFaxNumber(e.target.value);
                                    }} />
                                </div>
                                <div class="mb-3">
                                    <h6 className="fw-normal text-dark">Email</h6>
                                    <input type="email" class=" form-control" disabled value={email} style={{backgroundColor:'#FDD1D1' , color:'#C23434'}}   title="This text field can not edit." onChange={(e) =>{
                                        setEmail(e.target.value);
                                    }} />
                                </div>
                                <div class="mb-3">
                                    <h6 className="fw-normal text-dark">Website</h6>
                                    <input type="url" class="bg-light form-control" value={website}  onChange={(e) =>{
                                        setWebSite(e.target.value);
                                    }}/>
                                </div>
                                <div class="mb-3">
                                    <h6 className="fw-normal text-dark">School Type</h6>
                                    <select class="bg-light form-control" value={schoolType} onChange={(e) =>{
                                        setType(e.target.value);
                                    }}>
                                        <option value="">Select School Type</option>
                                        <option value="Type 1A">Type 1A</option>
                                        <option value="Type 1B">Type 1B</option>
                                        <option value="Type 1C">Type 1C</option>
                                        <option value="Type 2">Type 2</option>
                                        <option value="Type 3">Type 3</option>
                                    </select>
                                </div>
                                <div className="text-end">
                                    <MDBBtn color="dark" size='sm' className='shadow-0 p-2' style={{letterSpacing:'1px'}} onClick={edit} >Edit</MDBBtn>
                                </div>
                            </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </div>
            </div>
           
          </div>
        </div>
      )
};


export default SchoolProfile;