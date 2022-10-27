
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBModal, MDBCardBody, MDBIcon, MDBCardText, MDBModalDialog ,MDBModalBody ,MDBModalFooter,MDBModalContent,MDBModalHeader,MDBModalTitle, MDBBtn, MDBCol, MDBRow , MDBCardTitle, MDBCardFooter, MDBFooter} from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';
import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';
import Navbar from "./adminNav";

function AdminDashboard() {
   
    const [deoAdd, setDeoAdd] = useState(false);
    const toggleShow = () => setDeoAdd(!deoAdd);
    
    const [deoEdit, setDeoEdit] = useState(false);
    const toggleShowEdit = () => setDeoEdit(!deoEdit);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [school, setSchool] = useState("");
    const [divisional_office, setDEO] = useState("");
    const [message, setMessage] = useState("");    
    const [isAllowPrivateUsers, setIssAllowForPrivateUsers] = useState("");    
    
    
    const [titleEdit, setTitleEdit] = useState("");
    const [descriptionEdit, setDescriptionEdit] = useState("");
    const [schoolEdit, setSchoolEdit] = useState("");
    const [divisional_officeEdit, setDEOEdit] = useState("");
    const [messageEdit, setMessageEdit] = useState("");
    const [AnnouncementIdEdit, setAnnouncementIdEdit] = useState("");
    const [isAllowPrivateUsersEdit, setIssAllowForPrivateUsersEdit] = useState("");

    const [allAnnouncements,setAllAnnouncements] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/announcement/allAnnouncement")
        .then(res => setAllAnnouncements(res.data))
        .catch(error => console.log(error));
    },[])

    
    
   const [allDivisionalOffice,setAllDivisionalOffice] = useState([])
   useEffect(() => {
       axios.get("http://localhost:5000/divisionalOffice/allDivisionalOffice")
       .then(res => setAllDivisionalOffice(res.data))
       .catch(error => console.log(error));
   },[])

    function saveAnnouncement() {
        const create_by = 'Admin';
        const addAnnouncement ={title
           , description
           , message
           , divisional_office
           , school
           , isAllowPrivateUsers
           , create_by};

        axios.post("http://localhost:5000/announcement/addAnnouncement",addAnnouncement).then(() =>{

            Swal.fire({  
                title: "Success!",
                text: "Announcement Adding Success!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                    if (okay) {
                        window.location.href = "/Admin_Announcement";
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

    const [allSchool,setAllSchools] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/school/allSchools")
        .then(res => setAllSchools(res.data))
        .catch(error => console.log(error));
    },[])

  
    function editAnnouncement(id,title,description,message,divisional_office,school){
        setTitleEdit(title);
        setDescriptionEdit(description);
        setSchoolEdit(school);
        setDEOEdit(divisional_office);
        setMessageEdit(message);
        setAnnouncementIdEdit(id);
        setIssAllowForPrivateUsersEdit(id);
        setDeoEdit(!deoEdit);
    }
  
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

    function deleteAnnouncement(id){
        Swal.fire({
            title: 'Do you want to delete this announcement?' ,
            icon: 'warning',
            confirmButtonText: 'Yes',
            showDenyButton: true,
            denyButtonText: 'No',
           
          }).then((result) => {
            if (result['isConfirmed']){
                    axios.delete("http://localhost:5000/announcement/deleteAnnouncement/"+id).then(() =>{
    
                    Swal.fire({  
                        title: "Success!",
                        text: "Announcement Deleting Success!",
                        icon: 'success',
                        confirmButtonText: "OK",
                        type: "success"}).then(okay => {
                            if (okay) {
                                axios.get("http://localhost:5000/announcement/allAnnouncement")
                                .then(res => setAllAnnouncements(res.data))
                                .catch(error => console.log(error));
                            }
                    });
            
                    
                    }).catch((err)=>{
            
                        Swal.fire({  
                        title: "Error!",
                        text: "Announcement Deleting  Not Success",
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

    function getDeoName(deo_username) {
        if(deo_username != 'no'){
            if(deo_username == 'all'){
                return "Allow for all DEO";
            }else{
                const count_of_deo = allDivisionalOffice.length;
                for (let i = 0; i < count_of_deo; i++){
                    if(allDivisionalOffice[i].username == deo_username){
                    return allDivisionalOffice[i].office;
                    }
                }
            }
        }else{
            return "Not allow for DEO";
        }
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

    function isAllowForPrivateUser(status){
        if(status != 'no'){
            return "Allow for private users";
        }else{
            return "Not allow for private users";
        }
    }
 
    function back(){
        window.location.href = "Admin_Dashboard";
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
                    const updateAnnouncement ={titleEdit,descriptionEdit,messageEdit,divisional_officeEdit,schoolEdit,isAllowPrivateUsersEdit}
                    axios.put("http://localhost:5000/announcement/updateAnnouncement/"+AnnouncementIdEdit,updateAnnouncement).then(() =>{
    
                    Swal.fire({  
                        title: "Success!",
                        text: "Announcement Updating Success",
                        icon: 'success',
                        confirmButtonText: "OK",
                        type: "success"}).then(okay => {
                            if (okay) {
                                axios.get("http://localhost:5000/announcement/allAnnouncement")
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

    function ViewAnnouncement( _id,title, description, message, divisional_office, school,createdAt){
        reactLocalStorage.setObject("View_Announcement", [_id,title, description, message, divisional_office, school,createdAt]);
        window.location.href = "/View_announcement_by_admin";
    }
    return (
        <div>
        <div class="dashboard-main-wrapper">
            <Navbar/>
            <div class="dashboard-wrapper">
                <div class="container pb-5" style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i><small>ADMIN</small><br/>&nbsp;&nbsp;&nbsp;&nbsp;Dashboard</h4>
                    <hr/>
                    <div className="text-end">
                        <MDBBtn color="dark" size='sm' className='shadow-0 p-2 mr-2' style={{letterSpacing:'1px'}}  onClick={toggleShow} >Add Announcement</MDBBtn>
                        <MDBBtn color="dark" size='sm' className='shadow-0 p-2' style={{letterSpacing:'1px'}} onClick={back} >Back</MDBBtn>
                    </div>
                    <MDBRow className='mt-3' >
                    {allAnnouncements.map((announcement,key) => (
                        <MDBCol sm='4' className="pt-3">
                            <MDBCard className="h-100">
                            <MDBCardBody>
                                <MDBCardTitle className='text-dark fw-bold text-uppercase' style={{letterSpacing:'1px'}}>{announcement.title}</MDBCardTitle>
                                <MDBCardText className="mt-3" style={{lineHeight:'125%'}}>
                                    <small>{"Published Date : "+formatDate(announcement.createdAt)}</small><br/>
                                    <small>{"Reading Allow For : "}</small><br/>
                                    <small>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<MDBIcon fas icon="angle-right" /> {getDeoName(announcement.divisional_office)}</small><br/>
                                    <small>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<MDBIcon fas icon="angle-right" /> {getSchoolName(announcement.school)}</small><br/>
                                    <small>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<MDBIcon fas icon="angle-right" /> {isAllowForPrivateUser(announcement.isAllowPrivateUsers)}</small><br/>
                                </MDBCardText>
                            </MDBCardBody>
                            <MDBCardFooter>
                                <MDBBtn  style={{backgroundColor:'#3E5647'}}  size='sm' className="shadow-0" onClick={()=>editAnnouncement(announcement._id,announcement.title,announcement.description,announcement.message,announcement.divisional_office,announcement.school)}>Edit <MDBIcon fas icon="long-arrow-alt-right" /></MDBBtn>&nbsp;&nbsp;
                                <MDBBtn  style={{backgroundColor:'#443E56'}}  size='sm' className="shadow-0" href="#" onClick={()=> deleteAnnouncement(announcement._id)}><MDBIcon size='1x' fas icon="trash" /></MDBBtn>&nbsp;
                                <MDBBtn  style={{backgroundColor:'#106694'}}  size='sm' className="shadow-0" href="#" onClick={()=>ViewAnnouncement( announcement._id , announcement.title, announcement.description, announcement.message, announcement.divisional_office, announcement.school, announcement.createdAt)}><MDBIcon size='1x' fas icon="eye" /></MDBBtn>&nbsp;
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
                            <h6 className="fw-normal text-dark">Divisional Education Office</h6>
                            <select class="bg-light form-control" onChange={(e) =>{
                                setDEO(e.target.value);
                            }}>
                                <option value="">Select Request From</option>
                                <option value="no">Not Allow</option>
                                <option value="all">To all</option>
                                {allDivisionalOffice.map((deo,key) => (
                                    <option value={deo.username}>{deo.office}</option>
                                ))}
                            </select>

                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">School</h6>
                            <select class="bg-light form-control" onChange={(e) =>{
                                setSchool(e.target.value);
                            }}>
                                <option value="">Select Request From</option>
                                <option value="no">Not Allow</option>
                                <option value="all">To all</option>
                                {allSchool.map((school,key) => (
                                    <option value={school.username}>{school.name}</option>
                                ))}
                            </select>
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Is Allow Private Users</h6>
                            <select class="bg-light form-control" value={isAllowPrivateUsersEdit} onChange={(e) =>{
                                setIssAllowForPrivateUsers(e.target.value);
                            }}>
                                <option>Select Option</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
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
                            <h6 className="fw-normal text-dark">Divisional Education Office</h6>
                            <select class="bg-light form-control" value={divisional_officeEdit} onChange={(e) =>{
                                setDEOEdit(e.target.value);
                            }}>
                                <option value="">Select Request From</option>
                                <option value="all">To all</option>
                                {allDivisionalOffice.map((deo,key) => (
                                    <option value={deo.username}>{deo.office}</option>
                                ))}
                            </select>

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
                            <h6 className="fw-normal text-dark">Is Allow Private Users</h6>
                            <select class="bg-light form-control" onChange={(e) =>{
                                setIssAllowForPrivateUsersEdit(e.target.value);
                            }}>
                                <option>Select Option</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
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
      )
};


export default AdminDashboard;