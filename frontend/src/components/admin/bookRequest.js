
import React, { useState , useEffect } from 'react';
import {
    MDBTable,
    MDBTableHead,
    MDBTableBody,
  } from 'mdb-react-ui-kit';
  import NumberFormat from 'react-number-format';
  import '../../admin_css.css';
  import Navbar from "./adminNav";
  import "../APIUrl";

function BookRequest() {


    return (
        <div>
            <div class="dashboard-main-wrapper">
                <Navbar/>
                <div class="dashboard-wrapper">
                <div class="container" style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                <h2 className="text-uppercase  d-letter-spacing fw-bold d_font_family" style={{color:'black' }}><i class="bi bi-house-door-fill"></i> Dashboard</h2>
                    <h5 className="text-dark" style={{fontWeight:'100' ,  lineHeight:'0'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Manage Book Shop</h5>
                    <hr/>

                    <MDBTable className="mt-5">
                        <MDBTableHead>
                            <tr style={{backgroundColor:'#3A3A3A'}}>
                                <th className="text-white pt-3 pb-3 " ><span >Collage</span></th>
                                <th className="text-white pt-3 pb-3 " ><span >Address</span></th>
                                <th className="text-white pt-3 pb-3 " ><span >Telephone</span></th>
                                <th className="text-white pt-3 pb-3 " ><span >Textbook Id</span></th>
                                <th className="text-white pt-3 pb-3 " ><span >Quantity</span></th>
                                <th className="text-white pt-3 pb-3 " ><span >Action</span></th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                      
                        </MDBTableBody>
                    </MDBTable>

                </div>
                </div>
            </div>
        </div>
    )
};


export default BookRequest;