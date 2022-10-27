
import React, { useState , useEffect } from 'react';

function Nav() {
    function join(){
        window.location.href = "Private_user_reg";
    }

    function login(){
        window.location.href = "Private_user_login";
    }
return (
        <div>
            <nav className="navbar navbar-expand-lg fixed-top" style={{backgroundColor:'#22224A'}} >
                <div className="container-fluid">
                    <a class="navbar-brand" href="/">
                        <img src="https://i.imgur.com/L8r42rH.png" alt="Bootstrap" width="90" height="90"/>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#" style={{fontSize:'20px'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Home&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#" style={{fontSize:'20px'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;About&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#" style={{fontSize:'20px'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Contact Us</a>
                            </li>
                        </ul>
                        <form className="d-flex mb-3" role="search">
                            
                            <button className="btn  mr-2 shadow-0" style={{border:'1px solid #CED6E5' , color : '#CED6E5',fontSize:'12px', letterSpacing: 1}} type="button" onClick={join}>Join Now</button>
                            <button className="btn text-white shadow-0" style={{backgroundColor:'#496EAF', letterSpacing: 1,fontSize:'12px'}} type="button" onClick={login}>Login</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
};


export default Nav;