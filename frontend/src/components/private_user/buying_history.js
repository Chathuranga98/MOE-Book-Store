
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBTableHead, MDBTable, MDBIcon, MDBCardImage ,MDBModalBody ,MDBModalFooter,MDBModalContent,MDBModalHeader,MDBModalTitle, MDBBtn, MDBCol, MDBRow , MDBCardTitle, MDBCardFooter, MDBTableBody} from 'mdb-react-ui-kit';
import axios from 'axios';
import Navbar from "./privateNav";
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


function BookBuyingHistory() {
    const UserName =  Cookies.get('username');
    function back() {
        window.location.href = "Private_user_dashboard";
    }

    const [buyingHistory,setBuyingHistory] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/book_buy/bookForOneUser/"+UserName)
        .then(res => setBuyingHistory(res.data))
        .catch(error => console.log(error));
    },[])

    function count_total_price(){
        let total = 0;
        const count_of_cart_item = buyingHistory.length;
        for (let i = 0; i < count_of_cart_item; i++){
            total = parseInt(total)+parseInt( buyingHistory[i].Qty*parseInt(getBookPrice(buyingHistory[i].bookId)));
        }
        return total;
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

    async function edit_book_qty(cartID,current_added_Qty,current_stock,bookId){

        
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
            
            if(number <= current_stock) {
            const new_qty = number;
            const editItemCount ={new_qty,current_added_Qty,current_stock,bookId}

            axios.put("http://localhost:5000/book_buy/updateBookQty/"+cartID,editItemCount).then(() =>{
    
                Swal.fire({  
                    title: "Success!",
                    text: "Book Qty Updated!",
                    icon: 'success',
                    confirmButtonText: "OK",
                    type: "success"}).then(okay => {
                        if (okay) {
                            axios.get("http://localhost:5000/book_buy/bookForOneUser/"+UserName)
                            .then(res => setBuyingHistory(res.data))
                            .catch(error => console.log(error));
                        }
                });
    
            }).catch((err)=>{
    
                Swal.fire({  
                    title: "Error!",
                    text: "Qty Not Edited",
                    icon: 'error',
                    confirmButtonText: "OK",
                    type: "success"
                })
            })
        }else{
            Swal.fire({  
                title: "Error!",
                text: "You cannot buy. Current Book Stock is only "+current_stock+" books. But you requested "+number+" books.",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        }
      }
    }
    
    function delete_from_cart(cartID,current_added_Qty,current_stock,bookId){
        Swal.fire({
            title: 'Do you want to delete this item?' ,
            icon :'warning',
            confirmButtonText: 'Yes',
            showDenyButton: true,
            denyButtonText: 'No',
           
          }).then((result) => {
            if (result['isConfirmed']){
                axios.delete("http://localhost:5000/book_buy/deleteCartItem/"+cartID+"/"+current_added_Qty+"/"+current_stock+"/"+bookId).then(() =>{

                    Swal.fire({  
                        title: "Success!",
                        text: "Item Deleting Success!",
                        icon: 'success',
                        confirmButtonText: "OK",
                        type: "success"}).then(okay => {
                            if (okay) {
                                axios.get("http://localhost:5000/book_buy/bookForOneUser/"+UserName)
                                .then(res => setBuyingHistory(res.data))
                                .catch(error => console.log(error));
                            }
                    });
        
                
                }).catch((err)=>{
       
                    Swal.fire({  
                        title: "Error!",
                        text: "Item Deleting Not Success",
                        icon: 'error',
                        confirmButtonText: "OK",
                        type: "success"
                    });
                })
            }else{
                Swal.fire({  
                    title: "Error!",
                    text: "Item not deleted",
                    icon: 'error',
                    confirmButtonText: "OK",
                    type: "success"
                })
            }
        });
    }

    function fun_current_stock(id){
        const count_of_books = allBookStore.length;
        for (let i = 0; i < count_of_books; i++){
            if(allBookStore[i]._id == id){
                return allBookStore[i].current_qty;
            }
        }
    }

    function calTotal(total){
        return total;
    }


    function updateCart(){
        const count_of_cart = buyingHistory.length;
        const return_value = 1;
        for (let i = 0; i < count_of_cart; i++){
            axios.put("http://localhost:5000/book_buy/updateBoughtStatus/"+buyingHistory[i]._id).then(() =>{
            }).catch((err)=>{
                return_value = 0;
            });
        }
        window.location.href = "Private_user_books";
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
                    <MDBRow className='mt-3' >
                        <MDBCol sm='9' className="h-100">
                            <MDBTable className='mt-3'>
                                <MDBTableHead>
                                    <tr className="bg-dark">
                                        <th  className="text-white " style={{fontSize:'15px'}}>Item</th>
                                        <th className="text-white " style={{fontSize:'15px'}}>Price Per One</th>
                                        <th className="text-white " style={{fontSize:'15px'}}>Qty</th>
                                        <th className="text-white " style={{fontSize:'15px'}}>Total</th>
                                        <th className="text-white " style={{fontSize:'15px'}}>Status</th>
                                        <th className="text-white " style={{fontSize:'15px'}}>Buying Date</th>
                                        <th className="text-white text-center" style={{fontSize:'15px'}}>Action</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {buyingHistory.map((item,key) => (
                                        <tr>
                                          <td>{getOneItemName(item.bookId)}</td>
                                          <td>RS. {getBookPrice(item.bookId)}</td>
                                          <td>{item.Qty}</td>
                                          <td>RS. {calTotal(parseInt(item.Qty) * parseInt(getBookPrice(item.bookId)))}</td>
                                          <td>{item.status}</td>
                                          <td>{formatDate(new Date(item.createdAt))}</td>
                                          <td>
                                                <MDBBtn  size='sm' className="shadow-0 mt-3 btn-success" href='#' onClick={()=>edit_book_qty(item._id,item.Qty,fun_current_stock(item.bookId),item.bookId)}><MDBIcon fas icon="pen-fancy" /></MDBBtn>&nbsp;&nbsp;&nbsp;
                                                <MDBBtn  size='sm' className="shadow-0 mt-3 btn-danger" href='#' onClick={()=>delete_from_cart(item._id,item.Qty,fun_current_stock(item.bookId),item.bookId)}><MDBIcon fas icon="trash" /></MDBBtn>&nbsp;&nbsp;&nbsp;
                                          </td>
                                        </tr>
                                    ))}
                                </MDBTableBody>
                            </MDBTable>
                        </MDBCol>
                        <MDBCol sm='3' style={{backgroundColor:'#D8D8D8'}} className="h-100 mt-3 rounded">
                            <center>
                                <h4 className="mt-4 mb-4 text-decoration-underline" style={{color:'black'}}>Checkout Details</h4>
                                <h1>Rs.{count_total_price()}.00</h1>
                                <p style={{lineHeight:'1px'}}>Total Price</p>
                            </center>
                            <div className='pt-5'>

                            </div>
                            <PayPalScriptProvider   options={{ "client-id": "Ae8ybaJuEx5-EqiFsvJJ1Pb2SugkHAk7G-f7Q-C24inOjSYXblTB4wgk7wyd_bWXjHwRHznK3DVs-qbz" }}>
                                <PayPalButtons
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        value: count_total_price(),
                                                    },
                                                },
                                            ],
                                        });
                                    }}
                                    onApprove={(data, actions) => {
                                        return actions.order.capture().then((details) => {
                                            const name = details.payer.name.given_name;
                                            updateCart();
                                            Swal.fire({  
                                                title: "Success!",
                                                text: "You Bought Books.",
                                                icon: 'success',
                                                confirmButtonText: "OK",
                                                type: "success"
                                            });
                                        });
                                    }}
                                />
                            </PayPalScriptProvider>
                        </MDBCol>
                    </MDBRow>
                </div>
            </div>
            
          </div>
        </div>
      )
};


export default BookBuyingHistory;