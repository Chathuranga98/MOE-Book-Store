
import React, { useState , useEffect } from 'react';
import { MDBCard,  MDBCardBody, MDBBtn, MDBCol, MDBRow , MDBCardTitle} from 'mdb-react-ui-kit';
import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';
import Navbar from "./adminNav";

function ViewAnnouncement() {

    var View_Announcement = reactLocalStorage.getObject('View_Announcement');
    const id = View_Announcement[0];
  
    const [title, setTitle] = useState(View_Announcement[1]);
    const [description, setDescription] = useState(View_Announcement[2]);
    const [school, setSchool] = useState(View_Announcement[5]);
    const [divisional_office, setDEO] = useState(View_Announcement[4]);
    const [message, setMessage] = useState(View_Announcement[3]);
    const [createdAt, setCreatedAt] = useState(View_Announcement[6]);



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
        window.location.href = "Admin_Announcement";
    }

    const [allDivisionalOffice,setAllDivisionalOffice] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/divisionalOffice/allDivisionalOffice")
        .then(res => setAllDivisionalOffice(res.data))
        .catch(error => console.log(error));
    },[])

    const [allSchool,setAllSchools] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/school/allSchools")
        .then(res => setAllSchools(res.data))
        .catch(error => console.log(error));
    },[])

    function getDeoName(deo_username) {
        const count_of_deo = allDivisionalOffice.length;
        for (let i = 0; i < count_of_deo; i++){
            if(allDivisionalOffice[i].username == deo_username){
              return allDivisionalOffice[i].office;
            }
        }; 
    }

    function getSchoolName(fromSchool){
        const count_of_schools = allSchool.length;
        for (let i = 0; i < count_of_schools; i++){
            if(allSchool[i].username == fromSchool){
                return allSchool[i].name;
            }
        }
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
                        <MDBBtn color="dark" size='sm' className='shadow-0 p-2' style={{letterSpacing:'1px'}} onClick={back} >Back</MDBBtn>
                    </div>
                    <MDBRow className='mt-3' >
                        <MDBCol sm='12'>
                            <MDBCard >
                            <MDBCardBody className='p-5'>
                                <MDBCardTitle className='text-dark fw-bold text-uppercase text-center' style={{letterSpacing:'1px' , fontSize:'30px'}}>{title}</MDBCardTitle>
                                <span >{"Created Date : "+formatDate(createdAt)}</span><br/>
                                <span style={{lineHeight:'1px'}}>{"To EDO : "+getDeoName(divisional_office)}</span><br/>
                                <span style={{lineHeight:'1px'}}>{"To School : "+getSchoolName(school)}</span><br/><br/>
                                <h6>{description}</h6><br/>
                                <p>{message}</p>
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


export default ViewAnnouncement;