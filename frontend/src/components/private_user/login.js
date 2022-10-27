
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBCardOverlay, MDBCardBody, MDBIcon, MDBCardText, MDBCardImage , MDBBtn, MDBCol, MDBRow , MDBCardTitle, MDBCardFooter} from 'mdb-react-ui-kit';
import axios from 'axios';
import Nav from './nav.js';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

function PrivateUserLogin() {

    const [password,setPassword] = useState("");
    const [email, setEmail] = useState("");

    async function login(e){
        e.preventDefault();
 
        let item = {email , password};
        let result = await fetch("http://localhost:5000/auth/login", {
          method: 'POST',
          headers:{
             "Content-Type" : "application/json",
             "Accept" : "application/json"
          },
          body:JSON.stringify(item)
        });
        result = await result.json();
       
        if(JSON.stringify(result.message) == '"private_user"'){
            Cookies.set('username', email);
            Swal.fire({  
                title: "Success!",
                text: "Login Success!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                    if (okay) {
                        window.location.href = "/Private_user_dashboard";
                    }
            });   
        }else if(JSON.stringify(result.message) == '"school"'){
            Cookies.set('username', email);
            Swal.fire({  
                title: "Success!",
                text: "Login Success!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                    if (okay) {
                        window.location.href = "/SchoolsDashboard";
                    }
            });   
        }else if(JSON.stringify(result.message) == '"deo"'){
            Cookies.set('username', email);
            Swal.fire({  
                title: "Success!",
                text: "Login Success!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                    if (okay) {
                        window.location.href = "/DivisionalOffice_dashboard";
                    }
            });   
        }else if(JSON.stringify(result.message) == '"Bookshop"'){
            Cookies.set('username', email);
            Swal.fire({  
                title: "Success!",
                text: "Login Success!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                    if (okay) {
                        window.location.href = "/Bookshop_dashboard";
                    }
            });   
        }else if(JSON.stringify(result.message) == '"Admin"'){
            Cookies.set('username', email);
            Swal.fire({  
                title: "Success!",
                text: "Login Success!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                    if (okay) {
                        window.location.href = "/Admin_dashboard";
                    }
            });   
        }
     }
return (
        <div>
            <Nav/>
            <div >
                <div class="row row-cols-1 row-cols-md-2 g-4 container-fluid mt-5">
                    
                    <div class="col mt-5" style={{paddingTop:'30px'}}>
                        <div class="card mt-5 shadow-0" style={{backgroundColor:'#F5F5F5'}}>
                            
                            <div class="card-body shadow-0 rounded" style={{border:'1px solid #DBDBDB'}} >
                                <h1 class="card-title text-uppercase pt-3 text-dark">Welcome Back</h1>
                                <p class="card-text text-dark">Please sign in to continue. If you haven't an account, please create a account.</p>
                                <div class="mb-3 mt-3">
                                    <label for="email" class="form-label">Email address</label>
                                    <input type="email" class="form-control" id="email" placeholder=""  style={{padding:'10px', backgroundColor:'transparent'}}  onChange={(e) =>{
                                        setEmail(e.target.value);
                                    }}/>
                                </div>
                                <div class="mb-3">
                                    <label for="pass" class="form-label ">Password</label>
                                    <input type="password" class="form-control" id="pass" placeholder="" style={{padding:'10px', backgroundColor:'transparent'}}  onChange={(e) =>{
                                        setPassword(e.target.value);
                                    }}/>
                                </div>
                                <div class="mb-1">
                                    <div class="d-grid gap-2">
                                        <input type="button" class="btn btn-dark shadow-0" id="login" onClick={login} value="Login" />
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <div class="row">
                                        <div class="col">
                                            <a href="Private_user_reg"><small style={{color:'#818181'}}>Sign Up</small></a>
                                        </div>
                                        <div class="col text-end">
                                            <a href=""><small style={{color:'#818181'}}>Forgot Password</small></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col text-center">
                        <div class="card shadow-0 mt-5 pt-5" style={{paddingTop:'30px'}}>
                            <img src="./img/login_img.png" class="card-img-top"  alt="..."/>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    )
};


export default PrivateUserLogin;