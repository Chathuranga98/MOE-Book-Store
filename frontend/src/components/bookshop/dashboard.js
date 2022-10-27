
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBModal, MDBCardBody, MDBIcon, MDBCardText, MDBModalDialog ,MDBModalBody ,MDBModalFooter,MDBModalContent,MDBModalHeader,MDBModalTitle, MDBBtn, MDBCol, MDBRow , MDBCardTitle, MDBCardImage} from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';
import axios from 'axios';
import {PatternFormat} from 'react-number-format';
import Navbar from "./shopNav";
import Cookies from 'js-cookie';
import passwordValidator from 'password-validator';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';

var schema = new passwordValidator();

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September', 'October', 'November', 'December'];

function BookShop() {
    const schoolUserName =  Cookies.get('username');
    
    function Bookshop_books(){
        window.location.href = "Bookshop_books";
    } 

    function Book_selling(){
        window.location.href = "Book_selling";
    }    
    
    function Bookshop_book_request(){
        window.location.href = "Bookshop_book_request";
    } 

    const [bookshopEdit, setBookShopsEdit] = useState(false);
    const toggleShowEdit = () => setBookShopsEdit(!bookshopEdit);

    const [shopInfo,setOneBookShopInformation] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/book_shop/oneSchoolByUsername/"+schoolUserName)
        .then(res => setOneBookShopInformation(res.data))
        .catch(error => console.log(error));
    },[])
    
    const [buyingHistory,setBuyingHistory] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/book_buy/bookSellingHistory/"+schoolUserName)
        .then(res => setBuyingHistory(res.data))
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

        return [year, month].join('-');
    }

    function monthly_book_qty(){
        let JanuaryCount = 0;
        let februaryCount = 0;
        let marchCount = 0;
        let aprilCount = 0;
        let mayCount = 0;
        let juneCount = 0;
        let julyCount = 0;
        let augustCount = 0;
        let septemberCount = 0;
        let octoberCount = 0;
        let novemberCount = 0;
        let decemberCount = 0;

        const count_of_cart_item = buyingHistory.length;
        for (let i = 0; i < count_of_cart_item; i++){
            if(formatDate(buyingHistory[i].createdAt) == "2022-1"){
                JanuaryCount = JanuaryCount+1;
            }else if(formatDate(buyingHistory[i].createdAt) == "2022-2"){
                februaryCount = februaryCount+1;
            }else if(formatDate(buyingHistory[i].createdAt) == "2022-3"){
                marchCount = marchCount+1;
            }else if(formatDate(buyingHistory[i].createdAt) == "2022-4"){
                aprilCount = aprilCount+1;
            }else if(formatDate(buyingHistory[i].createdAt) == "2022-5"){
                mayCount = mayCount+1;
            }else if(formatDate(buyingHistory[i].createdAt) == "2022-6"){
                juneCount = juneCount+1;
            }else if(formatDate(buyingHistory[i].createdAt) == "2022-7"){
                julyCount = julyCount+1;
            }else if(formatDate(buyingHistory[i].createdAt) == "2022-8"){
                augustCount = augustCount+1;
            }else if(formatDate(buyingHistory[i].createdAt) == "2022-9"){
                septemberCount = septemberCount+1;
            }else if(formatDate(buyingHistory[i].createdAt) == "2022-10"){
                octoberCount = octoberCount+1;
            }else if(formatDate(buyingHistory[i].createdAt) == "2022-11"){
                novemberCount = novemberCount+1;
            }else if(formatDate(buyingHistory[i].createdAt) == "2022-12"){
                decemberCount = decemberCount+1;
            }
        }
        return [JanuaryCount,februaryCount,marchCount,aprilCount,mayCount,juneCount,julyCount,augustCount,septemberCount,octoberCount,novemberCount,decemberCount];
    }
    
    const data = {
        labels,
        datasets: [
          {
            fill: true,
            label: 'Book Selling Qty',
            data: monthly_book_qty(),
            borderColor: 'rgb(17, 122, 101)',
            backgroundColor: 'rgba(17, 122, 101, 0.5)',
          }
        ],
    };

    function deleteProfile(id){
        Swal.fire({
            title: 'Do you want to delete this profile?' ,
            icon :'warning',
            confirmButtonText: 'Yes',
            showDenyButton: true,
            denyButtonText: 'No',
           
          }).then((result) => {
            if (result['isConfirmed']){

            }else{
                Swal.fire({  
                    title: "Error!",
                    text: "Profile Deleting Not Success.",
                    icon: 'error',
                    confirmButtonText: "OK",
                    type: "success"
                })
            }
        });
    }
   
    const [telephoneEdit, setTelephoneNumberEdit] = useState("");
    const [emailEdit, setEmailEdit] = useState("");
    const [addressEdit, setAddressEdit] = useState("");
    const [nameEdit, setBookShopNameEdit] = useState("");
    const [shopEditId, setShopEditId] = useState("");
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' ,
          },
          title: {
            display: true,
            text: 'How many books do you have sell in '+currentYear+'?',
            font: {
                size: 22
            }
          },
        },
        scales: {
            x: {
                grid: {
                  display: false
                }
              },
              y: {
                grid: {
                  display: false
                },
                ticks: {
                    beginAtZero: true,
                 }
              }
        }
      };

    function editBookShop(_id, name, address, telephoneNumber, email){
        setShopEditId(_id);
        setBookShopNameEdit(name);
        setAddressEdit(address);
        setEmailEdit(email);
        setTelephoneNumberEdit(telephoneNumber);
        setBookShopsEdit(!bookshopEdit);
    }
    
    function clear(){
        setTelephoneNumberEdit("");
        setEmailEdit("");
        setAddressEdit("");
        setShopEditId("");
        setBookShopNameEdit("");
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
                                axios.get("http://localhost:5000/book_shop/oneSchoolByUsername/"+schoolUserName)
                                .then(res => setOneBookShopInformation(res.data))
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
    return (
        <div>
        <div class="dashboard-main-wrapper">
            <Navbar/>
            <div class="dashboard-wrapper">
                <div class="container" style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i><small>BookShop</small><br/>&nbsp;&nbsp;&nbsp;&nbsp;Dashboard</h4>
                    <hr/>
                    <MDBRow >
                        <MDBCol sm='8'>
                            <MDBCard className="shadow-0 p-3 h-100" style={{backgroundColor:'#EAECEE'}}>
                                <Line options={options} data={data} />
                            </MDBCard>
                        </MDBCol>
                        <MDBCol sm='4'>
                            {shopInfo.map((shop,key) => (
                                <MDBCard className="shadow-0 h-100" style={{backgroundColor:'#D5D8DC'}}>
                                <center>
                                    <MDBCardImage className="text-center mt-4" src={'https://res.cloudinary.com/nadun/image/upload/v1654197415/'+shop.profile} style={{width:'150px'}} position='top' alt='...' />
                                </center>
                                <MDBCardBody>
                                    <h3 className="text-center text-capitalize">{shop.name}</h3>
                                    <h6 className='mt-2'><MDBIcon fas icon="caret-right" /> Address : {shop.address}</h6>
                                    <h6><MDBIcon fas icon="caret-right" /> Telephone : {shop.telephoneNumber}</h6>
                                    <h6><MDBIcon fas icon="caret-right" /> Email : {shop.email}</h6>
                                    <div className="text-center mt-3">
                                        <button className="btn btn-outline-dark btn-sm shadow-0" onClick={()=>editBookShop(shop._id, shop.name, shop.address, shop.telephoneNumber, shop.email)}><MDBIcon fas icon="pen-fancy" /></button>&nbsp;
                                        <button className="btn btn-outline-dark btn-sm shadow-0"><MDBIcon far icon="address-card" /></button>&nbsp;
                                        <button className="btn btn-outline-dark btn-sm shadow-0" onClick={()=>deleteProfile(shop._id)} ><MDBIcon fas icon="trash-alt"/></button>
                                    </div>
                                </MDBCardBody>
                                </MDBCard>
                            ))}
                        </MDBCol>
                        
                    </MDBRow>
                    <MDBRow className='mt-4' >
                        <MDBCol sm='4'>
                            <MDBCard onClick={Bookshop_books} >
                            <MDBCardBody>
                                <MDBCardTitle className='text-dark fw-bold text-uppercase' style={{letterSpacing:'1px'}}>BookStore</MDBCardTitle>
                                <MDBCardText className="mt-3" style={{lineHeight:'125%'}}>
                                    Bookshop can manage book store. (Add Books, Update Availability status)
                                </MDBCardText>
                                <MDBBtn  style={{backgroundColor:'#3E5647'}} className="shadow-0" href='#'>GO <MDBIcon fas icon="long-arrow-alt-right" /></MDBBtn>
                            </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol sm='4'>
                            <MDBCard onClick={Bookshop_book_request}>
                            <MDBCardBody>
                                <MDBCardTitle className='text-dark fw-bold text-uppercase' style={{letterSpacing:'1px'}}>Book Requests</MDBCardTitle>
                                <MDBCardText className="mt-3" style={{lineHeight:'125%'}}>
                                    Bookshop owner able to request books from ministry of education.
                                </MDBCardText>
                                <MDBBtn  style={{backgroundColor:'#3E4856'}} className="shadow-0" href='#'>GO <MDBIcon fas icon="long-arrow-alt-right" /></MDBBtn>
                            </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol sm='4'>
                            <MDBCard onClick={Book_selling}>
                                <MDBCardBody>
                                    <MDBCardTitle className='text-dark fw-bold text-uppercase' style={{letterSpacing:'1px'}}>Book Selling</MDBCardTitle>
                                    <MDBCardText className="mt-3" style={{lineHeight:'125%'}}>
                                        Bookshop can view books selling history and delivery information.
                                    </MDBCardText>
                                    <MDBBtn  style={{backgroundColor:'#56473E'}} className="shadow-0" href='#'>GO <MDBIcon fas icon="long-arrow-alt-right" /></MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
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
                            <MDBBtn color='success' onClick={editShop}>Edit</MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                        </MDBModalDialog>
                    </MDBModal>
                </div>
            </div>
          </div>
        </div>
      )
};


export default BookShop;