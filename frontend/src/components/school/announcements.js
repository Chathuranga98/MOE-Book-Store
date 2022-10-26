
import React, { useState , useEffect } from 'react';
import {
    MDBTable,
    MDBTableHead,
    MDBTableBody,
  } from 'mdb-react-ui-kit';
  import { CKEditor } from '@ckeditor/ckeditor5-react';
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import '../../admin_css.css';
  import Navbar from "./adminNav";
  import "../APIUrl";

function Announcements() {
    const [str_NewsBody, setNewsBody] = useState("");

    return (
        <div>
            <div class="dashboard-main-wrapper">
                <Navbar/>
                <div class="dashboard-wrapper">
                <div class="container" style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                    <h2 className="text-uppercase  d-letter-spacing fw-bold d_font_family" style={{color:'black' }}><i class="bi bi-house-door-fill"></i> Dashboard</h2>
                    <h5 className="text-dark" style={{fontWeight:'100' ,  lineHeight:'0'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Announcements</h5>

                    <hr/>
                    <div class="row mt-4">
                        <div class="col-sm-4">
                            <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Title</h5>
                                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                <div className="row">
                                    <div className="col pt-2">
                                        <span >Date : 2022-08-20</span><br/><br/>
                                    </div>
                                    <div className="col">
                                        <a href="#!" class="btn btn-primary">Read More</a>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
};


export default Announcements;