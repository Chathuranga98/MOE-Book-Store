
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBModal, MDBCardBody, MDBIcon, MDBCardText, MDBModalDialog ,MDBModalBody ,MDBModalFooter,MDBModalContent,MDBModalHeader,MDBModalTitle, MDBBtn, MDBCol, MDBRow , MDBCardTitle, MDBCardImage,MDBCardFooter} from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';
import axios from 'axios';
import {PatternFormat} from 'react-number-format';
import Navbar from "./edoNav";
import Cookies from 'js-cookie';

function Schools() {

    const UserName =  Cookies.get('username');

    const [deoAdd, setDeoAdd] = useState(false);
    const toggleShow = () => setDeoAdd(!deoAdd);

    const [SchoolEdit, setSchoolEdit] = useState(false);
    const toggleShowEdit = () => setSchoolEdit(!SchoolEdit);

    const [telephoneNumber, setTelephoneNumber] = useState("");
    const [faxNumber, setFaxNumber] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebSite] = useState("");
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [schoolType, setType] = useState("");
    const [schoolLogo, setSchoolLogo] = useState("");
    
    const [telephoneNumberEdit, setTelephoneNumberEdit] = useState("");
    const [faxNumberEdit, setFaxNumberEdit] = useState("");
    const [emailEdit, setEmailEdit] = useState("");
    const [websiteEdit, setWebSiteEdit] = useState("");
    const [addressEdit, setAddressEdit] = useState("");
    const [nameEditEdit, setNameEdit] = useState("");
    const [schoolTypeEdit, setTypeEdit] = useState("");
    const [id, setID] = useState("");
    
    
    function School_profileEdit(_id,name, address, telephoneNumber, faxNumber, email, website, schoolType, username, password, DEO, status, userType){
        setTelephoneNumberEdit(telephoneNumber);
        setID(_id);
        setFaxNumberEdit(faxNumber);
        setEmailEdit(email);
        setWebSiteEdit(website);
        setAddressEdit(address);
        setNameEdit(name);
        setTypeEdit(schoolType);
        setSchoolEdit(!SchoolEdit);
    }

    function clear_Data(){
        setTelephoneNumberEdit("");
        setID("");
        setFaxNumberEdit("");
        setEmailEdit("");
        setWebSiteEdit("");
        setAddressEdit("");
        setNameEdit("");
        setTypeEdit("");
        setSchoolEdit("");
    }

    const [allSchool,setAllSchools] = useState([])
    useEffect(() => {
       axios.get("http://localhost:5000/school/allSchoolsForDeo/"+UserName)
       .then(res => setAllSchools(res.data))
       .catch(error => console.log(error));
    },[])

    function saveSchools() {
        const formData = new FormData();
        formData.append("file" ,schoolLogo);
        formData.append("upload_preset", "ml_default");

        axios.post("https://api.cloudinary.com/v1_1/nadun/image/upload",formData).then((response)=>{    
        const school_logo =schoolLogo.name;   
        const DEO = UserName;
        const addSchools ={name, address, telephoneNumber, faxNumber, email, website,schoolType,username,password,school_logo,DEO}

        axios.post("http://localhost:5000/school/addSchool",addSchools).then(() =>{

        Swal.fire({  
            title: "Success!",
            text: "School Adding Success!",
            icon: 'success',
            confirmButtonText: "OK",
            type: "success"}).then(okay => {
                if (okay) {
                    axios.get("http://localhost:5000/school/allSchoolsForDeo/"+UserName)
                    .then(res => setAllSchools(res.data))
                    .catch(error => console.log(error));
                }
        });

        
        }).catch((err)=>{

            Swal.fire({  
            title: "Error!",
            text: "School Adding Not Success",
            icon: 'error',
            confirmButtonText: "OK",
            type: "success"})
        })
      })
    }

    function back(){
        window.location.href = "DivisionalOffice_dashboard";
    }

    function deleteSchool(id,name ,address ,telephoneNumber ,faxNumber ,email ,website ,schoolType ,username ,password ,logo ,DEO) {   
        Swal.fire({
            title: 'Do you want to delete this school?' ,
            imageUrl: 'https://res.cloudinary.com/nadun/image/upload/v1654197415/'+logo,
            imageHeight: 150,
            confirmButtonText: 'Yes',
            showDenyButton: true,
            denyButtonText: 'No',
            html:
                '<div style="text-align:left; margin-top:4%;" ><h6>School Name : '+name+'</h6><h6>Address : '+address+'</h6><h6>Telephone Number : '+telephoneNumber+'</h6><h6>Fax Number : '+faxNumber+'</h6><h6>Email Address : '+email+'</h6><h6>Website : '+website+'</h6><h6>School Type : '+schoolType+'</h6></div>',
          }).then((result) => {
            if (result['isConfirmed']){
            
            axios.delete("http://localhost:5000/school/deleteSchool/"+id).then(() =>{
    
            Swal.fire({  
                title: "Success!",
                text: "School Deleting Success!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                    if (okay) {
                        axios.get("http://localhost:5000/school/allSchoolsForDeo/"+UserName)
                        .then(res => setAllSchools(res.data))
                        .catch(error => console.log(error));
                    }
            });
    
            
            }).catch((err)=>{
    
                Swal.fire({  
                title: "Error!",
                text: "School Deleting  Not Success",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"})
            })
            }else{
                Swal.fire({  
                    title: "Error!",
                    text: "Deleting Canceled.",
                    icon: 'warning',
                    confirmButtonText: "OK",
                    type: "success"})
            }
        })
    }

    function openWeb(URL){
        window.open(URL, '_blank', 'noopener,noreferrer');
    }

    function edit(){
        const telephoneNumber = telephoneNumberEdit;
        const faxNumber = faxNumberEdit;
        const website = websiteEdit;
        const address = addressEdit;
        const name = nameEditEdit;
        const schoolType = schoolTypeEdit;

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
                                setSchoolEdit(!SchoolEdit);
                                clear_Data();

                                axios.get("http://localhost:5000/school/allSchoolsForDeo/"+UserName)
                                .then(res => setAllSchools(res.data))
                                .catch(error => console.log(error));
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
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i><small>DEO</small><br/>&nbsp;&nbsp;&nbsp;&nbsp;Dashboard</h4>
                    <hr/>
                    <div className="text-end">
                        <MDBBtn color="dark" size='sm' className='shadow-0 p-2 mr-2' style={{letterSpacing:'1px'}}  onClick={toggleShow} >Add Schools</MDBBtn>
                        <MDBBtn color="dark" size='sm' className='shadow-0 p-2' style={{letterSpacing:'1px'}} onClick={back} >Back</MDBBtn>
                    </div>
                    <MDBRow className='mt-3' >
                    {allSchool.map((school,key) => (
                        <MDBCol sm='4' className="mt-3">
                            <MDBCard  className='h-100'>
                            <MDBCardBody>
                                <center>
                                <MDBCardImage  src={'https://res.cloudinary.com/nadun/image/upload/v1654197415/'+school.logo} style={{height:'150px' , width:'auto'}}  position='top' alt='...' />
                                </center>
                                <MDBCardTitle className='text-dark fw-bold text-uppercase mt-4' style={{letterSpacing:'1px'}}>{school.name}</MDBCardTitle>
                                <MDBCardText className="mt-3" style={{lineHeight:'125%'}}>
                                    <MDBIcon fas icon="angle-right" /> Telephone : {school.telephoneNumber}<br/>
                                    <MDBIcon fas icon="angle-right" /> Address : {school.address}<br/>
                                    <MDBIcon fas icon="angle-right" /> Fax : {school.faxNumber}<br/>
                                    <MDBIcon fas icon="angle-right" /> Email : {school.email}<br/>
                                    <MDBIcon fas icon="angle-right" /> Status : {school.status}<br/>
                                </MDBCardText>
                            </MDBCardBody>
                            <MDBCardFooter>
                                <MDBBtn  style={{backgroundColor:'#443E56'}}  size='sm' className="shadow-0" onClick={()=>openWeb(school.website)}><MDBIcon size='1x' fas icon="globe" /></MDBBtn>&nbsp;
                                <MDBBtn  style={{backgroundColor:'#592E2E'}}  size='sm' className="shadow-0" onClick={()=>deleteSchool(school._id,school.name,school.address,school.telephoneNumber,school.faxNumber,school.email,school.website,school.schoolType,school.username,school.password,school.logo,school.DEO)}> <MDBIcon fas icon="trash" /></MDBBtn>&nbsp;
                                <MDBBtn  style={{backgroundColor:'#3E5647'}}  size='sm' className="shadow-0" onClick={() => School_profileEdit(school._id,school.name
                                , school.address
                                , school.telephoneNumber
                                , school.faxNumber
                                , school.email
                                , school.website
                                , school.schoolType
                                , school.username
                                , school.password
                                , school.DEO
                                , school.status
                                , school.userType)}>Edit <MDBIcon fas icon="long-arrow-alt-right" /></MDBBtn>
                            </MDBCardFooter>
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
                        <MDBModalTitle className="text-white" style={{fontWeight:'200'}}>Add New School</MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody className="p-5">
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">School Name</h6>
                            <input type="text" class="bg-light form-control"  onChange={(e) =>{
                                setName(e.target.value);
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
                            <input type="email" class="bg-light form-control"  onChange={(e) =>{
                                setEmail(e.target.value);
                            }} />
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Website</h6>
                            <input type="url" class="bg-light form-control"  onChange={(e) =>{
                                setWebSite(e.target.value);
                            }}/>
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">School Type</h6>
                            <select class="bg-light form-control"  onChange={(e) =>{
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
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Username</h6>
                            <input type="text" class="bg-light form-control"  onChange={(e) =>{
                                setusername(e.target.value);
                            }}/>
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Password</h6>
                            <input type="text" class="bg-light form-control"  onChange={(e) =>{
                                setpassword(e.target.value);
                            }}/>
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Logo of the School</h6>
                            <input type="file" onChange={(e) =>{
                                                                    setSchoolLogo(e.target.files[0]);
                                                                }} class="form-control" id="customFile" />
                        </div>
                    </MDBModalBody>
                    <MDBModalFooter>
                    <MDBBtn color='danger' onClick={toggleShow}>
                        Close
                    </MDBBtn>
                    <MDBBtn color='success' onClick={saveSchools}>Save</MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            <MDBModal show={SchoolEdit} staticBackdrop setShow={setSchoolEdit} tabIndex='-1'>
                <MDBModalDialog size='xl'>
                <MDBModalContent>
                    <MDBModalHeader className="bg-dark">
                        <MDBModalTitle className="text-white" style={{fontWeight:'200'}}>Edit School</MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={toggleShowEdit}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody className="p-5">
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">School Name</h6>
                            <input type="text" class="bg-light form-control" value={nameEditEdit}  onChange={(e) =>{
                                setNameEdit(e.target.value);
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
                            <PatternFormat format="0#########" allowEmptyFormatting  value={telephoneNumberEdit} class="bg-light form-control"  onChange={(e) =>{
                                setTelephoneNumberEdit(e.target.value);
                            }} />
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Fax</h6>
                             <PatternFormat format="0#########" allowEmptyFormatting value={faxNumberEdit} class="bg-light form-control"  onChange={(e) =>{
                                setFaxNumberEdit(e.target.value);
                            }} />
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Email</h6>
                            <input type="email" class="bg-light form-control" value={emailEdit} disabled  onChange={(e) =>{
                                setEmailEdit(e.target.value);
                            }} />
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Website</h6>
                            <input type="url" class="bg-light form-control" value={websiteEdit} onChange={(e) =>{
                                setWebSiteEdit(e.target.value);
                            }}/>
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">School Type</h6>
                            <select class="bg-light form-control" value={schoolTypeEdit}  onChange={(e) =>{
                                setTypeEdit(e.target.value);
                            }}>
                                <option value="">Select School Type</option>
                                <option value="Type 1A">Type 1A</option>
                                <option value="Type 1B">Type 1B</option>
                                <option value="Type 1C">Type 1C</option>
                                <option value="Type 2">Type 2</option>
                                <option value="Type 3">Type 3</option>
                            </select>
                        </div>
                       
                        
                    </MDBModalBody>
                    <MDBModalFooter>
                    <MDBBtn color='danger' onClick={toggleShowEdit}>
                        Close
                    </MDBBtn>
                    <MDBBtn color='success' onClick={edit}>Edit</MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
          </div>
        </div>
      )
};


export default Schools;