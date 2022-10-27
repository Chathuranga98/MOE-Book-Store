
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBCardOverlay, MDBCardBody, MDBIcon, MDBCardText, MDBCardImage , MDBBtn, MDBCol, MDBRow , MDBCardTitle, MDBCardFooter} from 'mdb-react-ui-kit';
import axios from 'axios';
import {PatternFormat} from 'react-number-format';
import Swal from 'sweetalert2';
import Nav from './nav.js';
import passwordValidator from 'password-validator';
import BookShopReg from '../bookshop/bookshop_reg.js';
var schema = new passwordValidator();

function PrivateUserReg() {

    schema
    .is().min(4)                               
    .is().max(100)                             
    .has().uppercase()                         
    .has().lowercase()                         
    .has().digits(2)       
    .has().not().spaces()  
    .is().not().oneOf(['Passw0rd', 'Password123']);

    const [telephoneNumber, setTelephoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, messagePassword] = useState("");
    const [ConfirmPassword, setCPassword] = useState("");
    const [name, setFullName] = useState("");
    const [address, setHomeAddress] = useState("");
    const [nic, setNIC] = useState("");

    function reg(){
        const addLogin ={name,address,telephoneNumber,nic,email,password}

        axios.post("http://localhost:5000/private_user/addPrivateUser",addLogin).then(() =>{

        Swal.fire({  
            title: "Success!",
            text: "User Account Creating Success!",
            icon: 'success',
            confirmButtonText: "OK",
            type: "success"}).then(okay => {
                if (okay) {
                    window.location.href = "/Private_user_login";
                }
        });

        
        }).catch((err)=>{

            Swal.fire({  
            title: "Error!",
            text: "User Account Creating Not Success",
            icon: 'error',
            confirmButtonText: "OK",
            type: "success"})
        })
    }

    const [cPassColor, setCPassColor] = useState(false);
    const [messageCfpassword, setCPassMessage] = useState('');
    function setFunCPassword(event){
        const ConfirmPassword = event;
       
        if ((ConfirmPassword === password) && (ConfirmPassword !=='') && (ConfirmPassword!== null) ) {
            setCPassColor("green");
            setCPassMessage('Password Are Matching');
        } else {
            setCPassColor("red");
            setCPassMessage('Passwords Are Not Match');
        }
        setCPassword(event);
    }


    const [messageEmail, setMessageEmail] = useState('');
    const [messageEmailColor, setMessageEmailColor] = useState('');
    function setFunEmail(event){
        const input = event;
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input))
        {
            setMessageEmail('Valid Email Address');
            setMessageEmailColor("green");
        } else {
            setMessageEmail('Invalid Email Address');
            setMessageEmailColor("red");
        }
        setEmail(event);
    }

    const [messageNIC, setMessageNIC] = useState('');
    const [messageNICColor, setMessageNICColor] = useState('');
    function setFunNIC(event){
        const input = event;
        if (/^[0-9]{9}[vVxX]$/.test(input))
        {
            setMessageNIC('Valid NIC');
            setMessageNICColor("green");
        } else {
            setMessageNIC('Invalid NIC');
            setMessageNICColor("red");
        }
        setNIC(event);
    }

    const [passColor, setPassColor] = useState('');
    const [msgPass, setMsgPassword] = useState('');
    function setFunPassword(event){
        const pass = event;
        if(schema.validate(pass) === false) {
            setPassColor("red");
            setMsgPassword('Password is not strong');
        }else{
            setPassColor("green");
            setMsgPassword('Password is strong');
        }
        messagePassword(event);
    }

    function BookShopReg(){
        window.location.href = "/BookshopSelfReg";
    }
return (
        <div>
            <Nav/>
            <div>
            <div class="row row-cols-1 row-cols-md-2 g-4 container-fluid mt-5">
                <div class="col">
                    <div class="card shadow-0 mt-5 pt-5" style={{paddingTop:'30px'}}>
                        <img src="./img/login_img.png" class="card-img-top"  alt="..."/>
                    </div>
                </div>
                <div class="col mt-5" style={{paddingTop:'30px'}}>
                    <div class="card mt-5 shadow-0" style={{backgroundColor:'#F5F5F5'}}>
                        
                        <div class="card-body shadow-0 rounded" style={{border:'1px solid #DBDBDB'}} >
                            <h1 class="card-title text-uppercase pt-3 text-dark">Registration Form</h1>
                            <p class="card-text text-dark">Please sign in to continue. If you haven't an account, please create a account.</p>
                            <div class="mb-3 mt-3">
                                <label for="fullName" class="form-label">Full Name</label>
                                <input type="text" class="form-control" id="fullName" placeholder=""  style={{padding:'10px', backgroundColor:'transparent'}} onChange={(e) =>{
                                    setFullName(e.target.value);
                                }}/>
                            </div>
                            <div class="mb-3 mt-3">
                                <label for="homeAddress" class="form-label">Home Address</label>
                                <input type="text" class="form-control" id="homeAddress" placeholder=""  style={{padding:'10px', backgroundColor:'transparent'}} onChange={(e) =>{
                                    setHomeAddress(e.target.value);
                                }}/>
                            </div>
                            <div class="mb-3 mt-3">
                                <label for="telNumber" class="form-label">Telephone Number</label>
                                <PatternFormat format="############" allowEmptyFormatting  class="form-control"   style={{padding:'10px', backgroundColor:'transparent'}} onChange={(e) =>{
                                    setTelephoneNumber(e.target.value);
                                }} />
                            </div>
                            <div class="mb-3 mt-3">
                                <label for="nic" class="form-label">NIC</label>
                                <input type="text" class="form-control" id="nic" placeholder=""  style={{padding:'10px', backgroundColor:'transparent'}} onChange={(e) =>{
                                    setFunNIC(e.target.value);
                                }}/>
                                <span style={{fontSize:'12px', margin:'0px', padding:'0px' , color : messageNICColor}}   >
                                    {messageNIC}
                                </span>
                            </div>
                            <div class="mb-3 mt-3">
                                <label for="email" class="form-label">Email address</label>
                                <input type="email" class="form-control" id="email" placeholder=""  style={{padding:'10px', backgroundColor:'transparent'}}  onChange={(e) =>{
                                    setFunEmail(e.target.value);
                                }}/>
                                <span style={{fontSize:'12px', margin:'0px', padding:'0px' , color : messageEmailColor}}   >
                                    {messageEmail}
                                </span>
                            </div>
                            <div class="mb-3">
                                <label for="pass" class="form-label ">Password</label>
                                <input type="password" class="form-control" id="pass" placeholder="" style={{padding:'10px', backgroundColor:'transparent'}} onChange={(e) =>{
                                    setFunPassword(e.target.value);
                                }}/>
                                <span style={{fontSize:'12px', margin:'0px', padding:'0px' , color: passColor}}   >
                                        {msgPass}
                                </span>
                            </div>
                            <div class="mb-3">
                                <label for="cpass" class="form-label ">Confirm Password</label>
                                <input type="password" class="form-control" id="cpass" placeholder="" style={{padding:'10px', backgroundColor:'transparent'}}  onChange={(e) =>{
                                    setFunCPassword(e.target.value);
                                }}/>
                                <span style={{fontSize:'12px', margin:'0px', padding:'0px', color: cPassColor}}   >
                                    {messageCfpassword}
                                </span>
                            </div>
                            <div class="mb-1">
                                <div class="d-grid gap-2">
                                    <input type="button" class="btn btn-dark shadow-0" onClick={reg} value="Registration" />
                                </div>
                            </div>
                            <div class="mb-3">
                                <div class="row">
                                    <div class="col">
                                        <a href="Private_user_login"><small style={{color:'#818181'}} >Sign In</small></a>
                                    </div>
                                    <div class="col text-end">
                                        <a href=""></a>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <center>
                                <p>If you are bookshop owner, you can register with <b>MEO BOOKSTORE</b> and you can sell books and earn money.</p>
                                <button className="btn btn-outline-dark" onClick={BookShopReg}>I Want To Register As A Bookshop</button>
                            </center>
                        </div>
                    </div>
                </div>
                
            </div> 
            </div>
        </div>
    )
};


export default PrivateUserReg;