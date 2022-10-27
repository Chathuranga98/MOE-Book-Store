
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBModal, MDBCardBody, MDBIcon, MDBCardText, MDBModalDialog ,MDBModalBody ,MDBModalFooter,MDBModalContent,MDBModalHeader,MDBModalTitle, MDBBtn, MDBCol, MDBRow , MDBCardTitle, MDBCardFooter} from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';
import axios from 'axios';
import {PatternFormat} from 'react-number-format';
import Navbar from "./schoolNav";
import Cookies from 'js-cookie';

function RequestBookFromSchool() {
    const schoolUserName =  Cookies.get('username');

    function RequestBookFromSchool(){
        window.location.href = "RequestBookFromSchool";
    }

    const [allSchool,setAllSchools] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/school/allSchools")
        .then(res => setAllSchools(res.data))
        .catch(error => console.log(error));
    },[])
    
   const [allBookRequest,setAllBookRequest] = useState([])
   useEffect(() => {
       axios.get("http://localhost:5000/book_request_from_school/otherSchoolBookRequest/"+schoolUserName)
       .then(res => setAllBookRequest(res.data))
       .catch(error => console.log(error));
   },[])


   function getFromSchoolName(fromSchool){
       const count_of_schools = allSchool.length;
       for (let i = 0; i < count_of_schools; i++){
           if(allSchool[i].username == fromSchool){
             return allSchool[i].name;
           }
       }
   }

    const [AllSubject,setAllSubject] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/subject/allSubject")
        .then(res => setAllSubject(res.data))
        .catch(error => console.log(error));
    },[])

    
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
    }

    
    async function book_reject_reason(r_id){
        const { value: text } = await Swal.fire({
            input: 'textarea',
            title: 'What is the rejection reason?',
            inputPlaceholder: '',
            inputAttributes: {
              'aria-label': 'Type rejection reason here'
            },
            showCancelButton: true
          })
          
          if (text) {
                const comment = text;
                const request_id = "school"+r_id;
                const addRejectReason ={request_id , comment};
                axios.post("http://localhost:5000/book_reject_reason/addRejectReason",addRejectReason).then(() =>{
    
                    Swal.fire({  
                        title: "Success!",
                        text: "Book Reject Reason Saving Success!",
                        icon: 'success',
                        confirmButtonText: "OK",
                        type: "success"}).then(okay => {
                            if (okay) {
                                axios.get("http://localhost:5000/book_request_from_school/otherSchoolBookRequest/"+schoolUserName)
                                .then(res => setAllBookRequest(res.data))
                                .catch(error => console.log(error));
                            }
                    });
           
                
                }).catch((err)=>{
           
                    Swal.fire({  
                        title: "Error!",
                        text: "Book Reject Reason Saving Not Success",
                        icon: 'error',
                        confirmButtonText: "OK",
                        type: "success"
                    });
                })
          }
    }
    
   function reject_book_qty(request_id) {
    Swal.fire({
        title: 'Do you want to reject this request?' ,
        icon :'warning',
        confirmButtonText: 'Yes',
        showDenyButton: true,
        denyButtonText: 'No',
       
      }).then((result) => {
        if (result['isConfirmed']){
        
        axios.put("http://localhost:5000/book_request_from_school/rejectBookRequest/"+request_id).then(() =>{

        Swal.fire({  
            title: "Success!",
            text: "Book Request is Rejecting Success!",
            icon: 'success',
            confirmButtonText: "OK",
            type: "success"}).then(okay => {
                if (okay) {
                    book_reject_reason(request_id);
                }
        });

        
        }).catch((err)=>{

            Swal.fire({  
            title: "Error!",
            text: "Book Request is Rejecting  Not Success",
            icon: 'error',
            confirmButtonText: "OK",
            type: "success"})
        })
        }else{
            Swal.fire({  
                title: "Error!",
                text: "Rejecting is Canceled.",
                icon: 'warning',
                confirmButtonText: "OK",
                type: "success"})
        }
    })
   }

    function accept_book_qty(request_id) {
        Swal.fire({
            title: 'Do you want to accept this request?' ,
            icon :'warning',
            confirmButtonText: 'Yes',
            showDenyButton: true,
            denyButtonText: 'No',
           
          }).then((result) => {
            if (result['isConfirmed']){
            
            axios.put("http://localhost:5000/book_request_from_school/acceptBookRequest/"+request_id).then(() =>{
    
            Swal.fire({  
                title: "Success!",
                text: "Book Request is Accepting Success!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                    if (okay) {
                        window.location.href = "/Received_book_request";
                    }
            });
    
            
            }).catch((err)=>{
    
                Swal.fire({  
                title: "Error!",
                text: "Book Request is Accepting  Not Success",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"})
            })
            }else{
                Swal.fire({  
                    title: "Error!",
                    text: "Accepting is Canceled.",
                    icon: 'warning',
                    confirmButtonText: "OK",
                    type: "success"})
            }
        })
    }

    function GetReasonForReject(req_id){  
        const id = "school"+req_id;
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

    return (
        <div>
        <div class="dashboard-main-wrapper">
            <Navbar/>
            <div class="dashboard-wrapper">
                <div class="container" style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i><small>School</small><br/>&nbsp;&nbsp;&nbsp;&nbsp;Dashboard</h4>
                    <hr/>
                    <div className="text-end">
                        <MDBBtn color="dark" size='sm' className='shadow-0 p-2 mr-2' style={{letterSpacing:'1px'}} onClick={RequestBookFromSchool}  >You Requested Books</MDBBtn>
                    </div>
                    <MDBRow className='mt-3' >
                    {allBookRequest.map((bookRequest,key) => (
                        <MDBCol sm='4' >
                            <MDBCard >
                            <MDBCardBody>
                                <h4>Books are requested by you from <span class="text-danger">{getFromSchoolName(bookRequest.fromSchool)}</span></h4>
                                <h6 className='mt-3'>Requested Date : {formatDate(bookRequest.createdAt)}</h6>
                                <h6 >Request Status : {bookRequest.status}</h6>
                                <h6 >Subjects : {bookRequest.subject}</h6>
                                <h6 >Grade : {bookRequest.grade}</h6>
                                <h6 >Language : {bookRequest.language}</h6>
                                <h6 >Request Qty : {bookRequest.qty}</h6>
                                <MDBBtn  style={{backgroundColor:'#3E5647' ,  display:((bookRequest.status == "Accept") || (bookRequest.status == "Reject"))? "none" : "inline"}}   size='sm' className="shadow-0 mt-3 mr-2" href='#' onClick={()=>accept_book_qty(bookRequest._id)}>Accept <MDBIcon fas icon="long-arrow-alt-right" /></MDBBtn>
                                <MDBBtn  style={{backgroundColor:'#783535' ,  display:((bookRequest.status == "Accept") || (bookRequest.status == "Reject"))? "none" : "inline"}}  size='sm' className="shadow-0 mt-3" href='#' onClick={()=>reject_book_qty(bookRequest._id)}>Reject <MDBIcon fas icon="long-arrow-alt-right" /></MDBBtn>
                                <center>
                                    <MDBBtn  style={{backgroundColor:'#3E5647', display:((bookRequest.status == "Accept") || (bookRequest.status == "Reject"))? "inline" : "none"}}  disabled size='sm' className="shadow-0 mt-3 text-center" href='#' >You {bookRequest.status}ed.</MDBBtn>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <MDBBtn  style={{backgroundColor:'#9C4848', display:((bookRequest.status == "Reject"))? "inline" : "none"}}  size='sm' className="shadow-0 mt-3" href='#'  onClick={()=>GetReasonForReject(bookRequest._id)}>Reject Reason </MDBBtn>
                                </center>
                            </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    ))}
                    </MDBRow>
                </div>
            </div>
            
          </div>
        </div>
      )
};


export default RequestBookFromSchool;