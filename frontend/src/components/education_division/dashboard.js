
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBCardOverlay, MDBCardBody, MDBIcon, MDBCardText, MDBCardImage , MDBBtn, MDBCol, MDBRow , MDBCardTitle, MDBCardFooter} from 'mdb-react-ui-kit';
import axios from 'axios';
import Navbar from "./edoNav";
import Cookies from 'js-cookie';

function Schools() {

    const UserName =  Cookies.get('username');
    function goSchools(){
        window.location.href = "DivisionalOffice_Schools";
    }    
    
    function goDivisionalOffice_Announcements(){
        window.location.href = "Notice_for_deo";
    } 

    function goBookRequestToDeo(){
        window.location.href = "BookRequestToDeo";
    }

    const [oneDivisionalOffice,setOneDivisionalOffice] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/divisionalOffice/oneDivisionalOfficeByUsername/"+UserName)
        .then(res => setOneDivisionalOffice(res.data))
        .catch(error => console.log(error));
    },[])
    
    const telephoneNumber = oneDivisionalOffice.telephoneNumber;
    const faxNumber = oneDivisionalOffice.faxNumber;
    const email = oneDivisionalOffice.email;
    const website = oneDivisionalOffice.website;
    const address = oneDivisionalOffice.address;
    const office = oneDivisionalOffice.office;

   
    return (
        <div>
        <div class="dashboard-main-wrapper">
            <Navbar/>
            <div class="dashboard-wrapper">
                <div class="container" style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i><small>DEO</small><br/>&nbsp;&nbsp;&nbsp;&nbsp;Dashboard</h4>
                    <hr/>
                    <MDBCard background='dark' className='text-white'>
                        <MDBCardImage style={{border:'1px solid #697870'}} overlay src='https://i.imgur.com/HoxrtcP.jpeg' alt='...' />
                        <MDBCardOverlay>
                            <MDBCardTitle style={{color:'#212F27'}} className='display-6 mt-3 text-decoration-underline'>Welcome To Office Dashboard</MDBCardTitle>
                            
                            <div>
                                <h5 style={{color:'#114D5F' , fontSize:'17px'}}>Divisional Name : {office}</h5>
                                <h5 style={{color:'#114D5F' , fontSize:'17px'}}>Address : {address}</h5>
                                <h5 style={{color:'#114D5F' , fontSize:'17px'}}>Telephone Number : {telephoneNumber}</h5>
                                <h5 style={{color:'#114D5F' , fontSize:'17px'}}>Fax : {faxNumber}</h5>
                                <h5 style={{color:'#114D5F' , fontSize:'17px'}}>Email : {email}</h5>
                                <h5 style={{color:'#114D5F' , fontSize:'17px'}}>Web Site : <a style={{color:'#114D5F' , fontSize:'17px'}} href={website} target="_blank">{website}</a></h5>
                            </div>
                        </MDBCardOverlay>
                    </MDBCard>
                    <MDBRow >
                        <MDBCol sm='4'>
                            <MDBCard onClick={goSchools} >
                            <MDBCardBody>
                                <MDBCardTitle className='text-dark fw-bold text-uppercase' style={{letterSpacing:'1px'}}>Schools</MDBCardTitle>
                                <MDBCardText className="mt-3" style={{lineHeight:'125%'}}>
                                    Administrators able to add new schools and manage schools.
                                </MDBCardText>
                                <MDBBtn  style={{backgroundColor:'#3E5647'}} className="shadow-0" href='#'>GO <MDBIcon fas icon="long-arrow-alt-right" /></MDBBtn>
                            </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol sm='4'>
                            <MDBCard onClick={goBookRequestToDeo}>
                            <MDBCardBody>
                                <MDBCardTitle className='text-dark fw-bold text-uppercase' style={{letterSpacing:'1px'}}>Book Requests</MDBCardTitle>
                                <MDBCardText className="mt-3" style={{lineHeight:'125%'}}>
                                    All books requests are send by Schools to the admin and admin manage requests.
                                </MDBCardText>
                                <MDBBtn  style={{backgroundColor:'#3E4856'}} className="shadow-0" href='#'>GO <MDBIcon fas icon="long-arrow-alt-right" /></MDBBtn>
                            </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        
                        <MDBCol sm='4'>
                            <MDBCard onClick={goDivisionalOffice_Announcements}>
                                <MDBCardBody>
                                    <MDBCardTitle className='text-dark fw-bold text-uppercase' style={{letterSpacing:'1px'}}>Announcement</MDBCardTitle>
                                    <MDBCardText className="mt-3" style={{lineHeight:'125%'}}>
                                        Administrators able to view announcements which a send by admin.
                                    </MDBCardText>
                                    <MDBBtn  style={{backgroundColor:'#523E56'}} className="shadow-0" href='#'>GO <MDBIcon fas icon="long-arrow-alt-right" /></MDBBtn>
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


export default Schools;