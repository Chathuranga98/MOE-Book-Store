
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBModal, MDBCardBody, MDBIcon, MDBCardText, MDBModalDialog ,MDBModalBody ,MDBModalFooter,MDBModalContent,MDBModalHeader,MDBModalTitle, MDBBtn, MDBCol, MDBRow , MDBCardTitle, MDBCardFooter} from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';
import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';
import Navbar from "./privateNav";
import Cookies from 'js-cookie';

function AnnouncementPrivateUser() {
    const schoolUserName =  Cookies.get('username');

    const [allAnnouncements,setAllAnnouncements] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/announcement/AnnouncementOnlyPrivateUser")
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

 
    function back(){
        window.location.href = "Private_user_dashboard";
    }

    function ViewAnnouncement( _id,title, description, message, divisional_office, school,createdAt){
        reactLocalStorage.setObject("View_Announcement", [_id,title, description, message, divisional_office, school,createdAt]);
        window.location.href = "/Private_notice_view_announcement";
    }

    return (
        <div>
        <div class="dashboard-main-wrapper">
            <Navbar/>
            <div class="dashboard-wrapper">
                <div class="container" style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i><small>Private User</small><br/>&nbsp;&nbsp;&nbsp;&nbsp;Dashboard</h4>
                    <hr/>
                    <div className="text-end">
                        <MDBBtn color="dark" size='sm' className='shadow-0 p-2' style={{letterSpacing:'1px'}} onClick={back} >Back</MDBBtn>
                    </div>
                    <MDBRow className='mt-3' >
                    {allAnnouncements.map((announcement,key) => (
                        <MDBCol sm='4'>
                            <MDBCard >
                            <MDBCardBody>
                                <MDBCardTitle className='text-dark fw-bold text-uppercase' style={{letterSpacing:'1px'}}>{announcement.title}</MDBCardTitle>
                                <MDBCardText className="mt-3" style={{lineHeight:'125%'}}>
                                    {announcement.description}<br/><br/>
                                    <small>{"Published Date : "+formatDate(announcement.createdAt)}</small><br/>
                                </MDBCardText>
                                <MDBBtn  style={{backgroundColor:'#3E5647'}}  size='sm' className="shadow-0" href='#' onClick={()=>ViewAnnouncement( announcement._id , announcement.title, announcement.description, announcement.message, announcement.divisional_office, announcement.school, announcement.createdAt)}>View <MDBIcon fas icon="long-arrow-alt-right" /></MDBBtn>
                            </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    ))}
                    </MDBRow>
                </div>
            </div>
           
          </div>
        </div>
      )
};


export default AnnouncementPrivateUser;