
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBModal, MDBCardBody, MDBIcon, MDBCardText, MDBModalDialog ,MDBModalBody ,MDBModalFooter,MDBModalContent,MDBModalHeader,MDBModalTitle, MDBBtn, MDBCol, MDBRow , MDBCardTitle, MDBCardFooter} from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Navbar from "./adminNav";

function BookRequest() {
    
    const [allBookRequest,setAllBookRequest] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/book_request_from_deo/allBookRequest")
        .then(res => setAllBookRequest(res.data))
        .catch(error => console.log(error));
    },[])

    const [AllSubject,setAllSubject] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/subject/allSubject")
        .then(res => setAllSubject(res.data))
        .catch(error => console.log(error));
    },[])

    const [allSchool,setAllSchools] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/school/allSchools")
        .then(res => setAllSchools(res.data))
        .catch(error => console.log(error));
    },[])

    const [allBookShop,setAllBookShop] = useState([])
   useEffect(() => {
       axios.get("http://localhost:5000/book_shop/allBookShop")
       .then(res => setAllBookShop(res.data))
       .catch(error => console.log(error));
   },[])

    const [allDivisionalOffice,setAllDivisionalOffice] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/divisionalOffice/allDivisionalOffice")
        .then(res => setAllDivisionalOffice(res.data))
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

    function getFromShopName(shopEmail){
        const count_of_shop = allBookShop.length;
        for (let i = 0; i < count_of_shop; i++){
            if(allBookShop[i].email == shopEmail){
                return allBookShop[i].name;
            }
        }
    }

    function getFromDEOName(fromDEO){
        const count_of_deo = allDivisionalOffice.length;
        for (let i = 0; i < count_of_deo; i++){
            if(allDivisionalOffice[i].username == fromDEO){
                return allDivisionalOffice[i].office;
            }
        }
    }


    const [allRequestToOtherSchool,setAllRequestToSchools] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/book_request_from_school/allBookRequest")
        .then(res => setAllRequestToSchools(res.data))
        .catch(error => console.log(error));
    },[])

    
    const [allRequestFromShops,setAllRequestFromShops] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/book_request_from_shop/allBookRequest")
        .then(res => setAllRequestFromShops(res.data))
        .catch(error => console.log(error));
    },[])

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

    function back(){
        window.location.href = "Admin_Dashboard";
    }

    function navigateToDeo(){
        window.location.href = "#deo";
    }

    function navigateToSchool(){
        window.location.href = "#school";
    }

    function navigateToShop(){
        window.location.href = "#shop";
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
                const request_id = "Shop"+r_id;
                const addRejectReason ={request_id , comment};
                axios.post("http://localhost:5000/book_reject_reason/addRejectReason",addRejectReason).then(() =>{
    
                    Swal.fire({  
                        title: "Success!",
                        text: "Book Reject Reason Saving Success!",
                        icon: 'success',
                        confirmButtonText: "OK",
                        type: "success"}).then(okay => {
                            if (okay) {
                                axios.get("http://localhost:5000/book_request_from_shop/allBookRequest")
                                .then(res => setAllRequestFromShops(res.data))
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
        
        axios.put("http://localhost:5000/book_request_from_shop/rejectBookRequest/"+request_id).then(() =>{

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

    async function ask_wanted_qty(request_id,current_stock){
        const { value: number } = await Swal.fire({
            title: 'Enter Sending Quantity Of Stocks.',
            input: 'number',
            inputLabel: 'Enter New Book Stock. Current available book stock is ' + current_stock+' books',
            inputPlaceholder: '',
            showDenyButton: true
          })
          
          if (number) {
                const new_Stock = number;

                if(current_stock<new_Stock ){

                    Swal.fire({  
                        title: "Error!",
                        text: "There are enough stock. Current Stock is "+current_stock+" books",
                        icon: 'error',
                        confirmButtonText: "OK",
                        type: "success"
                    });

                }else{

                    axios.put("http://localhost:5000/book_request_from_shop/acceptBookRequestWithCustomize/"+request_id+"/"+new_Stock).then(() =>{
    
                        Swal.fire({  
                            title: "Success!",
                            text: "Book Request is Accepting Success!",
                            icon: 'success',
                            confirmButtonText: "OK",
                            type: "success"}).then(okay => {
                                if (okay) {
                                    axios.get("http://localhost:5000/book_request_from_shop/allBookRequest")
                                    .then(res => setAllRequestFromShops(res.data))
                                    .catch(error => console.log(error));
                                }
                        });
            
                
                    }).catch((err)=>{
        
                        Swal.fire({  
                            title: "Error!",
                            text: "Book Request is Accepting  Not Success",
                            icon: 'error',
                            confirmButtonText: "OK",
                            type: "success"
                        })
                    })
    
                }
        }
    }

    function accept_book_qty(request_id,current_stock,stock_id,request_qty) {
        Swal.fire({
            title: 'Do you want to change sending book quantity?' ,
            icon :'warning',
            confirmButtonText: 'Yes',
            showDenyButton: true,
            denyButtonText: 'No',
           
          }).then((result) => {
            if (result['isConfirmed']){
                ask_wanted_qty(request_id,current_stock); 
            }else{
                
                    axios.put("http://localhost:5000/book_request_from_shop/acceptBookRequest/"+request_id+"/"+current_stock+"/"+stock_id+"/"+request_qty).then(() =>{
    
                    Swal.fire({  
                        title: "Success!",
                        text: "Book Request is Accepting Success!",
                        icon: 'success',
                        confirmButtonText: "OK",
                        type: "success"}).then(okay => {
                            if (okay) {
                                window.location.href = "/Admin_BookRequest";
                            }
                    });
        
            
                }).catch((err)=>{
    
                    Swal.fire({  
                        title: "Error!",
                        text: "Book Request is Accepting  Not Success",
                        icon: 'error',
                        confirmButtonText: "OK",
                        type: "success"
                    })
                })
              
            }
        })
    }

    function getCurrentStock(subject,grade,medium){
        const count_of_subject = AllSubject.length;
        for (let i = 0; i < count_of_subject; i++){
            if((AllSubject[i].subject_name == subject) && (AllSubject[i].grade == grade) && (AllSubject[i].medium == medium)){
               return AllSubject[i].qty;
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
                <div class="container" style={{paddingTop:'3%',paddingLeft:'2%' , paddingBottom:'10%', width:'98%'}}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i><small>ADMIN</small><br/>&nbsp;&nbsp;&nbsp;&nbsp;Dashboard</h4>
                    <hr/>
                    <div className="text-end">
                        <MDBBtn color="dark" size='sm' className='shadow-0 p-2 mr-2' style={{letterSpacing:'1px'}}  onClick={navigateToDeo}>To D.E.O</MDBBtn>
                        <MDBBtn color="dark" size='sm' className='shadow-0 p-2 mr-2' style={{letterSpacing:'1px'}} onClick={navigateToSchool}>TO School</MDBBtn>
                        <MDBBtn color="dark" size='sm' className='shadow-0 p-2 mr-2' style={{letterSpacing:'1px'}} onClick={navigateToShop}>From Book Shops</MDBBtn>
                        <MDBBtn color="dark" size='sm' className='shadow-0 p-2' style={{letterSpacing:'1px'}} onClick={back} >Back</MDBBtn>
                    </div>
                    <h3 id="deo" className="mt-5 text-decoration-underline">School Send Books Request To DEO Offices</h3>
                    <MDBRow className='mt-3 mb-3' >
                    {allBookRequest.map((bookRequest,key) => (
                        <MDBCol sm='4' className="mt-3" >
                            <MDBCard className="h-100" >
                            <MDBCardBody className="rounded" style={{backgroundColor:'#CCD1D1'}}>
                                <h4 className="text-capitalize">{getFromSchoolName(bookRequest.school)} requested <span class="text-danger">{bookRequest.qty} {bookRequest.subject}</span> Books for <span class="text-success">grade {bookRequest.grade}</span> students. </h4>
                                <h6 className='mt-3'>From : {getFromDEOName(bookRequest.edo)}</h6>
                                <h6 >Request Date : {formatDate(new Date(bookRequest.createdAt))}</h6>
                                <h6 >Request Status : {bookRequest.status}ed</h6>
                            </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    ))}
                    </MDBRow>
                    <hr/>
                    <h3 id="school" className="text-decoration-underline" style={{marginTop:'10%'}}>School Send Books Request To Other Schools</h3>
                    <MDBRow className='mt-3 ' >
                    {allRequestToOtherSchool.map((bookRequestSchool,key) => (
                        <MDBCol sm='4' className="mt-3">
                            <MDBCard className="h-100">
                            <MDBCardBody className="rounded" style={{backgroundColor:'#D0D3D4'}}>
                                <h4 className="text-capitalize">{getFromSchoolName(bookRequestSchool.school)} requested <span style={{color:'#CB4335'}}>{bookRequestSchool.qty} {bookRequestSchool.subject}</span> Books for <span style={{color:'#138D75'}}>grade {bookRequestSchool.grade}</span> students. </h4>
                                <h6 className='mt-3'>From : {getFromSchoolName(bookRequestSchool.fromSchool)}</h6>
                                <h6 >Request Date : {formatDate(new Date(bookRequestSchool.createdAt))}</h6>
                                <h6 >Request Status : {bookRequestSchool.status}ed</h6>
                            </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    ))}
                    </MDBRow>
                    <hr/>
                    <h3 id="shop" className="text-decoration-underline" style={{marginTop:'10%'}}>Book Request From Shops</h3>
                    <MDBRow className='mt-3 ' >
                    {allRequestFromShops.map((bookRequestShop,key) => (
                        <MDBCol sm='4' className="mt-3">
                            <MDBCard className="h-100">
                            <MDBCardBody className="rounded" style={{backgroundColor:'#D0D3D4'}}>
                                <h4 className="text-capitalize">{getFromShopName(bookRequestShop.bookshop)} requested <span style={{color:'#CB4335'}}>{bookRequestShop.qty} {bookRequestShop.subject}</span> Books.</h4>
                                <h6 className='mt-3'>Medium : {bookRequestShop.language}</h6>
                                <h6 >Email : {bookRequestShop.bookshop}</h6>
                                <h6 >Grade : {bookRequestShop.grade}</h6>
                                <h6 >Request Date : {formatDate(new Date(bookRequestShop.createdAt))}</h6>
                                <h6 >Request Status : {bookRequestShop.status}ed</h6>
                                <MDBBtn  style={{backgroundColor:'#3E5647' ,  display:((bookRequestShop.status == "Accept") || (bookRequestShop.status == "Reject"))? "none" : "inline"}}   size='sm' className="shadow-0 mt-3 mr-2" href='#' onClick={()=>accept_book_qty(bookRequestShop._id,getCurrentStock(bookRequestShop.subject,bookRequestShop.grade,bookRequestShop.language),getCurrentStockID(bookRequestShop.subject,bookRequestShop.grade,bookRequestShop.language),bookRequestShop.qty)}>Accept <MDBIcon fas icon="long-arrow-alt-right" /></MDBBtn>
                                <MDBBtn  style={{backgroundColor:'#783535' ,  display:((bookRequestShop.status == "Accept") || (bookRequestShop.status == "Reject"))? "none" : "inline"}}  size='sm' className="shadow-0 mt-3" href='#' onClick={()=>reject_book_qty(bookRequestShop._id)}>Reject <MDBIcon fas icon="long-arrow-alt-right" /></MDBBtn>
                                <div className='text-center'>
                                    <MDBBtn  style={{backgroundColor:'#3E5647', display:((bookRequestShop.status == "Accept") || (bookRequestShop.status == "Reject"))? "inline" : "none"}}  disabled size='sm' className="shadow-0 mt-3 text-center" href='#' >You {bookRequestShop.status}ed.</MDBBtn>&nbsp;&nbsp;&nbsp;&nbsp;
                                    {/* <MDBBtn  style={{backgroundColor:'#9C4848', display:((bookRequestShop.status == "Reject"))? "inline" : "none"}}  size='sm' className="shadow-0 mt-3" href='#'  onClick={()=>GetReasonForReject(bookRequestShop._id)}>Reject Reason </MDBBtn> */}
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


export default BookRequest;