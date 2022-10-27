
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBModal, MDBCardBody, MDBIcon, MDBCardText, MDBModalDialog ,MDBModalBody ,MDBModalFooter,MDBModalContent,MDBModalHeader,MDBModalTitle, MDBBtn, MDBCol, MDBRow , MDBCardTitle, MDBCardImage} from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';
import axios from 'axios';
import {PatternFormat} from 'react-number-format';
import Navbar from "./adminNav";
import passwordValidator from 'password-validator';
var schema = new passwordValidator();

function BookShopGivePermission() {
    
     
   const [allBookShop,setAllBookShop] = useState([])
   useEffect(() => {
       axios.get("http://localhost:5000/book_shop/allBookShopPermissionAsked")
       .then(res => setAllBookShop(res.data))
       .catch(error => console.log(error));
   },[])
    
    function back(){
        window.location.href = "Admin_bookshop";
    }

    function actionPermission(id , action){
        Swal.fire({
            title: 'Give permission for access system.' ,
            icon: 'warning',
            confirmButtonText: 'Yes',
            showDenyButton: true,
            denyButtonText: 'No',
           
        }).then((result) => {
            if (result['isConfirmed']){

                    const updateDataList = {id,action}
                    axios.put("http://localhost:5000/book_shop/updateBookShopPermission",updateDataList).then(() =>{
    
                    Swal.fire({  
                        title: "Success!",
                        text: "Shop "+action+"ed",
                        icon: 'success',
                        confirmButtonText: "OK",
                        type: "success"}).then(okay => {
                            if (okay) {
                                axios.get("http://localhost:5000/book_shop/allBookShopPermissionAsked")
                                .then(res => setAllBookShop(res.data))
                                .catch(error => console.log(error));
                            }
                    });
            
                    
                    }).catch((err)=>{
            
                        Swal.fire({  
                        title: "Error!",
                        text: "System Error!. Shop Not "+action+"ed.",
                        icon: 'error',
                        confirmButtonText: "OK",
                        type: "success"})
                    })
            }else{
                Swal.fire({  
                    title: "Warning!",
                    text: "Subject Deleting Canceled",
                    icon: 'warning',
                    confirmButtonText: "OK",
                    type: "success"
                })
            }
        });
    }

 
    return (
        <div>
        <div class="dashboard-main-wrapper">
            <Navbar/>
            <div class="dashboard-wrapper">
                <div class="container" style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i><small>ADMIN</small><br/>&nbsp;&nbsp;&nbsp;&nbsp;Dashboard</h4>
                    <hr/>
                    <div className="text-end">
                        <MDBBtn color="dark" size='sm' className='shadow-0 p-2' style={{letterSpacing:'1px'}} onClick={back} >Back</MDBBtn>
                    </div>
                    <MDBRow className='mt-3' >
                    {allBookShop.map((bookshop,key) => (
                        <MDBCol sm='4'>
                            <MDBCard >
                            <center>
                                <MDBCardImage  src={'https://res.cloudinary.com/nadun/image/upload/v1654197415/'+bookshop.profile} style={{height:'150px'}} className="mt-4"  position='center' alt='...' />
                            </center>
                            <MDBCardBody>
                                <MDBCardTitle className='text-dark fw-bold text-uppercase text-center' style={{letterSpacing:'1px'}}>{bookshop.name}</MDBCardTitle>
                                <MDBCardText className="mt-3 ml-3" style={{lineHeight:'125%'}}>
                                    <MDBIcon fas icon="phone" /> &nbsp;&nbsp;Telephone : {bookshop.telephoneNumber}<br/>
                                    <MDBIcon fas icon="map-marker" /> &nbsp;&nbsp;&nbsp;Address : {bookshop.address}<br/>
                                    <MDBIcon fas icon="envelope" /> &nbsp;&nbsp;Email : {bookshop.email}<br/>
                                </MDBCardText>
                                <div>
                                    <MDBBtn  style={{backgroundColor:'#3E5647'}}   size='sm' className="shadow-0 mt-3 text-center" onClick={()=>actionPermission(bookshop._id , 'Accept')}>Accept</MDBBtn>&nbsp;&nbsp;
                                    <MDBBtn  style={{backgroundColor:'#783535'}}   size='sm' className="shadow-0 mt-3 text-center" onClick={()=>actionPermission(bookshop._id , 'Reject')}>Reject</MDBBtn>&nbsp;&nbsp;&nbsp;&nbsp;
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


export default BookShopGivePermission;