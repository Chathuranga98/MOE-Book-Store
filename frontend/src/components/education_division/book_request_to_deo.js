
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBModal, MDBCardBody, MDBIcon, MDBCardText, MDBModalDialog ,MDBModalBody ,MDBModalFooter,MDBModalContent,MDBModalHeader,MDBModalTitle, MDBBtn, MDBCol, MDBRow , MDBCardTitle, MDBCardFooter} from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';
import axios from 'axios';
import {PatternFormat} from 'react-number-format';
import Navbar from "./edoNav";
import Cookies from 'js-cookie';

function RequestBookFromDEO() {
    const UserName =  Cookies.get('username');
    function back(){
        window.location.href = "DivisionalOffice_dashboard";
    }

    const [allBookRequest,setAllBookRequest] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/book_request_from_deo/allBookRequest/"+UserName)
        .then(res => setAllBookRequest(res.data))
        .catch(error => console.log(error));
    },[])

   async function book_reject_reason(request_id){
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
            const addRejectReason ={request_id , comment};
            axios.post("http://localhost:5000/book_reject_reason/addRejectReason",addRejectReason).then(() =>{

                Swal.fire({  
                    title: "Success!",
                    text: "Book Reject Reason Saving Success!",
                    icon: 'success',
                    confirmButtonText: "OK",
                    type: "success"}).then(okay => {
                        if (okay) {
                            window.location.href = "/BookRequestToDeo";
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
        
        axios.put("http://localhost:5000/book_request_from_deo/rejectBookRequest/"+request_id).then(() =>{

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
            
            axios.put("http://localhost:5000/book_request_from_deo/acceptBookRequest/"+request_id).then(() =>{
    
            Swal.fire({  
                title: "Success!",
                text: "Book Request is Accepting Success!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                    if (okay) {
                        window.location.href = "/BookRequestToDeo";
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

    return (
        <div>
        <div class="dashboard-main-wrapper">
            <Navbar/>
            <div class="dashboard-wrapper">
                <div class="container" style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i><small>DEO</small><br/>&nbsp;&nbsp;&nbsp;&nbsp;Dashboard</h4>
                    <hr/>
                    <div className="text-end">
                        <MDBBtn color="dark" size='sm' className='shadow-0 p-2' style={{letterSpacing:'1px'}} onClick={back} >Back</MDBBtn>
                    </div>
                    <MDBRow className='mt-3' >
                    {allBookRequest.map((bookRequest,key) => (
                        <MDBCol sm='4'  style={{height:'100vh'}}>
                            <MDBCard >
                            <MDBCardBody>
                                <h4>You requested books <span class="text-danger">{bookRequest.qty} {bookRequest.subject}</span> Books for <span class="text-success">grade {bookRequest.grade}</span> students. </h4>
                                <h6 className='mt-3'>Request Date : {formatDate(new Date(bookRequest.createdAt))}</h6>
                                <h6 >Request Status : {bookRequest.status}</h6>
                                
                                <MDBBtn  style={{backgroundColor:'#3E5647' ,  display:((bookRequest.status == "Accept") || (bookRequest.status == "Reject"))? "none" : "inline"}}   size='sm' className="shadow-0 mt-3 mr-2" href='#' onClick={()=>accept_book_qty(bookRequest._id)}>Accept <MDBIcon fas icon="long-arrow-alt-right" /></MDBBtn>
                                <MDBBtn  style={{backgroundColor:'#783535' ,  display:((bookRequest.status == "Accept") || (bookRequest.status == "Reject"))? "none" : "inline"}}  size='sm' className="shadow-0 mt-3" href='#' onClick={()=>reject_book_qty(bookRequest._id)}>Reject <MDBIcon fas icon="long-arrow-alt-right" /></MDBBtn>
                                <div className='text-center'>
                                    <MDBBtn  style={{backgroundColor:'#3E5647', display:((bookRequest.status == "Accept") || (bookRequest.status == "Reject"))? "inline" : "none"}}  disabled size='sm' className="shadow-0 mt-3 text-center" href='#' >You {bookRequest.status}ed.</MDBBtn>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <MDBBtn  style={{backgroundColor:'#9C4848', display:((bookRequest.status == "Reject"))? "inline" : "none"}}  size='sm' className="shadow-0 mt-3" href='#'  onClick={()=>GetReasonForReject(bookRequest._id)}>Reject Reason </MDBBtn>

                                </div>

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


export default RequestBookFromDEO;