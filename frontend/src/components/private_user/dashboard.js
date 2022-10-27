
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBModal, MDBCardBody, MDBIcon, MDBCardText, MDBModalDialog ,MDBModalBody ,MDBModalFooter,MDBModalContent,MDBModalHeader,MDBModalTitle, MDBBtn, MDBCol, MDBRow , MDBCardTitle, MDBCardFooter, MDBFooter} from 'mdb-react-ui-kit';
import axios from 'axios';
import Navbar from "./privateNav";
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {PatternFormat} from 'react-number-format';
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

  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' ,
      },
      title: {
        display: true,
        text: 'How many do you have buy with a year?',
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

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September', 'October', 'November', 'December'];


function BookShop() {
    
    const UserName =  Cookies.get('username');
    const [telephoneNumber, setTelephoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, messagePassword] = useState("");
    const [ConfirmPassword, setCPassword] = useState("");
    const [name, setFullName] = useState("");
    const [address, setHomeAddress] = useState("");
    const [nic, setNIC] = useState("");
    const [id, setId] = useState("");
    
    const [userEdit, setUserEdit] = useState(false);
    const toggleShowEdit = () => setUserEdit(!userEdit);

    const [buyingHistory,setBuyingHistory] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/book_buy/bookForOneUser/"+UserName)
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
            label: 'Book Buying Qty',
            data: monthly_book_qty(),
            borderColor: 'rgb(17, 122, 101)',
            backgroundColor: 'rgba(17, 122, 101, 0.5)',
          }
        ],
    };
      
    function Bookshop_books(){
        window.location.href = "Private_user_books";
    }    
    
    function Private_books_buying_history(){
        window.location.href = "Private_books_buying_history";
    } 

    function Announcement(){
        window.location.href = "Private_notice";
    }

    const [userProfile,setUserProfile] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/private_user/onePrivateUser/"+UserName)
        .then(res => setUserProfile(res.data))
        .catch(error => console.log(error));
    },[])
    
    function deleteProfile(id , status){
        Swal.fire({
            title: 'Do you want to delete this profile?' ,
            icon :'warning',
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
                                axios.get("http://localhost:5000/private_user/onePrivateUser/"+UserName)
                                .then(res => setUserProfile(res.data))
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
                    text: "Profile Deleting Not Success.",
                    icon: 'error',
                    confirmButtonText: "OK",
                    type: "success"
                })
            }
        });
    }
   
  
    
    function editProfile(_id,name,address,telephoneNumber,nic,email,password){

        setTelephoneNumber(telephoneNumber);
        setEmail(email);
        setHomeAddress(address);
        setFullName(name);
        setNIC(nic);
        setId(_id);
        messagePassword(password);
        setUserEdit(!userEdit);
    }


    function edit(){
        Swal.fire({
            title: 'Do you want to update profile?' ,
            icon: 'warning',
            confirmButtonText: 'Yes',
            showDenyButton: true,
            denyButtonText: 'No',
           
        }).then((result) => {
            if (result['isConfirmed']){
                    const updateProfile ={id,name,address,telephoneNumber,password}
                    axios.put("http://localhost:5000/private_user/updatePrivateUser",updateProfile).then(() =>{
    
                    Swal.fire({  
                        title: "Success!",
                        text: "Account Updating Success",
                        icon: 'success',
                        confirmButtonText: "OK",
                        type: "success"}).then(okay => {
                            if (okay) {
                                axios.get("http://localhost:5000/private_user/onePrivateUser/"+UserName)
                                .then(res => setUserProfile(res.data))
                                .catch(error => console.log(error));
                                setUserEdit(!userEdit);
                            }
                    });
            
                    
                    }).catch((err)=>{
            
                        Swal.fire({  
                        title: "Error!",
                        text: "System Error!. Your Account Not Updated.",
                        icon: 'error',
                        confirmButtonText: "OK",
                        type: "success"})
                    })
            }else{
                Swal.fire({  
                    title: "Warning!",
                    text: "Educational Divisional Office Updating Canceled",
                    icon: 'warning',
                    confirmButtonText: "OK",
                    type: "success"
                })
            }
        });
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
        setCPassword(event);
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
        messagePassword(event);
    }
    return (
        <div>
        <div class="dashboard-main-wrapper">
            <Navbar/>
            <div class="dashboard-wrapper">
                <div class="container" style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i><small>Private User</small><br/>&nbsp;&nbsp;&nbsp;&nbsp;Dashboard</h4>
                    <hr/>
                    <MDBRow >
                        <MDBCol sm='8' >
                            <MDBCard className="shadow-0 p-3 h-100" style={{backgroundColor:'#EAECEE'}}>
                                <Line options={options} data={data} />
                            </MDBCard>
                        </MDBCol>
                        <MDBCol sm='4'>
                            {userProfile.map((user,key) => (
                                <MDBCard className="shadow-0 h-100" style={{backgroundColor:'#D5D8DC'}}>
                                <MDBCardBody>
                                    <div className="p-2 rounded" style={{backgroundColor:'#B2BABB'}}>
                                        <h4 className="text-center text-uppercase pt-3"  style={{color:'#17202A',letterSpacing:'4px'}}>Welcome To</h4>
                                        <h2 className="text-uppercase text-center pb-2"  style={{color:'#17202A',lineHeight:'20px'}}>User Dashboard</h2>
                                    </div>
                                    <hr/>
                                    <h3 className="text-center text-capitalize mt-4">{user.name}</h3>
                                    <h6 className='mt-2'><MDBIcon fas icon="caret-right" /> Address : {user.address}</h6>
                                    <h6><MDBIcon fas icon="caret-right" /> Telephone : {user.telephoneNumber}</h6>
                                    <h6><MDBIcon fas icon="caret-right" /> Email : {user.email}</h6>
                                    <h6><MDBIcon fas icon="caret-right" /> NIC : {user.nic}</h6>
                                    <div className="text-center mt-4">
                                        <button className="btn btn-outline-dark btn-sm shadow-0" onClick={()=>editProfile(user._id,user.name,user.address,user.telephoneNumber,user.nic,user.email,user.password)}><MDBIcon fas icon="pen-fancy" /></button>&nbsp;
                                        <button className="btn btn-outline-dark btn-sm shadow-0"><MDBIcon far icon="address-card" /></button>&nbsp;
                                        <button className="btn btn-outline-dark btn-sm shadow-0" onClick={()=>deleteProfile(user._id , 'Deactivate' )} ><MDBIcon fas icon="trash-alt" /></button>
                                    </div>
                                </MDBCardBody>
                                </MDBCard>
                            ))}
                        </MDBCol>
                        
                    </MDBRow>
                    <MDBRow className="mt-4">
                        <MDBCol sm='4'>
                            <MDBCard onClick={Bookshop_books} >
                            <MDBCardBody>
                                <MDBCardTitle className='text-dark fw-bold text-uppercase' style={{letterSpacing:'1px'}}>BookStore</MDBCardTitle>
                                <MDBCardText className="mt-3" style={{lineHeight:'125%'}}>
                                    Private user  can view and buy books from available bookshops.
                                </MDBCardText>
                                <MDBBtn  style={{backgroundColor:'#3E5647'}} className="shadow-0" href='#'>GO <MDBIcon fas icon="long-arrow-alt-right" /></MDBBtn>
                            </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol sm='4'>
                            <MDBCard onClick={Private_books_buying_history}>
                            <MDBCardBody>
                                <MDBCardTitle className='text-dark fw-bold text-uppercase' style={{letterSpacing:'1px'}}>Book Buying</MDBCardTitle>
                                <MDBCardText className="mt-3" style={{lineHeight:'125%'}}>
                                    Private user able to view book buying history and expenses.
                                </MDBCardText>
                                <MDBBtn  style={{backgroundColor:'#3E4856'}} className="shadow-0" href='#'>GO <MDBIcon fas icon="long-arrow-alt-right" /></MDBBtn>
                            </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol sm='4'>
                            <MDBCard  onClick={Announcement}>
                                <MDBCardBody>
                                    <MDBCardTitle className='text-dark fw-bold text-uppercase' style={{letterSpacing:'1px'}}>Announcements</MDBCardTitle>
                                    <MDBCardText className="mt-3" style={{lineHeight:'125%'}}>
                                        Private user able to read and download announcements.
                                    </MDBCardText>
                                    <MDBBtn  style={{backgroundColor:'#3E5647'}} className="shadow-0" href='#'>GO <MDBIcon fas icon="long-arrow-alt-right" /></MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    <MDBModal show={userEdit} staticBackdrop setShow={setUserEdit} tabIndex='-1'>
                <MDBModalDialog size='xl'>
                <MDBModalContent>
                    <MDBModalHeader className="bg-dark">
                        <MDBModalTitle className="text-white" style={{fontWeight:'200'}}>Edit Your Profile</MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={toggleShowEdit}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody className="p-5">
                            <div class="mb-3 mt-3">
                                <label for="fullName" class="form-label">Full Name</label>
                                <input type="text" class="form-control" value={name} id="fullName" placeholder="" onChange={(e) =>{
                                    setFullName(e.target.value);
                                }}/>
                            </div>
                            <div class="mb-3 mt-3">
                                <label for="homeAddress" class="form-label">Home Address</label>
                                <input type="text" class="form-control" id="homeAddress" placeholder="" value={address} onChange={(e) =>{
                                    setHomeAddress(e.target.value);
                                }}/>
                            </div>
                            <div class="mb-3 mt-3">
                                <label for="telNumber" class="form-label">Telephone Number</label>
                                <PatternFormat format="############" allowEmptyFormatting  class="form-control" value={telephoneNumber}  onChange={(e) =>{
                                    setTelephoneNumber(e.target.value);
                                }} />
                            </div>
                            <div class="mb-3 mt-3">
                                <label for="nic" class="form-label">NIC</label>
                                <input type="text" class="form-control" id="nic" placeholder="" disabled style={{backgroundColor:'#FDD1D1' , color:'#C23434'}}   title="This text field can not edit." value={nic}  onChange={(e) =>{
                                    setNIC(e.target.value);
                                }}/>
                               
                            </div>
                            <div class="mb-3 mt-3">
                                <label for="email" class="form-label">Email address</label>
                                <input type="email" class="form-control" id="email" placeholder="" disabled  style={{backgroundColor:'#FDD1D1' , color:'#C23434'}}   title="This text field can not edit." value={email}  onChange={(e) =>{
                                    setEmail(e.target.value);
                                }}/>
                               
                            </div>
                            <div class="mb-3">
                                <label for="pass" class="form-label ">Password</label>
                                <input type="password" class="form-control" id="pass" placeholder="" value={password} onChange={(e) =>{
                                    setFunPassword(e.target.value);
                                }}/>
                                <span style={{fontSize:'12px', margin:'0px', padding:'0px' , color: passColor}}   >
                                        {msgPass}
                                </span>
                            </div>
                            <div class="mb-3">
                                <label for="cpass" class="form-label ">Confirm Password</label>
                                <input type="password" class="form-control" id="cpass" placeholder=""  onChange={(e) =>{
                                    setFunCPassword(e.target.value);
                                }}/>
                                <span style={{fontSize:'12px', margin:'0px', padding:'0px', color: cPassColor}}   >
                                    {messageCfpassword}
                                </span>
                            </div>
                    </MDBModalBody>
                    <MDBModalFooter>
                    <MDBBtn color='danger' onClick={toggleShowEdit}>
                        Close
                    </MDBBtn>
                    <MDBBtn color='success' onClick={edit}>Edit</MDBBtn>
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