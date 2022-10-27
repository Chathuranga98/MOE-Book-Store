
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBModal, MDBCardBody, MDBIcon, MDBCardText, MDBModalDialog ,MDBModalBody ,MDBModalFooter,MDBModalContent,MDBModalHeader,MDBModalTitle, MDBBtn, MDBCol, MDBRow , MDBCardTitle, MDBCardFooter} from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';
import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';
import Navbar from "./edoNav";
import Cookies from 'js-cookie';

function AnnouncementDeo() {
    const UserName =  Cookies.get('username');

    const [deoAdd, setDeoAdd] = useState(false);
    const toggleShow = () => setDeoAdd(!deoAdd);
    
    const [deoEdit, setDeoEdit] = useState(false);
    const toggleShowEdit = () => setDeoEdit(!deoEdit);

    const [allAnnouncements,setAllAnnouncements] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/announcement/allAnnouncementForDEO/"+UserName)
        .then(res => setAllAnnouncements(res.data))
        .catch(error => console.log(error));
    },[])

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
    }

   
    const [doe,setDeo] = useState("")
    function getDeoName(name) {
        axios.get("http://localhost:5000/divisionalOffice/oneDivisionalOfficeByUsername/"+UserName)
       .then(res => {
            setDeo(res.data.office);
        })
       .catch(error => console.log(error));
       return doe; 
    }

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [school, setSchool] = useState("");
    const [divisional_office, setDEO] = useState(UserName);
    const [message, setMessage] = useState("");    

    
    const [titleEdit, setTitleEdit] = useState("");
    const [descriptionEdit, setDescriptionEdit] = useState("");
    const [schoolEdit, setSchoolEdit] = useState("");
    const [divisional_officeEdit, setDEOEdit] = useState(UserName);
    const [messageEdit, setMessageEdit] = useState("");
    const [AnnouncementIdEdit, setAnnouncementIdEdit] = useState("");
     
    const [allDivisionalOffice,setAllDivisionalOffice] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/divisionalOffice/allDivisionalOffice")
        .then(res => setAllDivisionalOffice(res.data))
        .catch(error => console.log(error));
    },[])

    const [allSchool,setAllSchools] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/school/allSchoolsForDeo/"+UserName)
        .then(res => setAllSchools(res.data))
        .catch(error => console.log(error));
    },[])

    function saveAnnouncement(){
        const create_by = divisional_office;
        const addAnnouncement ={title
            , description
            , message
            , divisional_office
            , school
            , create_by};
 
         axios.post("http://localhost:5000/announcement/addAnnouncement",addAnnouncement).then(() =>{
 
             Swal.fire({  
                 title: "Success!",
                 text: "Announcement Adding Success!",
                 icon: 'success',
                 confirmButtonText: "OK",
                 type: "success"}).then(okay => {
                     if (okay) {
                        setDeoAdd(!deoAdd);
                        axios.get("http://localhost:5000/announcement/allAnnouncementForDEO/"+UserName)
                        .then(res => setAllAnnouncements(res.data))
                        .catch(error => console.log(error));
                     }
             });
 
         
         }).catch((err)=>{
 
             Swal.fire({  
                 title: "Error!",
                 text: "Announcement Adding Not Success",
                 icon: 'error',
                 confirmButtonText: "OK",
                 type: "success"
             });
         })
    }

    
    function getSchoolName(fromSchool){

        if(fromSchool != 'no'){
            if(fromSchool == 'all'){
                return "Allow for all schools";
            }else{
                const count_of_schools = allSchool.length;
                for (let i = 0; i < count_of_schools; i++){
                    if(allSchool[i].username == fromSchool){
                        return allSchool[i].name;
                    }
                }
            }
        }else{
            return "Not allow for schools";
        }
    }
 
    function back(){
        window.location.href = "DivisionalOffice_dashboard";
    } 

    function Notice_view_deo( _id,title, description, message, divisional_office, school,createdAt){
        reactLocalStorage.setObject("View_Announcement", [_id,title, description, message, divisional_office, school,createdAt]);
        window.location.href = "/Notice_view_deo";
    }

    function editAnnouncement(id,title,description,message,divisional_office,school){
        setTitleEdit(title);
        setDescriptionEdit(description);
        setSchoolEdit(school);
        setDEOEdit(divisional_office);
        setMessageEdit(message);
        setAnnouncementIdEdit(id);
        setDeoEdit(!deoEdit);
    }

    function edit(){
        Swal.fire({
            title: 'Do you want to update announcement?' ,
            icon: 'warning',
            confirmButtonText: 'Yes',
            showDenyButton: true,
            denyButtonText: 'No',
           
        }).then((result) => {
            if (result['isConfirmed']){
                    const updateAnnouncement ={titleEdit,descriptionEdit,messageEdit,divisional_officeEdit,schoolEdit}
                    axios.put("http://localhost:5000/announcement/updateAnnouncement/"+AnnouncementIdEdit,updateAnnouncement).then(() =>{
    
                    Swal.fire({  
                        title: "Success!",
                        text: "Announcement Updating Success",
                        icon: 'success',
                        confirmButtonText: "OK",
                        type: "success"}).then(okay => {
                            if (okay) {
                                axios.get("http://localhost:5000/announcement/allAnnouncementForDEO/"+UserName)
                                .then(res => setAllAnnouncements(res.data))
                                .catch(error => console.log(error));

                                setDeoEdit(!deoEdit);
                            }
                    });
            
                    
                    }).catch((err)=>{
            
                        Swal.fire({  
                        title: "Error!",
                        text: "System Error!. Announcement Not Updated.",
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
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i><small>DEO</small><br/>&nbsp;&nbsp;&nbsp;&nbsp;Dashboard</h4>
                    <hr/>
                    <div className="text-end">
                        <MDBBtn color="dark" size='sm' className='shadow-0 p-2 mr-2' style={{letterSpacing:'1px'}}  onClick={toggleShow} >Add Announcement</MDBBtn>
                        <MDBBtn color="dark" size='sm' className='shadow-0 p-2' style={{letterSpacing:'1px'}} onClick={back} >Back</MDBBtn>
                    </div>
                    <MDBRow className='mt-3' >
                    {allAnnouncements.map((announcement,key) => (
                        <MDBCol sm='4' className='mt-3'>
                            <MDBCard className="h-100">
                            <MDBCardBody>
                                <MDBCardTitle className='text-dark fw-bold text-uppercase' style={{letterSpacing:'1px'}}>{announcement.title}</MDBCardTitle>
                                <MDBCardText className="mt-3" style={{lineHeight:'125%'}}>
                                    <small>{"View by: "+getSchoolName(announcement.school)}</small><br/>
                                    <small>{"Published Date : "+formatDate(announcement.createdAt)}</small><br/>
                                </MDBCardText>
                            </MDBCardBody>
                            <MDBCardFooter>
                                <MDBBtn  style={{backgroundColor:'#3E5647'}}  size='sm' className="shadow-0" onClick={()=>Notice_view_deo(announcement._id , announcement.title, announcement.description, announcement.message, announcement.divisional_office, announcement.school, announcement.createdAt)}>View <MDBIcon fas icon="long-arrow-alt-right" /></MDBBtn>&nbsp;&nbsp;
                                <MDBBtn  style={{backgroundColor:'#2C3E50' , display : (announcement.create_by == UserName)?'inline':'none'}}  size='sm' className="shadow-0" onClick={()=>editAnnouncement(announcement._id,announcement.title,announcement.description,announcement.message,announcement.divisional_office,announcement.school)}>Edit <MDBIcon fas icon="pen" /></MDBBtn>
                            </MDBCardFooter>
                            </MDBCard>
                        </MDBCol>
                    ))}
                    </MDBRow>
                    <MDBModal show={deoAdd} staticBackdrop setShow={setDeoAdd} tabIndex='-1'>
                        <MDBModalDialog size='xl'>
                        <MDBModalContent>
                            <MDBModalHeader className="bg-dark">
                                <MDBModalTitle className="text-white" style={{fontWeight:'200'}}>Add New Announcement</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody className="p-5">
                                <div class="mb-3">
                                    <h6 className="fw-normal text-dark">Title</h6>
                                    <input type="text" class="bg-light form-control" onChange={(e) =>{
                                        setTitle(e.target.value);
                                    }}/>
                                </div>
                                <div class="mb-3">
                                    <h6 className="fw-normal text-dark">Small Description</h6>
                                    <input type="text" class="bg-light form-control" onChange={(e) =>{
                                        setDescription(e.target.value);
                                    }} />
                                </div>
                               
                                <div class="mb-3">
                                    <h6 className="fw-normal text-dark">School</h6>
                                    <select class="bg-light form-control" onChange={(e) =>{
                                        setSchool(e.target.value);
                                    }}>
                                        <option value="">Select Request From</option>
                                        <option value="all">To all</option>
                                        {allSchool.map((school,key) => (
                                            <option value={school.username}>{school.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <h6 className="fw-normal text-dark">Message</h6>
                                    <textarea rows="9"  className='form-control' onChange={(e) =>{
                                        setMessage(e.target.value);
                                    }}></textarea>
                                </div>
                            </MDBModalBody>
                            <MDBModalFooter>
                            <MDBBtn color='danger' onClick={toggleShow}>
                                Close
                            </MDBBtn>
                            <MDBBtn color='success' onClick={saveAnnouncement}>Save</MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                        </MDBModalDialog>
                    </MDBModal>
                    <MDBModal show={deoEdit} staticBackdrop setShow={setDeoEdit} tabIndex='-1'>
                <MDBModalDialog size='xl'>
                <MDBModalContent>
                    <MDBModalHeader className="bg-dark">
                        <MDBModalTitle className="text-white" style={{fontWeight:'200'}}>Edit Announcement</MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={toggleShowEdit}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody className="p-5">
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Title</h6>
                            <input type="text" class="bg-light form-control" value={titleEdit} onChange={(e) =>{
                                setTitleEdit(e.target.value);
                            }}/>
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Small Description</h6>
                            <input type="text" class="bg-light form-control" value={descriptionEdit} onChange={(e) =>{
                                setDescriptionEdit(e.target.value);
                            }} />
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">School</h6>
                            <select class="bg-light form-control" value={schoolEdit} onChange={(e) =>{
                                setSchoolEdit(e.target.value);
                            }}>
                                <option value="">Select Request From</option>
                                <option value="all">To all</option>
                                {allSchool.map((school,key) => (
                                    <option value={school.username}>{school.name}</option>
                                ))}
                            </select>
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Message</h6>
                            <textarea rows="9"  className='form-control' value={messageEdit} onChange={(e) =>{
                                setMessageEdit(e.target.value);
                            }}></textarea>
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
           
          </div>
        </div>
      )
};


export default AnnouncementDeo;