import React, { Component } from "react";
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import '../../admin_css.css';

class Navbar extends Component { 
render() {
    function logout(){
        
          	Swal.fire({  
                title: "Success!",
                text: "Logout Success",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                    if (okay) {
                        window.location.href = "/Admin/Login";
                    }
            });
    }

    const userType = Cookies.get('userType');
return (
  <div>
      <div class="dashboard-header">
            <nav class="navbar navbar-expand-lg bgTopNav fixed-top">
                <img src="https://i.imgur.com/UmR1m1t.png" className="p-2" style={{width: '5%'}} alt="" /> <a class="navbar-brand h1 fw-bold pt-3" style={{fontSize:'25px'}} href="/Admin/Admin_Dashboard"><span className="text-black">MOE</span><span className="text-danger"> &nbsp;BOOKSTORE</span></a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto navbar-right-top">
                        <li class="nav-item dropdown nav-user">
                            <a class="nav-link nav-user-img" href="#0" id="navbarDropdownMenuLink2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="bi bi-person-circle text-dark" style={{fontSize:'25px'}}></i></a>
                            <div class="dropdown-menu dropdown-menu-right nav-user-dropdown" aria-labelledby="navbarDropdownMenuLink2">
                                <div class="nav-user-info">
                                    <h5 class="mb-0 text-white nav-user-name text-capitalize">Hello! Welcome To System</h5>
                                    <span class="status"></span><span>Available</span>
                                </div>
                                <a class="dropdown-item" href="#0"><i class="bi bi-person-fill mr-2"></i>Account</a>
                                <a class="dropdown-item" href="#0"><i class="bi bi-gear-fill mr-2"></i>Setting</a>
                                <a class="dropdown-item" href="#0" onClick={logout}><i class="bi bi-box-arrow-right mr-2"></i>Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <div class="nav-left-sidebar sidebar-dark">
            <div class="menu-list" style={{paddingBottom:'40%'}}>
                <nav class="navbar navbar-expand-lg navbar-light shadow-0">
                    <a class="d-xl-none d-lg-none d_font_family" href="Admin">Dashboard</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav flex-column">
                            <h3 className="mt-4 mb-4 text-warning d_font_family" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dashboard</h3>
                            <li class="nav-item ">
                                <a class="nav-link active" style={{fontSize:'17px'}} href="/Admin/Admin_Dashboard"  aria-expanded="false" data-target="#submenu-1" aria-controls="submenu-1"> Home </a>
                            </li>
                            <li class="nav-item " >
                                <a class="nav-link " style={{fontSize:'17px'}} href="divisional_staff_Dashboard"  aria-expanded="false" data-target="#submenu-1" aria-controls="submenu-1"> Divisional Education Officer </a>
                            </li> 
                            <li class="nav-item " >
                                <a class="nav-link " style={{fontSize:'17px'}} href="PrivateUser"  aria-expanded="false" data-target="#submenu-1" aria-controls="submenu-1"> Private User </a>
                            </li>
                            <li class="nav-item " >
                                <a class="nav-link " style={{fontSize:'17px'}} href="ManageBookShop"  aria-expanded="false" data-target="#submenu-1" aria-controls="submenu-1"> Bookshop </a>
                            </li>
                            <li class="nav-item " >
                                <a class="nav-link " style={{fontSize:'17px'}} href="BookRequest"  aria-expanded="false" data-target="#submenu-1" aria-controls="submenu-1"> Bookshop  Request</a>
                            </li>
                            <li class="nav-item " >
                                <a class="nav-link " style={{fontSize:'17px'}} href="Announcements"  aria-expanded="false" data-target="#submenu-1" aria-controls="submenu-1"> Announcements</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </div>
   );
 }
}
export default Navbar; 