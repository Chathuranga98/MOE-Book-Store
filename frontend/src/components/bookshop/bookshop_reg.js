
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBCardOverlay, MDBCardBody, MDBIcon, MDBCardText, MDBCardImage , MDBBtn, MDBCol, MDBRow , MDBCardTitle, MDBCardFooter} from 'mdb-react-ui-kit';
import axios from 'axios';
import {PatternFormat} from 'react-number-format';
import Swal from 'sweetalert2';
import Nav from '../private_user/nav.js';
import passwordValidator from 'password-validator';
var schema = new passwordValidator();

function BookShopReg() {

    schema
    .is().min(4)                               
    .is().max(100)                             
    .has().uppercase()                         
    .has().lowercase()                         
    .has().digits(2)       
    .has().not().spaces()  
    .is().not().oneOf(['Passw0rd', 'Password123']);

    const [telephone, setTelephoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [name, setBookShopName] = useState("");
    const [password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [bookshopProfile, setBookShopLogo] = useState("");

    const [isValidCPassword, setIsValidCfPassword] = useState(false);
    const [msgPassword, setMessagePassword] = useState('');

    function clear(){
        setTelephoneNumber("");
        setEmail("");
        setAddress("");
        setBookShopName("");
        setPassword("");
        setBookShopLogo("");
        setCPassMessage("");
        setMessageEmail("");
        setMessagePassword("");
   }

    function reg(){
       
        const formData = new FormData();
        formData.append("file" ,bookshopProfile);
        formData.append("upload_preset", "ml_default");

        axios.post("https://api.cloudinary.com/v1_1/nadun/image/upload",formData).then((response)=>{    
        const profile =bookshopProfile.name; 
        const status ="Pending";

        const addShop ={password, name, address, telephone, email, profile, status}

        axios.post("http://localhost:5000/book_shop/addBookShop",addShop).then(() =>{
            Swal.fire({  
                title: "Success!",
                text: "Book Shop Adding Success!",
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
                text: "Book Shop Adding Not Success",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"})
            })
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
        setConfirmPassword(event);
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
        setPassword(event);
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
                            <h1 class="card-title text-uppercase pt-3 text-dark">BOOKSHOP Registration </h1>
                            <p class="card-text text-dark">Please sign in to continue. If you haven't an account, please create a account.</p>
                            <div class="mb-3 mt-3">
                                <label for="fullName" class="form-label">Shop Name</label>
                                <input type="text" class="form-control" id="fullName" placeholder=""  style={{padding:'10px', backgroundColor:'transparent'}} onChange={(e) =>{
                                    setBookShopName(e.target.value);
                                }}/>
                            </div>
                            <div class="mb-3 mt-3">
                                <label for="homeAddress" class="form-label">Address</label>
                                <input type="text" class="form-control" id="homeAddress" placeholder=""  style={{padding:'10px', backgroundColor:'transparent'}} onChange={(e) =>{
                                    setAddress(e.target.value);
                                }}/>
                            </div>
                            <div class="mb-3 mt-3">
                                <label for="telNumber" class="form-label">Telephone Number</label>
                                <PatternFormat format="############" allowEmptyFormatting  class="form-control"   style={{padding:'10px', backgroundColor:'transparent'}} onChange={(e) =>{
                                    setTelephoneNumber(e.target.value);
                                }} />
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
                            <div class="mb-3">
                                <h6 className="fw-normal text-dark">Logo of the Bookshop</h6>
                                <input type="file" onChange={(e) =>{
                                                                    setBookShopLogo(e.target.files[0]);
                                                                }} class="form-control" id="customFile" />
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
                                        <a href="Private_user_reg"><small style={{color:'#818181'}} >Register As A Private User</small></a>
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


export default BookShopReg;