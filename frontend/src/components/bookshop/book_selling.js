
import React, { useState , useEffect } from 'react';
import { MDBTableBody, MDBIcon, MDBCardText, MDBModalDialog ,MDBModalBody ,MDBModalFooter,MDBModalContent,MDBModalHeader,MDBModalTitle, MDBBtn, MDBCol, MDBRow , MDBCardTitle, MDBCardFooter, MDBTable, MDBTableHead} from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from "./shopNav";

function BookSelling() {

    const UserName =  Cookies.get('username');
    function back(){
        window.location.href = "Bookshop_dashboard";
    }

    const [buyingHistory,setBuyingHistory] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/book_buy/bookSellingHistory/"+UserName)
        .then(res => setBuyingHistory(res.data))
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

    
    function getOneItemName(id){
        const count_of_books = allBookStore.length;
        for (let i = 0; i < count_of_books; i++){
            if(allBookStore[i]._id == id){
                return allBookStore[i].grade+" "+allBookStore[i].medium+" "+allBookStore[i].subject+" books.";
            }
        }
    }

    const [allBookStore,setAllBookStore] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/book_Store/allBooks")
        .then(res => setAllBookStore(res.data))
        .catch(error => console.log(error));
    },[])


    function getBookPrice(id){
        const count_of_books = allBookStore.length;
        for (let i = 0; i < count_of_books; i++){
            if(allBookStore[i]._id == id){
                return allBookStore[i].price;
            }
        }
    }

    const [allPrivateUser,setAllPrivateUser] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/private_user/allPrivateUser")
        .then(res => setAllPrivateUser(res.data))
        .catch(error => console.log(error));
    },[])


    function fun_private_user(id){
        const count_of_user = allPrivateUser.length;
        for (let i = 0; i < count_of_user; i++){
            if(allPrivateUser[i].email == id){
                return allPrivateUser[i].name +" - "+allPrivateUser[i].telephoneNumber;
            }
        }
    }

    function calTotal(total){
        return total;
    }

    function reject_book_qty(id){
        
    }

    return (
        <div>
            <div class="dashboard-main-wrapper">
                <Navbar/>
                <div class="dashboard-wrapper">
                    <div class="container" style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                        <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i><small>Bookshop</small><br/>&nbsp;&nbsp;&nbsp;&nbsp;Dashboard</h4>
                        <hr/>
                        <div className="text-end">
                            <MDBBtn color="dark" size='sm' className='shadow-0 p-2' style={{letterSpacing:'1px'}} onClick={back} >Back</MDBBtn>
                        </div>
                        <MDBTable className='mt-3'>
                            <MDBTableHead>
                                    <tr className="bg-dark">
                                        <th  className="text-white " style={{fontSize:'15px'}}>Item</th>
                                        <th className="text-white " style={{fontSize:'15px'}}>Customer</th>
                                        <th className="text-white " style={{fontSize:'15px'}}>Price Per One</th>
                                        <th className="text-white " style={{fontSize:'15px'}}>Qty</th>
                                        <th className="text-white " style={{fontSize:'15px'}}>Total</th>
                                        <th className="text-white " style={{fontSize:'15px'}}>Buying Date</th>
                                        <th className="text-white text-center" style={{fontSize:'15px'}}>Action</th>
                                    </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                    {buyingHistory.map((item,key) => (
                                        <tr>
                                          <td>{getOneItemName(item.bookId)}</td>
                                          <td>{fun_private_user(item.userName)}</td>
                                          <td>RS. {getBookPrice(item.bookId)}</td>
                                          <td>{item.Qty}</td>
                                          <td>RS. {calTotal(parseInt(item.Qty) * parseInt(getBookPrice(item.bookId)))}</td>
                                          <td>{formatDate(new Date(item.createdAt))}</td>
                                          <td>
                                              <button className="btn btn-sm shadow-0 btn-outline-success" >Accept</button>&nbsp;&nbsp;
                                              <button className="btn btn-sm shadow-0 btn-outline-danger" onClick={()=>reject_book_qty(item._id)}>Reject</button>
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


export default BookSelling;