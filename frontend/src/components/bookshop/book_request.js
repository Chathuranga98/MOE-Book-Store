
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBModal, MDBCardBody, MDBIcon, MDBCardText, MDBModalDialog ,MDBModalBody ,MDBModalFooter,MDBModalContent,MDBModalHeader,MDBModalTitle, MDBBtn, MDBCol, MDBRow , MDBCardTitle, MDBCardFooter} from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';
import axios from 'axios';
import {PatternFormat} from 'react-number-format';
import Navbar from "./shopNav";
import Cookies from 'js-cookie';

function RequestBook() {
    const bookShopName =  Cookies.get('username');

    function back(){
        window.location.href = "Bookshop_dashboard";
    }

    const [shopAdd, setShopAdd] = useState(false);
    const toggleShow = () => setShopAdd(!shopAdd);

    const [shopTransfer, setShopTransfer] = useState(false);
    const toggleTransferShow = () => setShopTransfer(!shopTransfer);

    const [language, setLanguage] = useState("");
    const [subject, setSubject] = useState("");
    const [grade, setGrade] = useState("");
    const [qty, setQty] = useState("");
    const [book_image, setBookPhoto] = useState("");
    const [bookshop, setBookShop] = useState(bookShopName);

    const [languageTransfer, setLanguageTransfer] = useState("");
    const [subjectTransfer, setSubjectTransfer] = useState("");
    const [gradeTransfer, setGradeTransfer] = useState("");
    const [qtyTransfer, setQtyTransfer] = useState("");
    const [TransferBookRId, setTransferBookRId] = useState("");

    const [price, setPricePerBook] = useState("");
    const [discount, setDiscountPerBook] = useState("");
    const [description, setDescription] = useState("");

    
   const [allBookRequest,setAllBookRequest] = useState([])
   useEffect(() => {
       axios.get("http://localhost:5000/book_request_from_shop/allBookRequest/"+bookShopName)
       .then(res => setAllBookRequest(res.data))
       .catch(error => console.log(error));
   },[])

    function saveBookRequest() {
        
        const bookshop = bookShopName;
        const addBookRequest ={bookshop
            , language
            , subject
            , grade
            , qty}

        axios.post("http://localhost:5000/book_request_from_shop/addBookRequest",addBookRequest).then(() =>{

        Swal.fire({  
            title: "Success!",
            text: "Book Request Sending Success!",
            icon: 'success',
            confirmButtonText: "OK",
            type: "success"}).then(okay => {
                if (okay) {
                    window.location.href = "/Bookshop_book_request";
                }
        });

        
        }).catch((err)=>{

            Swal.fire({  
            title: "Error!",
            text: "Book Request Sending  Not Success",
            icon: 'error',
            confirmButtonText: "OK",
            type: "success"})
        })
    }

    async function edit_book_qty(request_id) {
        const { value: number } = await Swal.fire({
            title: 'Edit Book Requesting Quantity.',
            input: 'number',
            inputLabel: 'Input request quantity.',
            inputPlaceholder: ''
          })
          
          if (number) {
            const qty = number;
            const updateBookRequest ={qty}

            axios.put("http://localhost:5000/book_request_from_shop/updateBookRequest/"+request_id,updateBookRequest).then(() =>{
    
            Swal.fire({  
                title: "Success!",
                text: "Book Request Updating Success!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                    if (okay) {
                        window.location.href = "/Bookshop_book_request";
                    }
            });
    
            
            }).catch((err)=>{
    
                Swal.fire({  
                title: "Error!",
                text: "Book Request Updating  Not Success",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"})
            })
          }
    }

    function padTo2Digits(num) {
            return num.toString().padStart(2, '0');
    }
      
    function formatDate(date) {
        return (
            [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
            ].join('-') +
            ' ' +
            [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
            ].join(':')
        ).toLocaleString('en-US', { hour: 'numeric', hour12: true });
    }

    
    function GetReasonForReject(id){  
        const req_id = "Shop"+id;
        axios.get("http://localhost:5000/book_reject_reason/oneReject/"+req_id)
        .then(res => {
            
            Swal.fire({  
                confirmButtonText: "OK",
                html :'<div><h5 class="text-uppercase text-decoration-underline fw-bold">Rejection Reason</h5><p class="text-left mt-5">Order id : '+id+' </p><p class="text-left"> This book order reject because of : <br/> '+(res.data[0].comment)+'</p><div>',
                type: "success"
            })
        })
        .catch(error => console.log(error));
    }

    const [AllSubject,setAllSubject] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/subject/allSubject")
        .then(res => setAllSubject(res.data))
        .catch(error => console.log(error));
    },[])

    function transfer_to_Store(id,language,subject,grade,qty){
        setShopTransfer(!shopTransfer);
        setTransferBookRId(id);
        setLanguageTransfer(language);
        setSubjectTransfer(subject);
        setGradeTransfer(grade);
        setQtyTransfer(qty);
    }

    function bookTransferStatusUpdate(id){
        axios.put("http://localhost:5000/book_request_from_shop/bookTransferToStore/"+id).then(() =>{}).catch((err)=>{})
    }

    function publishBook(){
        const formData = new FormData();
        formData.append("file" ,book_image);
        formData.append("upload_preset", "ml_default");

        axios.post("https://api.cloudinary.com/v1_1/nadun/image/upload",formData).then((response)=>{    
        const image =book_image.name; 

        const bookTransfer ={bookShopName ,subjectTransfer ,gradeTransfer ,languageTransfer ,qtyTransfer ,price ,discount ,description ,image}
        axios.post("http://localhost:5000/book_Store/addToStore/",bookTransfer).then(() =>{
            Swal.fire({  
                title: "Success!",
                text: "Books Transfer To Store!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                    if (okay) {
                        bookTransferStatusUpdate(TransferBookRId);
                        window.location.href = "/Bookshop_book_request";
                    }
            });
        
        }).catch((err)=>{

            Swal.fire({  
                title: "Error!",
                text: "Books Not Transfer To Store",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })
        })
    }

    return (
        <div>
        <div class="dashboard-main-wrapper">
            <Navbar/>
            <div class="dashboard-wrapper">
                <div class="container" style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i><small>BOOKSHOP</small><br/>&nbsp;&nbsp;&nbsp;&nbsp;Dashboard</h4>
                    <hr/>
                    <div className="text-end">
                        
                        <MDBBtn color="dark" size='sm' className='shadow-0 p-2 mr-2' style={{letterSpacing:'1px'}}  onClick={toggleShow} >Add Book Request</MDBBtn>
                        <MDBBtn color="dark" size='sm' className='shadow-0 p-2' style={{letterSpacing:'1px'}} onClick={back} >Back</MDBBtn>
                    </div>
                    <MDBRow className='mt-3' >
                    {allBookRequest.map((bookRequest,key) => (
                        <MDBCol sm='4'>
                            <MDBCard >
                            <MDBCardBody>
                                <h4>You requested <span class="text-danger">{bookRequest.qty} {bookRequest.subject}</span>  Books.</h4>
                                <h6 className='mt-3'>Requested Date : {formatDate(new Date(bookRequest.createdAt))}</h6>
                                <h6 >Medium : {bookRequest.language}</h6>
                                <h6 >Grade : {bookRequest.grade}</h6>
                                <h6 >Request Status : {bookRequest.status}</h6>
                                <div className='text-center'>
                                    <MDBBtn  style={{backgroundColor:'#3E5647', display:(bookRequest.status != "Pending")? "none" : "inline"}}  size='sm' className="shadow-0 mt-3"  onClick={()=>edit_book_qty(bookRequest._id)}>Requested QTY Edit <MDBIcon fas icon="long-arrow-alt-right" /></MDBBtn>
                                    <MDBBtn  style={{backgroundColor:'#16A085', display:(bookRequest.status == "Accept")? "inline" : "none"}}  size='sm' className="shadow-0 mt-3" onClick={()=>transfer_to_Store(bookRequest._id,bookRequest.language,bookRequest.subject,bookRequest.grade,bookRequest.qty)} >Request Accepted. Transfer To Store</MDBBtn>
                                    <MDBBtn  style={{backgroundColor:'#9C4848', display:((bookRequest.status == "Reject"))? "inline" : "none"}}  size='sm' className="shadow-0 mt-3"  onClick={()=>GetReasonForReject(bookRequest._id)}>Request Rejected. Reject Reason </MDBBtn>
                                    <MDBBtn  style={{backgroundColor:'#2980B9', display:((bookRequest.status == "Transfer"))? "inline" : "none"}}  size='sm' className="shadow-0 mt-3" >Books Are Transferred To Store</MDBBtn>
                                </div>

                            </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    ))}
                    </MDBRow>
                </div>
            </div>
            <MDBModal show={shopAdd} staticBackdrop setShow={setShopAdd} tabIndex='-1'>
                <MDBModalDialog size='xl'>
                <MDBModalContent>
                    <MDBModalHeader className="bg-dark">
                        <MDBModalTitle className="text-white" style={{fontWeight:'200'}}>Add New Book Request</MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody className="p-5">
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Your BookShop</h6>
                            <input type="text" class="bg-light form-control" disabled value={bookshop} onChange={(e) =>{
                                setBookShop(e.target.value);
                            }}/>
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Medium</h6>
                            <select  class="bg-light form-control" onChange={(e) =>{
                                setLanguage(e.target.value);
                            }} >
                                <option value="" >Select Medium</option>
                                <option value="Sinhala" >Sinhala</option>
                                <option value="Tamil" >Tamil</option>
                                <option value="English" >English</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Subject</h6>
                            <select  class="bg-light form-control" onChange={(e) =>{
                                setSubject(e.target.value);
                            }} >
                                <option value="" >Select Subject</option>
                                {AllSubject.map((subject,key) => (
                                    <option value={subject.subject_name} >{subject.subject_name}</option>
                                ))}
                            </select>
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Grade</h6>
                            <select class="bg-light form-control"  onChange={(e) =>{
                                setGrade(e.target.value);
                            }}>
                                <option value="" selected>Select Grade</option>
                                <option value="1" >Grade 1</option>
                                <option value="2" >Grade 2</option>
                                <option value="3" >Grade 3</option>
                                <option value="4" >Grade 4</option>
                                <option value="5" >Grade 5</option>
                                <option value="6" >Grade 6</option>
                                <option value="7" >Grade 7</option>
                                <option value="8" >Grade 8</option>
                                <option value="9" >Grade 9</option>
                                <option value="10" >Grade 10</option>
                                <option value="11" >Grade 11</option>
                                <option value="12" >Grade 12</option>
                                <option value="13" >Grade 13</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Quantity</h6>
                            
                            <input type="number" class="bg-light form-control" value={qty} onChange={(e) =>{
                                setQty(e.target.value);
                            }}/>
                        </div>
                    </MDBModalBody>
                    <MDBModalFooter>
                    <MDBBtn color='danger' onClick={toggleShow}>
                        Close
                    </MDBBtn>
                    <MDBBtn color='success' onClick={saveBookRequest}>Save</MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            <MDBModal show={shopTransfer} staticBackdrop setShow={setShopTransfer} tabIndex='-1'>
                <MDBModalDialog size='xl'>
                <MDBModalContent>
                    <MDBModalHeader className="bg-dark">
                        <MDBModalTitle className="text-white" style={{fontWeight:'200'}}>Book Order Transfer To Shop</MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={toggleTransferShow}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody className="p-5">
                        <div className="row">
                            <div className="col-1"></div>
                            <div className="col-5">
                                <div className=" p-3 rounded" style={{backgroundColor:'#EBEDEF'}}>
                                    <center>
                                        <h4 className='text-decoration-underline'>Order Details</h4>
                                    </center>
                                    <h6 className="mt-3">Subject : {subjectTransfer}</h6>
                                    <h6>Medium : {languageTransfer}</h6>
                                    <h6>Grade : {gradeTransfer}</h6>
                                    <h6>Qty : {qtyTransfer} Books</h6>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className=" p-3 rounded" style={{backgroundColor:'#EBEDEF'}}>
                                        <center>
                                            <h4 className='text-decoration-underline'>Other Details</h4>
                                        </center>
                                        <div class="mt-3">
                                            <span for="price" class="form-label text-dark">Price Per Book</span>     
                                            <input type="number" class="form-control" id="price" placeholder=""  style={{ backgroundColor:'transparent'}} onChange={(e) =>{
                                                setPricePerBook(e.target.value);
                                            }}/>
                                        </div>
                                        <div class="mt-3">
                                            <span for="discount" class="form-label text-dark">Discount Per Book</span>     
                                            <input type="number" class="form-control" id="discount" placeholder=""  style={{ backgroundColor:'transparent'}} onChange={(e) =>{
                                                setDiscountPerBook(e.target.value);
                                            }}/>
                                        </div>
                                        <div class="mb-3 mt-3">
                                            <span for="discount" class="form-label text-dark">Image</span>     
                                            <input type="file" onChange={(e) =>{
                                                                    setBookPhoto(e.target.files[0]);
                                                                }} class="form-control" id="customFile" />
                                        </div>
                                        <div class="mb-3 mt-3">
                                            <span for="discount" class="form-label text-dark">Description</span>     
                                            <textarea class="form-control"   style={{ backgroundColor:'transparent'}} rows="5" onChange={(e) =>{
                                                setDescription(e.target.value);
                                            }}></textarea>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </MDBModalBody>
                    <MDBModalFooter>
                    <MDBBtn color='danger' onClick={toggleTransferShow}>
                        Close
                    </MDBBtn>
                    <MDBBtn color='success' onClick={publishBook}>Publish</MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
          </div>
        </div>
      )
};


export default RequestBook;