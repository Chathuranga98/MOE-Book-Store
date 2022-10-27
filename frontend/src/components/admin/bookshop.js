
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBModal, MDBCardBody, MDBIcon, MDBCardText, MDBModalDialog ,MDBModalBody ,MDBModalFooter,MDBModalContent,MDBModalHeader,MDBModalTitle, MDBBtn, MDBCol, MDBRow , MDBCardTitle, MDBCardImage} from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';
import axios from 'axios';
import {PatternFormat} from 'react-number-format';
import Navbar from "./adminNav";
import passwordValidator from 'password-validator';
var schema = new passwordValidator();

function BookShop() {
    
    schema
    .is().min(4)                               
    .is().max(100)                             
    .has().uppercase()                         
    .has().lowercase()                         
    .has().digits(2)       
    .has().not().spaces()  
    .is().not().oneOf(['Password', 'Password123']);

    const [bookshopAdd, setBookShopsAdd] = useState(false);
    const toggleShow = () => setBookShopsAdd(!bookshopAdd);
    
    const [bookshopEdit, setBookShopsEdit] = useState(false);
    const toggleShowEdit = () => setBookShopsEdit(!bookshopEdit);

    const [telephone, setTelephoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [name, setBookShopName] = useState("");
    const [password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [bookshopProfile, setBookShopLogo] = useState("");
    
    const [telephoneEdit, setTelephoneNumberEdit] = useState("");
    const [emailEdit, setEmailEdit] = useState("");
    const [addressEdit, setAddressEdit] = useState("");
    const [nameEdit, setBookShopNameEdit] = useState("");
    const [shopEditId, setShopEditId] = useState("");

    function editBookShop(_id, name, address, telephoneNumber, email){
        setShopEditId(_id);
        setBookShopNameEdit(name);
        setAddressEdit(address);
        setEmailEdit(email);
        setTelephoneNumberEdit(telephoneNumber);
        setBookShopsEdit(!bookshopEdit);
    }
    
   const [allBookShop,setAllBookShop] = useState([])
   useEffect(() => {
       axios.get("http://localhost:5000/book_shop/allBookShop")
       .then(res => setAllBookShop(res.data))
       .catch(error => console.log(error));
   },[])

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

    function saveBookShop() {

        const formData = new FormData();
        formData.append("file" ,bookshopProfile);
        formData.append("upload_preset", "ml_default");

        axios.post("https://api.cloudinary.com/v1_1/nadun/image/upload",formData).then((response)=>{    
        const profile =bookshopProfile.name; 
        const status ="Active";

        const addShop ={password, name, address, telephone, email, profile, status}

        axios.post("http://localhost:5000/book_shop/addBookShop",addShop).then(() =>{
            Swal.fire({  
                title: "Success!",
                text: "Book Shop Adding Success!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                    if (okay) {
                        clear();
                        setBookShopsAdd(!bookshopAdd);
                        axios.get("http://localhost:5000/book_shop/allBookShop")
                        .then(res => setAllBookShop(res.data))
                        .catch(error => console.log(error));
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

    function back(){
        window.location.href = "Admin_Dashboard";
    }

    const [messageEmail, setMessageEmail] = useState('');
    const [messageEmailColor, setMessageEmailColor] = useState('');
    function setFunEmail(e){
        const input = e;
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input))
        {
            setMessageEmail('Valid Email Address');
            setMessageEmailColor("green");
        } else {
            setMessageEmail('Invalid Email Address');
            setMessageEmailColor("red");
        }
        setEmail(e);
    }

    const [isValidCPassword, setIsValidCfPassword] = useState(false);
    const [msgPassword, setMessagePassword] = useState('');
    function setFunPassword(event){
        const pass = event;
        if(schema.validate(pass) === false) {
            setIsValidCfPassword("Red");
            setMessagePassword('Password is not strong');
        }else{
            setIsValidCfPassword("Green");
            setMessagePassword('Password is strong');
        }
        setPassword(event);
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

    function editShop(){
        Swal.fire({
            title: 'Do you want to update book shop?' ,
            icon: 'warning',
            confirmButtonText: 'Yes',
            showDenyButton: true,
            denyButtonText: 'No',
           
        }).then((result) => {
            if (result['isConfirmed']){
                    const updateBookShop ={shopEditId,addressEdit,telephoneEdit}
                    axios.put("http://localhost:5000/book_shop/updateShop",updateBookShop).then(() =>{
    
                    Swal.fire({  
                        title: "Success!",
                        text: "Book Shop Updating Success",
                        icon: 'success',
                        confirmButtonText: "OK",
                        type: "success"}).then(okay => {
                            if (okay) {
                                axios.get("http://localhost:5000/book_shop/allBookShop")
                                .then(res => setAllBookShop(res.data))
                                .catch(error => console.log(error));

                                setBookShopsEdit(!bookshopEdit);
                            }
                    });
            
                    
                    }).catch((err)=>{
            
                        Swal.fire({  
                        title: "Error!",
                        text: "System Error!. Book Shop Not Updated.",
                        icon: 'error',
                        confirmButtonText: "OK",
                        type: "success"})
                    })
            }else{
                Swal.fire({  
                    title: "Warning!",
                    text: "Book Shop Updating Canceled",
                    icon: 'warning',
                    confirmButtonText: "OK",
                    type: "success"
                })
            }
        });
    }

    function givePermissionForBookShop(){
        window.location.href = "/givePermissionForBookShop";
    }

    return (
        <div>
        <div class="dashboard-main-wrapper">
            <Navbar/>
            <div class="dashboard-wrapper">
                <div class="container pb-5" style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i><small>ADMIN</small><br/>&nbsp;&nbsp;&nbsp;&nbsp;Dashboard</h4>
                    <hr/>
                    <div className="text-end">
                        <MDBBtn color="dark" size='sm' className='shadow-0 p-2 mr-2' style={{letterSpacing:'1px'}}  onClick={toggleShow} >Add Book Shop</MDBBtn>
                        <MDBBtn color="dark" size='sm' className='shadow-0 p-2 mr-2' style={{letterSpacing:'1px'}}  onClick={givePermissionForBookShop} >Give Permissions</MDBBtn>
                        <MDBBtn color="dark" size='sm' className='shadow-0 p-2' style={{letterSpacing:'1px'}} onClick={back} >Back</MDBBtn>
                    </div>
                    <MDBRow className='mt-3 mb-5' >
                    {allBookShop.map((bookshop,key) => (
                        <MDBCol sm='4' className="mt-4" >
                            <MDBCard className="h-100">
                            <center>
                                <MDBCardImage  src={'https://res.cloudinary.com/nadun/image/upload/v1654197415/'+bookshop.profile} style={{height:'150px'}} className="mt-4"  position='center' alt='...' />
                            </center>
                            <MDBCardBody>
                                <MDBCardTitle className='text-dark fw-bold text-uppercase' style={{letterSpacing:'1px'}}>{bookshop.name}</MDBCardTitle>
                                <MDBCardText className="mt-3 ml-3" style={{lineHeight:'125%'}}>
                                    <MDBIcon fas icon="phone" /> &nbsp;&nbsp;Telephone : {bookshop.telephoneNumber}<br/>
                                    <MDBIcon fas icon="map-marker" /> &nbsp;&nbsp;&nbsp;Address : {bookshop.address}<br/>
                                    <MDBIcon fas icon="envelope" /> &nbsp;&nbsp;Email : {bookshop.email}<br/>
                                </MDBCardText>
                                <MDBBtn  style={{backgroundColor:'#3E5647'}}  size='sm' className="shadow-0" onClick={()=>editBookShop(bookshop._id, bookshop.name, bookshop.address, bookshop.telephoneNumber, bookshop.email)}>Edit <MDBIcon fas icon="long-arrow-alt-right" /></MDBBtn>
                            </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    ))}
                    </MDBRow>
                </div>
            </div>
            <MDBModal show={bookshopAdd} staticBackdrop setShow={setBookShopsAdd} tabIndex='-1'>
                <MDBModalDialog size='xl'>
                <MDBModalContent>
                    <MDBModalHeader className="bg-dark">
                        <MDBModalTitle className="text-white" style={{fontWeight:'200'}}>Add New BookShop</MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody className="p-5">
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Bookshop Name</h6>
                            <input type="text" class="bg-light form-control" value={name} onChange={(e) =>{
                                setBookShopName(e.target.value);
                            }}/>
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Address</h6>
                            <input type="text" class="bg-light form-control" value={address} onChange={(e) =>{
                                setAddress(e.target.value);
                            }} />
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Telephone Number</h6>
                            <PatternFormat format="0#########" allowEmptyFormatting value={telephone}  class="bg-light form-control"  onChange={(e) =>{
                                setTelephoneNumber(e.target.value);
                            }} />
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Email</h6>
                            <input type="text" class="bg-light form-control" value={email}  onChange={(e) =>{
                                setFunEmail(e.target.value);
                            }} />
                            <span style={{fontSize:'12px', margin:'0px', padding:'0px' , color : messageEmailColor}}   >
                                {messageEmail}
                            </span>
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Password</h6>
                            <input type="password" class="bg-light form-control" value={password} onChange={(e) =>{
                                setFunPassword(e.target.value);
                            }}/>
                            <span style={{fontSize:'12px', margin:'0px', padding:'0px', color: isValidCPassword}}   >
                                    {msgPassword}
                            </span>
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Confirm Password</h6>
                            <input type="password" class="form-control" id="cpass" value={ConfirmPassword} placeholder="" onChange={(e) =>{
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
                    </MDBModalBody>
                    <MDBModalFooter>
                    <MDBBtn color='danger' onClick={toggleShow}>
                        Close
                    </MDBBtn>
                    <MDBBtn color='dark' onClick={clear}>
                        Clear
                    </MDBBtn>
                    <MDBBtn color='success' onClick={saveBookShop}>Save</MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

            <MDBModal show={bookshopEdit} staticBackdrop setShow={setBookShopsEdit} tabIndex='-1'>
                <MDBModalDialog size='xl'>
                <MDBModalContent>
                    <MDBModalHeader className="bg-dark">
                        <MDBModalTitle className="text-white" style={{fontWeight:'200'}}>Edit BookShop</MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={toggleShowEdit}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody className="p-5">
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Bookshop Name</h6>
                            <input type="text" class="bg-light form-control" value={nameEdit} onChange={(e) =>{
                                setBookShopNameEdit(e.target.value);
                            }}/>
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Address</h6>
                            <input type="text" class="bg-light form-control" value={addressEdit} onChange={(e) =>{
                                setAddressEdit(e.target.value);
                            }} />
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Telephone Number</h6>
                            <PatternFormat format="##########" allowEmptyFormatting value={telephoneEdit}  class="bg-light form-control"  onChange={(e) =>{
                                setTelephoneNumberEdit(e.target.value);
                            }} />
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Email</h6>
                            <input type="text" class="form-control" value={emailEdit} disabled style={{backgroundColor:'#FDD1D1' , color:'#C23434'}}   title="This text field can not edit." onChange={(e) =>{
                                setEmailEdit(e.target.value);
                            }} />
                        </div>
                       
                    </MDBModalBody>
                    <MDBModalFooter>
                    <MDBBtn color='danger' onClick={toggleShowEdit}>
                        Close
                    </MDBBtn>
                    <MDBBtn color='dark' onClick={clear}>
                        Clear
                    </MDBBtn>
                    <MDBBtn color='success' onClick={editShop}>Edit</MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
          </div>
        </div>
      )
};


export default BookShop;