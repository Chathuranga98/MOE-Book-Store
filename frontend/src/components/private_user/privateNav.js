import React, { Component } from "react";
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

const NavLinks = [
    {
      id: 1,
      item: "Dashboard",
      link:"Private_user_dashboard"
    },
    {
      id: 2,
      item: "Bookstore",
      link:"Private_user_books"
    },
    {
      id: 3,
      item: "Book Buying",
      link:"Private_books_buying_history"
    },
    {
      id: 4,
      item: "Announcement",
      link:"Private_notice"
    }
  ];

class Navbar extends Component { 
render(props) {
    function logout(){
        
          	Swal.fire({  
                title: "Success!",
                text: "Logout Success",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                    if (okay) {
                        window.location.href = "/Private_user_login";
                    }
            });
    }

    const userName = Cookies.get('user_name');
return (
  <div>
      <div className="dashboard-header">
            <nav className="navbar navbar-expand-lg bgTopNav fixed-top">
                <a className="navbar-brand h1 fw-bold" style={{fontSize:'25px'}} href="Admin"><span className="text-black">MOE </span><span className="text-primary">&nbsp;BOOKSTORE</span></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto navbar-right-top">
                        <li className="nav-item dropdown nav-user">
                            <a className="nav-link nav-user-img" href="#" id="navbarDropdownMenuLink2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-fw fa-user"></i></a>
                            <div className="dropdown-menu dropdown-menu-right nav-user-dropdown" aria-labelledby="navbarDropdownMenuLink2">
                                <div className="nav-user-info">
                                    <h5 className="mb-0 text-white nav-user-name text-capitalize">{userName}</h5>
                                    <span className="status"></span><span>Available</span>
                                </div>
                                <a className="dropdown-item" href="#"><i className="fas fa-user mr-2"></i>Account</a>
                                <a className="dropdown-item" href="#"><i className="fas fa-cog mr-2"></i>Setting</a>
                                <a className="dropdown-item" href="#" onClick={logout}><i className="fas fa-power-off mr-2"></i>Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <div className="nav-left-sidebar sidebar-dark">
            <div className="menu-list" style={{paddingBottom:'40%'}}>
                <nav className="navbar navbar-expand-lg navbar-light shadow-0">
                    <a className="d-xl-none d-lg-none" href="libraryDashboard">DASHBOARD</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav flex-column">
                           <h4 className="mt-4 mb-4 text-warning">DASHBOARD</h4>
                           {NavLinks.map((nav_item) => (
                                <li className="nav-item ">
                                    <a className="nav-link " style={{fontSize:'17px'}} href={nav_item.link} aria-expanded="false" data-target="#submenu-1" aria-controls="submenu-1">{nav_item.item}</a>
                                </li>
                           ))}
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