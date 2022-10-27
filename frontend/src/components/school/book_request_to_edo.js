
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBModal, MDBCardBody, MDBIcon, MDBCardText, MDBModalDialog ,MDBModalBody ,MDBModalFooter,MDBModalContent,MDBModalHeader,MDBModalTitle, MDBBtn, MDBCol, MDBRow , MDBCardTitle, MDBCardFooter} from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';
import axios from 'axios';
import {PatternFormat} from 'react-number-format';
import Navbar from "./schoolNav";
import Cookies from 'js-cookie';

function RequestBookFromDEO() {
    const schoolUserName =  Cookies.get('username');

    const [dateState, setDateState] = useState(new Date());
    useEffect(() => {
        setInterval(() => setDateState(new Date()), 1000);
    },[]);

    function back(){
        window.location.href = "SchoolsDashboard";
    }

    const [deoAdd, setDeoAdd] = useState(false);
    const toggleShow = () => setDeoAdd(!deoAdd);

    const [language, setLanguage] = useState("");
    const [subject, setSubject] = useState("");
    const [grade, setGrade] = useState("");
    const [qty, setQty] = useState("");
    const [availableQty, setAvailableQty] = useState(0);
    const [school, setSchool] = useState(schoolUserName);

    function clear(){
        setLanguage("");
        setSubject("");
        setGrade("");
        setQty("");
        setAvailableQty(0);
    }
    
   const [allBookRequest,setAllBookRequest] = useState([])
   useEffect(() => {
       axios.get("http://localhost:5000/book_request_from_deo/allBookRequest/"+schoolUserName)
       .then(res => setAllBookRequest(res.data))
       .catch(error => console.log(error));
   },[])

    function saveBookRequest() {
        const edo = Cookies.get('deo');
        const school = schoolUserName;
        const stock_id = getCurrentStockID(subject,grade,language);
        const addBookRequest ={language, subject, grade, qty,availableQty ,school,edo,stock_id}
 
        if(parseInt(qty) > parseInt(availableQty)){
            
            Swal.fire({  
                title: "Error!",
                text: "Your requested book quantity is grater than stock. Stock is only " + availableQty+" books",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        }else{
            axios.post("http://localhost:5000/book_request_from_deo/addBookRequest",addBookRequest).then(() =>{

            Swal.fire({  
                title: "Success!",
                text: "Book Request Sending Success!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                    if (okay) {
                        axios.get("http://localhost:5000/book_request_from_deo/allBookRequest/"+schoolUserName)
                        .then(res => setAllBookRequest(res.data))
                        .catch(error => console.log(error));
                        
                        setDeoAdd(!deoAdd);
                        clear();
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
    }


    function available_book_qty(subject,grade,language){
        const count_of_subject = AllSubject.length;
        for (let i = 0; i < count_of_subject; i++){
            if((AllSubject[i].subject_name == subject) && (AllSubject[i].grade == grade) && (AllSubject[i].medium == language)){
               return AllSubject[i].qty;
            }
        } 
    }

    async function edit_book_qty(request_id,subject,grade,language) {

        const availableQty = available_book_qty(subject,grade,language);
        const stock_id = getCurrentStockID(subject,grade,language);

        const { value: number } = await Swal.fire({
            title: 'Edit Book Requesting Quantity.',
            input: 'number',
            inputLabel: 'Input request quantity. Current book stock is '+availableQty+' books.',
            inputPlaceholder: '',
            showDenyButton:true
          })
          
          if (number) {

            if(parseInt(number) > parseInt(availableQty)){
            
                Swal.fire({  
                    title: "Error!",
                    text: "Your requested book quantity is grater than stock. Stock is only " + availableQty+" books",
                    icon: 'error',
                    confirmButtonText: "OK",
                    type: "success"
                })
            }else{
                const qty = number;
                const updateBookRequest ={qty,availableQty,stock_id}

                axios.put("http://localhost:5000/book_request_from_deo/updateBookRequest/"+request_id,updateBookRequest).then(() =>{
        
                Swal.fire({  
                    title: "Success!",
                    text: "Book Request Updating Success!",
                    icon: 'success',
                    confirmButtonText: "OK",
                    type: "success"}).then(okay => {
                        if (okay) {
                            axios.get("http://localhost:5000/book_request_from_deo/allBookRequest/"+schoolUserName)
                            .then(res => setAllBookRequest(res.data))
                            .catch(error => console.log(error));
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
        axios.get("http://localhost:5000/book_reject_reason/oneReject/"+id)
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

    
    function setFunGrade(e){
        const grade = e;
        setGrade(grade);
        const count_of_subject = AllSubject.length;
        for (let i = 0; i < count_of_subject; i++){
            if((AllSubject[i].subject_name == subject) && (AllSubject[i].grade == grade) && (AllSubject[i].medium == language)){
               setAvailableQty(AllSubject[i].qty);
            }
        }     
    }

    

    function getCurrentStockID(subject,grade,medium){
        const count_of_subject = AllSubject.length;
        for (let i = 0; i < count_of_subject; i++){
            if((AllSubject[i].subject_name == subject) && (AllSubject[i].grade == grade) && (AllSubject[i].medium == medium)){
               return AllSubject[i]._id;
            }
        }
    }

    return (
        <div>
        <div class="dashboard-main-wrapper">
            <Navbar/>
            <div class="dashboard-wrapper">
                <div class="container" style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i><small>School</small><br/>&nbsp;&nbsp;&nbsp;&nbsp;Dashboard</h4>
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
                                <h4>You requested <span class="text-danger">{bookRequest.qty} {bookRequest.subject}</span> Books for <span class="text-success">grade {bookRequest.grade}</span> students. </h4>
                                <h6 className='mt-3'>Medium : {bookRequest.language}</h6>
                                <h6 >Requested Date : {formatDate(new Date(bookRequest.createdAt))}</h6>
                                <h6 >Request Status : {bookRequest.status}</h6>
                                <div className='text-center'>
                                    <MDBBtn  style={{backgroundColor:'#3E5647', display:((bookRequest.status == "Accept") || (bookRequest.status == "Reject"))? "none" : "inline"}}  size='sm' className="shadow-0 mt-3" href='#' onClick={()=>edit_book_qty(bookRequest._id,bookRequest.subject,bookRequest.grade,bookRequest.language)}>Edit <MDBIcon fas icon="long-arrow-alt-right" /></MDBBtn>&nbsp;&nbsp;&nbsp;
                                    <MDBBtn  style={{backgroundColor:'#3E5647', display:((bookRequest.status == "Accept") || (bookRequest.status == "Reject"))? "inline" : "none"}}  size='sm' className="shadow-0 mt-3" href='#' disabled>D.E.O Checked </MDBBtn>&nbsp;&nbsp;&nbsp;
                                    <MDBBtn  style={{backgroundColor:'#9C4848', display:((bookRequest.status == "Reject"))? "inline" : "none"}}  size='sm' className="shadow-0 mt-3" href='#'  onClick={()=>GetReasonForReject(bookRequest._id)}>Reject Reason </MDBBtn>
                                </div>

                            </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    ))}
                    </MDBRow>
                </div>
            </div>
            <MDBModal show={deoAdd} staticBackdrop setShow={setDeoAdd} tabIndex='-1'>
                <MDBModalDialog size='xl'>
                <MDBModalContent>
                    <MDBModalHeader className="bg-dark">
                        <MDBModalTitle className="text-white" style={{fontWeight:'200'}}>Add New Book Request</MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody className="p-5">
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Your School</h6>
                            <input type="text" class="bg-light form-control" disabled value={school} onChange={(e) =>{
                                setSchool(e.target.value);
                            }}/>
                        </div>
                        <div class="mb-3">
                            <h6 className="fw-normal text-dark">Medium</h6>
                            <select  class="bg-light form-control" value={language} onChange={(e) =>{
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
                            <select  class="bg-light form-control" value={subject} onChange={(e) =>{
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
                            <select class="bg-light form-control" value={grade}  onChange={(e) =>{
                                setFunGrade(e.target.value);
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
                            
                            <input type="number" class="bg-light form-control"  pattern="" value={qty} onChange={(e) =>{
                                setQty(e.target.value);
                            }}/>
                            <small className='text-danger'>Available Qty is {availableQty}</small>
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
          </div>
        </div>
      )
};


export default RequestBookFromDEO;