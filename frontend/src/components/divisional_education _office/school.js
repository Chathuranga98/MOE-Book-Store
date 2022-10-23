
import React, { useState , useEffect } from 'react';
import {
    MDBTable,
    MDBTableHead,
    MDBTableBody,
  } from 'mdb-react-ui-kit';
  import { CKEditor } from '@ckeditor/ckeditor5-react';
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import NumberFormat from 'react-number-format';
  import '../../admin_css.css';
  import Navbar from "./adminNav";
  import "../APIUrl";

function Announcements() {
    const [str_NewsBody, setNewsBody] = useState("");
 
    const [emailStatus, setEmailStatus] = useState("");
    const [emailColor, setEmailColor] = useState("");
    const [email , setEmail] =  useState("");
    const [tel , setTel] =  useState("");
    const [fax , setFax] =  useState("");
  
    function setFunEmail(e){
      const email_Add = e;
      if(validateEmail(email_Add)){
        setEmailStatus("Email is valid");
        setEmailColor('green');
      }else{
        setEmailStatus("Email is invalid");
        setEmailColor('red');
      }
      setEmail(email_Add);
    }
  
    function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    return (
        <div>
            <div class="dashboard-main-wrapper">
                <Navbar/>
                <div class="dashboard-wrapper">
                <div class="container" style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                    <h2 className="text-uppercase  d-letter-spacing fw-bold d_font_family" style={{color:'black' }}><i class="bi bi-house-door-fill"></i> Dashboard</h2>
                    <h5 className="text-dark" style={{fontWeight:'100' ,  lineHeight:'0'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;School Managing</h5>

                    <hr/>
                    <div className="text-right mt-4">
                        <button type="button"  style={{ letterSpacing:'1px'}}   className='btn btn-sm btn-dark shadow-0 btn-sm'  data-toggle="modal" data-target="#addDivisionalStaff">Add School</button>
                    </div>
                    <div class="modal fade" id="addDivisionalStaff" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-xl" role="document">
                        <div class="modal-content ">
                        <div class="modal-header bg-dark">
                            <h3 class="modal-title text-white" id="exampleModalLabel">Add New School</h3>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body  pt-4 pr-4 pl-4">
                          <div class="form-group">
                            <label >Name</label>
                            <input type="text" class="form-control" id="office" />
                          </div>
                          <div class="form-group pt-2">
                            <label>Address</label>
                            <input type="text" class="form-control" id="address"  />
                          </div>
                          <div class="form-group pt-2">
                            <label>Telephone Number</label>
                            <NumberFormat format="0## ### ####" class="bg-white form-control"   onChange={(e) =>{
                                    setTel(e.target.value);
                            }} />
                          </div>
                          <div class="form-group pt-2">
                            <label>Fax</label>
                            <NumberFormat format="0## ### ####" class="bg-white form-control"   onChange={(e) =>{
                                    setFax(e.target.value);
                            }} />
                          </div>
                          <div class="form-group pt-2">
                            <label>Email</label>
                            <input type="email" class="form-control" id="email"  onChange={(e) =>{
                                    setFunEmail(e.target.value);
                            }}/>
                            <small style={{color:emailColor}}>{emailStatus}</small>
                          </div>
                          <div class="form-group pt-2">
                            <label>Web</label>
                            <input type="url" class="form-control" id="url" />
                          </div>
                          <div class="form-group pt-2">
                            <label>School Type</label>
                            <select class="form-control"  >
                                <option>Select School Type</option>
                                <option value="Type 1A">Type 1A</option>
                                <option value="Type 1C">Type 1C</option>
                                <option value="Type 2">Type 2</option>
                                <option value="Type 3(i)">Type 3(i)</option>
                                <option value="Type 3(ii)">Type 3(ii)</option>
                            </select>
                          </div>
                        </div>
                        <div class="modal-footer border-0">
                            <button type="button" class="btn btn-dark" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-success">Register</button>
                        </div>
                        </div>
                    </div>
                    </div>
                    <MDBTable className="mt-2">
                        <MDBTableHead>
                            <tr style={{backgroundColor:'#3A3A3A'}}>
                                <th className="text-white pt-3 pb-3 " ><span >Id</span></th>
                                <th className="text-white pt-3 pb-3 " ><span >Name</span></th>
                                <th className="text-white pt-3 pb-3 " ><span >Type</span></th>
                                <th className="text-white pt-3 pb-3 " ><span >Telephone Number</span></th>
                                <th className="text-white pt-3 pb-3 " ><span >Fax</span></th>
                                <th className="text-white pt-3 pb-3 " ><span >Email</span></th>
                                <th className="text-white pt-3 pb-3 " ><span >Address</span></th>
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


export default Announcements;