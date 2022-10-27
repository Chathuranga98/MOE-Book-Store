
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBModal, MDBCardBody, MDBIcon, MDBCardText, MDBCardImage ,MDBModalBody ,MDBModalFooter,MDBModalContent,MDBModalHeader,MDBModalTitle, MDBBtn, MDBCol, MDBRow , MDBCardTitle, MDBCardFooter} from 'mdb-react-ui-kit';
import axios from 'axios';
import Navbar from "./privateNav";
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

function Books() {
    
    const UserName =  Cookies.get('username');
    const [allBookStore,setAllBookStore] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/book_Store/allBooks")
        .then(res => setAllBookStore(res.data))
        .catch(error => console.log(error));
    },[])

    function back(){
        window.location.href = "Private_user_dashboard";
    }

    async function buyBook(bookId,shop,current_qty){
        const { value: number } = await Swal.fire({
            input: 'number',
            title: 'Enter Buying Book Qty?',
            inputPlaceholder: '',
            inputAttributes: {
              'aria-label': 'Enter book quantity which is you want to buy.'
            },
            showCancelButton: true
          })
          
        if (number) {

            if(number <= current_qty) {
                const Qty = number;
                const addBookBuying ={bookId,Qty,UserName,shop,current_qty}

                axios.post("http://localhost:5000/book_buy/addBookBuy",addBookBuying).then(() =>{
        
                Swal.fire({  
                    title: "Success!",
                    text: "Book Bought!",
                    icon: 'success',
                    confirmButtonText: "OK",
                    type: "success"}).then(okay => {
                        if (okay) {
                            axios.get("http://localhost:5000/book_Store/allBooks")
                            .then(res => setAllBookStore(res.data))
                            .catch(error => console.log(error));
                        }
                });
        
                
                }).catch((err)=>{
        
                    Swal.fire({  
                    title: "Error!",
                    text: "Book Not Bought",
                    icon: 'error',
                    confirmButtonText: "OK",
                    type: "success"})
                })
          
        }else{
            Swal.fire({  
                title: "Error!",
                text: "You cannot buy. Current Book Stock is only "+current_qty+" books. But you requested "+number+" books.",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        }
      }
    }
    
    const [allBookShop,setAllBookShop] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/book_shop/allBookShop")
        .then(res => setAllBookShop(res.data))
        .catch(error => console.log(error));
    },[])

    const [AllSubject,setAllSubject] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/subject/allSubject")
        .then(res => setAllSubject(res.data))
        .catch(error => console.log(error));
    },[])

    const [searchGrade, setSearchGrade] = useState("");
    const [searchMedium, setSearchMedium] = useState("");
    const [subject, setSubject] = useState("");

    function getShopName(username){
        const count_of_shop = allBookShop.length;
        for (let i = 0; i < count_of_shop; i++){
            if(allBookShop[i].email == username){
                return allBookShop[i].name;
            }
        }
    }

    function search(){

        if((searchGrade != "") && (searchMedium != "") && (subject != "")){
            Swal.fire({  
                title: "Warning!",
                text: "Please enter subject , medium or grade.",
                icon: 'warning',
                confirmButtonText: "OK",
                type: "success"
            })
        }else if((searchMedium != "") && (searchGrade == "") && (subject == "") ){

            axios.get("http://localhost:5000/book_Store/filterMedium/"+searchMedium)
            .then(res => setAllBookStore(res.data))
            .catch(error => console.log(error));
        }else if((searchMedium == "") && (searchGrade == "") && (subject != "") ){
            axios.get("http://localhost:5000/book_Store/filterSubject/"+subject)
            .then(res => setAllBookStore(res.data))
            .catch(error => console.log(error));
        }else if((searchMedium == "") && (searchGrade != "") && (subject == "") ){
            axios.get("http://localhost:5000/book_Store/filterGrade/"+searchGrade)
            .then(res => setAllBookStore(res.data))
            .catch(error => console.log(error));
        }else if((searchMedium == "") && (searchGrade != "") && (subject != "") ){
            axios.get("http://localhost:5000/book_Store/filterGradeSubject/"+searchGrade+"/"+subject)
            .then(res => setAllBookStore(res.data))
            .catch(error => console.log(error));
        }else if((searchMedium != "") && (searchGrade != "") && (subject == "") ){
            axios.get("http://localhost:5000/book_Store/filterGradeMedium/"+searchGrade+"/"+searchMedium)
            .then(res => setAllBookStore(res.data))
            .catch(error => console.log(error));
        }else if((searchMedium != "") && (searchGrade == "") && (subject != "") ){
            axios.get("http://localhost:5000/book_Store/filterSubjectMedium/"+subject+"/"+searchMedium)
            .then(res => setAllBookStore(res.data))
            .catch(error => console.log(error));
        }else if((searchMedium != "") && (searchGrade != "") && (subject != "") ){
            axios.get("http://localhost:5000/book_Store/filterSubjectMediumGrade/"+subject+"/"+searchGrade+"/"+searchMedium)
            .then(res => setAllBookStore(res.data))
            .catch(error => console.log(error));
        }else{
            Swal.fire({  
                title: "Warning!",
                text: "Please enter subject , medium or grade.",
                icon: 'warning',
                confirmButtonText: "OK",
                type: "success"
            })
        }
    }


    
    function close(){
        axios.get("http://localhost:5000/book_Store/allBooks")
        .then(res => setAllBookStore(res.data))
        .catch(error => console.log(error));

       setSearchGrade("");
       setSearchMedium("");
       setSubject("");
    }

    return (
        <div>
        <div class="dashboard-main-wrapper">
            <Navbar/>
            <div class="dashboard-wrapper">
                <div class="container" style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i><small>Private User</small><br/>&nbsp;&nbsp;&nbsp;&nbsp;Dashboard</h4>
                    <hr/>
                    <div className="text-end">
                        <MDBBtn color="dark" size='sm' className='shadow-0 p-2' style={{letterSpacing:'1px'}} onClick={back} >Back</MDBBtn>
                    </div>
                    <div className="border  p-3 mb-3 mt-3" style={{backgroundColor:'#ECECEC'}}>
                        <h6>Filter Books : </h6>
                        <hr/>
                        <MDBRow >
                                
                                <MDBCol sm='3'>
                                    <h6 className="fw-normal text-dark">Medium</h6>
                                    <select value={searchMedium}  class="bg-light form-select" onChange={(e) =>{
                                        setSearchMedium(e.target.value);
                                    }}>
                                        <option value="" >Select Medium</option>
                                        <option value="Sinhala" >Sinhala</option>
                                        <option value="Tamil" >Tamil</option>
                                        <option value="English" >English</option>
                                    </select>
                                </MDBCol>
                                <MDBCol sm='3'>
                                    <h6 className="fw-normal text-dark">Grade</h6>
                                    <select class="bg-light form-select"  onChange={(e) =>{
                                        setSearchGrade(e.target.value);
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
                                </MDBCol>
                               
                                <MDBCol sm='3'>
                                    <div class="mb-3">
                                        <h6 className="fw-normal text-dark">Subjects</h6>
                                        <select  class="bg-light form-select" onChange={(e) =>{
                                            setSubject(e.target.value);
                                        }} >
                                            <option value="">Select Subject</option>
                                            {AllSubject.map((subject,key) => (
                                                <option value={subject.subject_name} >{subject.subject_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </MDBCol>
                                <MDBCol sm='3'>
                                    <h6 className="fw-normal text-dark">&nbsp;</h6>
                                    <button class="btn btn-dark rounded-0 btn-sm mt-1 shadow-0" onClick={search}><MDBIcon fas icon="search" /></button>
                                    <button class="btn btn-danger rounded-0 btn-sm mt-1 shadow-0" onClick={close}><MDBIcon fas icon="times" /></button>
                                </MDBCol>
                            </MDBRow>
                    </div>
                    <MDBRow className='mt-3' >
                    {allBookStore.map((store,key) => (
                        <MDBCol sm='4' className="h-100">
                            <MDBCard >
                            <MDBCardBody>
                                <center>
                                    <MDBCardImage  src={'https://res.cloudinary.com/nadun/image/upload/v1654197415/'+store.image} style={{width:'150px'}}  position='top' alt='...' />
                                </center>
                                <MDBCardTitle className='text-dark text-center mt-3 fw-bold text-uppercase' style={{letterSpacing:'1px'}}>Grade {store.grade} Student's {store.medium} medium {store.subject} book</MDBCardTitle>
                                <MDBCardText className="mt-3" style={{lineHeight:'125%'}}>
                                    <MDBIcon fas icon="angle-right" /> Price : RS.{store.price}<br/>
                                    <MDBIcon fas icon="angle-right" /> Discount : RS.{store.discount}<br/>
                                    <MDBIcon fas icon="angle-right" /> Quantity : {store.current_qty}<br/>
                                    <MDBIcon fas icon="angle-right" /> Shop : <a href={"/Private_OneShop?shop="+store.shop} className="text-muted">{getShopName(store.shop)}</a><br/>
                                </MDBCardText>
                                <center>
                                    <MDBBtn style={{backgroundColor:'#523E56', display:(store.current_qty > 0)? 'inline' : 'none'}} className="shadow-0 btn-sm" onClick={()=>buyBook(store._id,store.shop,store.current_qty)} href='#'>BUY</MDBBtn>
                                    <MDBBtn style={{backgroundColor:'#9C4545', display:(store.current_qty == 0)? 'inline' : 'none'}} className="shadow-0 btn-sm" href='#'>Not Available In the Stocks</MDBBtn>
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


export default Books;
