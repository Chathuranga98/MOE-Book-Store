
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBCardOverlay, MDBCardBody, MDBIcon, MDBCardText, MDBCardImage , MDBBtn, MDBCol, MDBRow , MDBCardTitle, MDBCardFooter} from 'mdb-react-ui-kit';
import Navbar from "./adminNav";
import axios from 'axios';
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

function AdminDashboard() {
    const [dateState, setDateState] = useState(new Date());
    useEffect(() => {
        setInterval(() => setDateState(new Date()), 1000);
    }, []);

    function goEducationOffice(){
        window.location.href = "DivisionalOffice";
    }

    function Admin_Announcement(){
        window.location.href = "Admin_Announcement";
    }

    function goBookRequest(){
        window.location.href = "Admin_BookRequest";
    }

    function Admin_Private_user(){
        window.location.href = "Admin_Private_user";
    }

    function Admin_bookshop(){
        window.location.href = "Admin_bookshop";
    }
    
    function Admin_subjects(){
        window.location.href = "Admin_subjects";
    }

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

    const [buyingHistory,setBuyingHistory] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/book_buy/soldAllBooks")
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

    return (
        <div>
        <div class="dashboard-main-wrapper">
            <Navbar/>
            <div class="dashboard-wrapper">
                <div class="container pb-5" style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i><small>ADMIN</small><br/>&nbsp;&nbsp;&nbsp;&nbsp;Dashboard</h4>
                    <hr/>
                    <MDBRow >
                        <MDBCol sm='8'>
                            <MDBCard className="shadow-0 p-3 h-100" style={{backgroundColor:'#EAECEE'}}>
                                <Line options={options} data={data} />
                            </MDBCard>
                        </MDBCol>
                        <MDBCol sm='4'> 
                            <MDBCard style={{backgroundColor:'#E4EFE3' , height : '93%' , border : '1px solid #AAA7A7'}} className='text-white h-100' >
                                <MDBCardOverlay>
                                    <MDBCardTitle className="text-center" style={{color:'#115B5B' , fontWeight :'normal' ,  fontSize : '27px' , paddingTop:'2%'}}>Welcome To Admin Panel</MDBCardTitle>
                                    <MDBCardText style={{color:'#293232'}} className="text-center display-2 mt-5 pt-2 fw-bold">
                                    {dateState.toLocaleString('en-US', {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        second: 'numeric',
                                        hour12: false,
                                    })}
                                    </MDBCardText>
                                    <MDBCardText className="text-center text-dark" style={{letterSpacing:'1px' , lineHeight:'0%'}}>Today is {dateState.toLocaleString('en-US', {
                                        day: 'numeric',
                                        month: 'numeric',
                                        year: 'numeric',
                                    })}</MDBCardText>
                                    <hr style={{backgroundColor:'black' , marginTop:'13%'}}/>
                                </MDBCardOverlay>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="mt-4" >
                        <MDBCol sm='12' >
                            <MDBRow >
                                <MDBCol sm='6' >
                                    <MDBCard  className="h-100" onClick={goEducationOffice}>
                                    <MDBCardBody>
                                        <MDBCardTitle className='text-dark fw-bold text-uppercase' style={{letterSpacing:'1px' , fontSize:'22px'}}>Divisional Education Office</MDBCardTitle>
                                        <MDBCardText className="mt-3" style={{lineHeight:'125%'}}>
                                            The purpose of the Divisional Education O. card is Divisional Education Management. Administrators able to add new divisional education officers and manage officers.
                                        </MDBCardText>
                                        <div className="text-end">
                                            <MDBBtn  style={{backgroundColor:'#3E5647'}} className="shadow-0 " href='#'>GO <MDBIcon fas icon="long-arrow-alt-right" /></MDBBtn>
                                        </div>
                                    </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                                <MDBCol sm='6' >
                                    <MDBCard className="h-100 " onClick={Admin_Private_user}>
                                    <MDBCardBody>
                                        <MDBCardTitle className='text-dark fw-bold text-uppercase' style={{letterSpacing:'1px', fontSize:'22px'}}>Private User</MDBCardTitle>
                                        <MDBCardText className="mt-3" style={{lineHeight:'125%'}}>
                                        The purpose of the Private User card is Private User Management. Administrators able to view new private users and close and reopen private users' accounts.
                                        </MDBCardText>
                                        <div className="text-end">
                                            <MDBBtn  style={{backgroundColor:'#3E4856'}} className="shadow-0" href='#'>GO <MDBIcon fas icon="long-arrow-alt-right" /></MDBBtn>
                                        </div>
                                    </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                                <MDBCol sm='6' className='mt-2'>
                                    <MDBCard className="h-100" onClick={Admin_bookshop}>
                                        <MDBCardBody>
                                            <MDBCardTitle className='text-dark fw-bold text-uppercase' style={{letterSpacing:'1px', fontSize:'22px'}}>Book Shop</MDBCardTitle>
                                            <MDBCardText className="mt-3" style={{lineHeight:'125%'}}>
                                            The purpose of the Book Shop card is BookShop Management. Admin able to add and manage bookshops' profiles. And also able to give permission for access System to bookshop which are self register.
                                            </MDBCardText>
                                            <div className="text-end">
                                                <MDBBtn  style={{backgroundColor:'#56473E'}} className="shadow-0" href='#'>GO <MDBIcon fas icon="long-arrow-alt-right" /></MDBBtn>
                                            </div>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                                <MDBCol sm='6' className='mt-2'>
                                    <MDBCard className="h-100" onClick={goBookRequest}>
                                        <MDBCardBody>
                                            <MDBCardTitle className='text-dark fw-bold text-uppercase' style={{letterSpacing:'1px', fontSize:'22px'}}>Book Request</MDBCardTitle>
                                            <MDBCardText className="mt-3" style={{lineHeight:'125%'}}>
                                                Administrators able to view book requests which send by divisional education office, schools, private users and able to accept or reject book request.
                                            </MDBCardText>
                                            <div className="text-end">
                                                <MDBBtn  style={{backgroundColor:'#523E56'}} className="shadow-0" href='#'>GO <MDBIcon fas icon="long-arrow-alt-right" /></MDBBtn>
                                            </div>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                                <MDBCol sm='6' className='mt-2'>
                                    <MDBCard className="h-100 " onClick={Admin_Announcement}>
                                        <MDBCardBody>
                                            <MDBCardTitle className='text-dark fw-bold text-uppercase' style={{letterSpacing:'1px', fontSize:'22px'}}>Announcements</MDBCardTitle>
                                            <MDBCardText className="mt-3" style={{lineHeight:'125%'}}>
                                                Administrators able to publish and manage announcements. Admin able to publish announcements as view only schools, view only private user and view only divisional education office.
                                            </MDBCardText>
                                            <div className="text-end">
                                                <MDBBtn  style={{backgroundColor:'#3E5647'}} className="shadow-0" href='#'>GO <MDBIcon fas icon="long-arrow-alt-right" /></MDBBtn>
                                            </div>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                                <MDBCol sm='6' className='mt-2'>
                                    <MDBCard className="h-100 " onClick={Admin_subjects}>
                                        <MDBCardBody>
                                            <MDBCardTitle className='text-dark fw-bold text-uppercase' style={{letterSpacing:'1px', fontSize:'22px'}}>Subjects</MDBCardTitle>
                                            <MDBCardText className="mt-3" style={{lineHeight:'125%'}}>
                                                Administrators able to add and manage subjects. Also admin able to manage book stock under the each subject. Also the can filter subject using grade and medium.
                                            </MDBCardText>
                                            <div className="text-end">
                                               <MDBBtn  style={{backgroundColor:'#56473E'}} className="shadow-0" href='#'>GO <MDBIcon fas icon="long-arrow-alt-right" /></MDBBtn>
                                            </div>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                       
                    </MDBRow>
                    
                </div>
            </div>
          </div>
        </div>
      )
};


export default AdminDashboard;