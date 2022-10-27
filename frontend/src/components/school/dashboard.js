
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBCardOverlay, MDBCardBody, MDBIcon, MDBCardText, MDBCardImage , MDBBtn, MDBCol, MDBRow , MDBCardTitle, MDBCardFooter} from 'mdb-react-ui-kit';
import axios from 'axios';
import Navbar from "./schoolNav";
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';


function SchoolsDashboard() {
    const schoolUserName =  Cookies.get('username');
    
    function SchoolsBook_request_Deo(){
        window.location.href = "SchoolsBook_request_Deo";
    }

    function SchoolsBook_request_Schools(){
        window.location.href = "RequestBookFromSchool";
    }

    function Notice_for_school(){
        window.location.href = "Notice_for_school";
    }

    const [oneSchool,setOneSchools] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/school/oneSchoolByUsername/"+schoolUserName)
        .then(res => setOneSchools(res.data))
        .catch(error => console.log(error));
    },[])

    const [doe,setDeo] = useState("")
    function getDeoName(name) {
        Cookies.set('deo', name);

        axios.get("http://localhost:5000/divisionalOffice/oneDivisionalOfficeByUsername/"+name)
       .then(res => {
            setDeo(res.data.office);
        })
       .catch(error => console.log(error));
       return doe; 
    }

    function School_profile(_id,name, address, telephoneNumber, faxNumber, email, website, schoolType, username, password, DEO, status, userType){
        reactLocalStorage.setObject("School_profile", [_id,name, address, telephoneNumber, faxNumber, email, website, schoolType, username, password, DEO, status, userType]);
        window.location.href = "School_profile";
    }
    return (
        <div>
        <div class="dashboard-main-wrapper">
            <Navbar/>
            <div class="dashboard-wrapper">
                <div class="container" style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i><small>Schools</small><br/>&nbsp;&nbsp;&nbsp;&nbsp;Dashboard</h4>
                    <hr/>
                    <MDBCard background='dark' className='text-white'>
                        <MDBCardImage style={{border:'1px solid #697870'}} overlay src='https://i.imgur.com/E5FDvbJ.jpeg' alt='...' />
                        <MDBCardOverlay>
                        
                        {oneSchool.map((school,key) => (
                            <div className='row'>
                                <div className="col">
                                    <MDBCardTitle style={{color:'#000000'}} className='display-6 mt-3 text-decoration-underline text-capitalize'>{school.name}</MDBCardTitle>
                                    <h5 style={{color:'#263439' , fontSize:'17px'}}>Address : <span style={{textTransform:'capitalize'}}>{school.address}</span></h5>
                                    <h5 style={{color:'#263439' , fontSize:'17px'}}>Telephone Number : {school.telephoneNumber}</h5>
                                    <h5 style={{color:'#263439' , fontSize:'17px'}}>Fax Number : {school.faxNumber}</h5>
                                    <h5 style={{color:'#263439' , fontSize:'17px'}}>Email : {school.email}</h5>
                                    <h5 style={{color:'#263439' , fontSize:'17px'}}>Divisional Education Office  : {getDeoName(school.DEO)}</h5>
                                    <h5 style={{color:'#263439' , fontSize:'17px'}}>School Type  : {school.schoolType}</h5>
                                    <h5 style={{color:'#263439' , fontSize:'17px'}}>Web Site : <a style={{color:'#263439' , fontSize:'17px'}} href={school.website} target="_blank">{school.website}</a></h5>
                                </div>
                                <div className="col">
                                    <center>
                                    <MDBCardImage  src={'https://res.cloudinary.com/nadun/image/upload/v1654197415/'+school.logo} style={{width:'250px'}} className="mt-3"  position='top' alt='...' />
                                    </center>
                                </div>
                            </div>
                        ))}
                        </MDBCardOverlay>
                    </MDBCard>
                    <MDBRow >
                        <MDBCol sm='4'>
                            <MDBCard onClick={SchoolsBook_request_Deo} >
                            <MDBCardBody>
                                <MDBCardTitle className='text-dark fw-bold text-uppercase' style={{letterSpacing:'1px'}}>Book Requests To D.E.O</MDBCardTitle>
                                <MDBCardText className="mt-3" style={{lineHeight:'125%'}}>
                                    School able to add books requests and manage requests.
                                </MDBCardText>
                                <MDBBtn  style={{backgroundColor:'#3E5647'}} className="shadow-0">GO <MDBIcon fas icon="long-arrow-alt-right" /></MDBBtn>
                            </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol sm='4'>
                            <MDBCard onClick={SchoolsBook_request_Schools}>
                            <MDBCardBody>
                                <MDBCardTitle className='text-dark fw-bold text-uppercase' style={{letterSpacing:'1px'}}>Book Requests To School</MDBCardTitle>
                                <MDBCardText className="mt-3" style={{lineHeight:'125%'}}>
                                    All books requests are send by Schools to the admin and admin manage requests.
                                </MDBCardText>
                                <MDBBtn  style={{backgroundColor:'#3E4856'}} className="shadow-0">GO <MDBIcon fas icon="long-arrow-alt-right" /></MDBBtn>
                            </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol sm='4'>
                        {oneSchool.map((school,key) => (
                            <MDBCard onClick={() => School_profile(school._id,school.name
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
                                , school.userType)}>
                                <MDBCardBody>
                                    <MDBCardTitle className='text-dark fw-bold text-uppercase' style={{letterSpacing:'1px'}}>Profile</MDBCardTitle>
                                    <MDBCardText className="mt-3" style={{lineHeight:'125%'}}>
                                        School able to update their school profile thought this page.
                                    </MDBCardText>
                                    <MDBBtn  style={{backgroundColor:'#56473E'}} className="shadow-0">GO <MDBIcon fas icon="long-arrow-alt-right" /></MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                        ))}
                        </MDBCol> 
                        <MDBCol sm='4'>
                            <MDBCard onClick={Notice_for_school}>
                                <MDBCardBody>
                                    <MDBCardTitle className='text-dark fw-bold text-uppercase' style={{letterSpacing:'1px'}}>Announcement</MDBCardTitle>
                                    <MDBCardText className="mt-3" style={{lineHeight:'125%'}}>
                                        School able to update their school profile thought this page.
                                    </MDBCardText>
                                    <MDBBtn  style={{backgroundColor:'#56473E'}} className="shadow-0">GO <MDBIcon fas icon="long-arrow-alt-right" /></MDBBtn>
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


export default SchoolsDashboard;