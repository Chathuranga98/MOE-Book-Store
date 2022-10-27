
import React, { useState , useEffect } from 'react';
import { MDBTableBody, MDBIcon, MDBCardText, MDBModalDialog ,MDBModalBody ,MDBModalFooter,MDBModalContent,MDBModalHeader,MDBModalTitle, MDBBtn, MDBCol, MDBRow , MDBCardTitle, MDBCardFooter, MDBTable, MDBTableHead} from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import Navbar from "./adminNav";

function PrivateUser() {
    function back(){
        window.location.href = "Admin_Dashboard";
    }

    const [allPrivateUser,setAllPrivateUser] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/private_user/allPrivateUser")
        .then(res => setAllPrivateUser(res.data))
        .catch(error => console.log(error));
    },[])

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();

    today = yyyy + '/' + mm + '/' + dd;

    function deleteUser(id , status,email){
        Swal.fire({
            title: 'Do you want to '+status+' this user account?' ,
            icon: 'warning',
            confirmButtonText: 'Yes',
            showDenyButton: true,
            denyButtonText: 'No',
           
        }).then((result) => {
            if (result['isConfirmed']){

                const userID = id;
                const sendData ={userID , status};
         

                axios.put("http://localhost:5000/private_user/ActivateAndDeactivate",sendData).then(() =>{
    
                    Swal.fire({  
                        title: "Success!",
                        text: "Account "+status+"ed.",
                        icon: 'success',
                        confirmButtonText: "OK",
                        type: "success"}).then(okay => {
                            if (okay) {

                                if(status == 'Deactivate'){
                                    emailjs.send('service_7u69awb', 'template_z9a04da',{
                                        date:today,
                                        toEmail: email,
                                    }, 't8ufW1jefQLrC52MS')
                                    .then((result) => {
                                        console.log(result.text);
                                    }, (error) => {
                                        console.log(error.text);
                                    });
                                }else{
                                    emailjs.send('service_7u69awb', 'template_695b18s',{
                                        date:today,
                                        toEmail: email,
                                    }, 't8ufW1jefQLrC52MS')
                                    .then((result) => {
                                        console.log(result.text);
                                    }, (error) => {
                                        console.log(error.text);
                                    });
                                }

                                axios.get("http://localhost:5000/private_user/allPrivateUser")
                                .then(res => setAllPrivateUser(res.data))
                                .catch(error => console.log(error));
                            }
                    });
            
                    
                    }).catch((err)=>{
            
                        Swal.fire({  
                        title: "Error!",
                        text: "System Error!. Account Not "+status+"ed.",
                        icon: 'error',
                        confirmButtonText: "OK",
                        type: "success"})
                    })
            }else{
                Swal.fire({  
                    title: "Error!",
                    text: "Action Canceled.",
                    icon: 'warning',
                    confirmButtonText: "OK",
                    type: "success"
                })
            }
        })

      


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
                        <MDBTable className='mt-3'>
                            <MDBTableHead>
                                <tr className="bg-dark">
                                    <th scope='col' className="text-white " style={{fontSize:'15px'}}>Full Name</th>
                                    <th scope='col' className="text-white " style={{fontSize:'15px'}}>Address</th>
                                    <th scope='col' className="text-white " style={{fontSize:'15px'}}>Telephone Number</th>
                                    <th scope='col' className="text-white " style={{fontSize:'15px'}}>NIC</th>
                                    <th scope='col' className="text-white " style={{fontSize:'15px'}}>Email</th>
                                    <th scope='col' className="text-white " style={{fontSize:'15px'}}>Action</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                            {allPrivateUser.map((PrivateUser,key) => (
                                <tr className="bg-light">
                                    <td className='text-capitalize'>{PrivateUser.name}</td>
                                    <td className='text-capitalize'>{PrivateUser.address}</td>
                                    <td>{PrivateUser.telephoneNumber}</td>
                                    <td>{PrivateUser.nic}</td>
                                    <td>{PrivateUser.email}</td>
                                    <td>
                                        <button className="btn btn-outline-danger btn-sm" style={{display:(PrivateUser.status == "Deactivate")? 'none' : 'inline'}} onClick={()=>deleteUser(PrivateUser._id , 'Deactivate',PrivateUser.email)}><MDBIcon size='1x' fas icon="trash" /></button>
                                        <button className="btn btn-outline-success btn-sm" style={{display:(PrivateUser.status != "Deactivate")? 'none' : 'inline'}} onClick={()=>deleteUser(PrivateUser._id , 'Activate',PrivateUser.email)}><MDBIcon fas icon="check" /></button>
                                    </td>
                                </tr>
                            ))}
                            </MDBTableBody>
                        </MDBTable>
                    </div>
                </div>
            </div>
        </div>
      )
};


export default PrivateUser;