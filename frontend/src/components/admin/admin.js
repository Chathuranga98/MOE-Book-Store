
import React from 'react';
import { MDBCard, MDBCardHeader, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import Cookies from 'js-cookie';
import '../../admin_css.css';
import Navbar from "./adminNav";

function Index() {
    const userType = Cookies.get('userType');
    return (
    <div>
    <div class="dashboard-main-wrapper">
        <Navbar/>
        <div class="dashboard-wrapper">
            <div class="container" style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                <h2 className="text-uppercase  d-letter-spacing fw-bold d_font_family" style={{color:'black' }}><i class="bi bi-house-door-fill"></i> Dashboard</h2>
                <hr/>
                 <MDBRow  style={{marginTop:'3%'}}>
                    <MDBCol sm='8' style={{display:(userType === '"Editor"')? 'none' : 'inline' }}>
                        <a href="/Admin/divisional_staff_Dashboard">
                         <MDBCard className=" bg-dark rounded" style={{boxShadow:'2px 3px 5px #BBBBBB'}}>
                            <MDBCardHeader className=" fw-bold mt-2 h1 pl-2 pt-5 pb-4 text-center text-uppercase bg-dark rounded"  >
                                <i class="bi bi-people-fill text-white" style={{fontSize:"150%"}}></i><br/> <span className="d_font_family  text-white">Divisional Education Officer</span>
                            </MDBCardHeader>
                        </MDBCard>
                        </a>
                    </MDBCol>
                    <MDBCol sm='4'>
                        <a href="/Admin/PrivateUser">
                         <MDBCard className=" bg-dark rounded" style={{boxShadow:'2px 3px 5px #BBBBBB'}}>
                            <MDBCardHeader className=" fw-bold mt-2 h1 pl-2 pt-5 pb-4 text-center text-uppercase bg-dark rounded"  >
                                <i class="bi bi-person text-white" style={{fontSize:"150%"}}></i><br/> <span className="d_font_family  text-white">Private User</span>
                            </MDBCardHeader>
                        </MDBCard>
                        </a>
                    </MDBCol>
                
                    <MDBCol sm='4' style={{display:(userType === '"Editor"')? 'none' : 'inline' }}>
                        <a href="/Admin/ManageBookShop">
                         <MDBCard className=" bg-dark rounded" style={{boxShadow:'2px 3px 5px #BBBBBB'}}>
                            <MDBCardHeader className=" fw-bold h1 pl-2 pt-5 pb-4 text-center text-uppercase bg-dark rounded"  >
                                <i class="bi bi-book-fill text-white" style={{fontSize:"150%"}}></i><br/> <span className="d_font_family  text-white">BookShop</span>
                            </MDBCardHeader>
                        </MDBCard>
                        </a>
                    </MDBCol>

                    <MDBCol sm='8' style={{display:(userType === '"Editor"')? 'none' : 'inline' }}>
                        <a href="/Admin/BookRequest">
                         <MDBCard className=" bg-dark rounded" style={{boxShadow:'2px 3px 5px #BBBBBB'}}>
                            <MDBCardHeader className=" fw-bold h1 pl-2 pt-5 pb-4 text-center text-uppercase bg-dark rounded"  >
                                <i class="bi bi-list text-white" style={{fontSize:"150%"}}></i><br/> <span className="d_font_family  text-white">BookShop Request</span>
                            </MDBCardHeader>
                        </MDBCard>
                        </a>
                    </MDBCol>
                </MDBRow>
            </div>
        </div>
      </div>
    </div>
      )
};


export default Index;