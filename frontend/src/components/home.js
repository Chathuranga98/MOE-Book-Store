
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBCardOverlay, MDBCardBody, MDBIcon, MDBCardText, MDBCardImage , MDBBtn, MDBCol, MDBRow , MDBCardTitle, MDBCardFooter} from 'mdb-react-ui-kit';
import axios from 'axios';
import Nav from './private_user/nav.js';

function Home() {
return (
        <div>
            <Nav/>
            <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active rounded-0" data-bs-interval="10000">
                        <div className="card text-bg-dark ">
                            <img src="https://i.imgur.com/7LcETGy.jpeg" className="card-img" alt="..."/>
                            <div className="card-img-overlay rounded-0">
                                <div className="row row-cols-1 row-cols-md-2 g-4" style={{marginTop:'10%'}}>
                                    <div className="col">
                                       
                                    </div>
                                    <div className="col">
                                        <div className="card bg-transparent shadow-0">
                                        <center>
                                            <img src="https://i.imgur.com/vb1Lp76.png" className="card-img-top" style={{width:'20%'}} alt="..."/>
                                        </center>
                                        <div className="card-body">
                                            <h1 className="card-title fw-bolder display-2 text-decoration-underline"><span style={{color:'#02153B'}}>MOE</span> <span style={{color:'#282D4C'}}>BOOKSTORE</span></h1>
                                            <h6 style={{letterSpacing:'6px'}} className="card-text">PROPER EDUCATION IS A RIGHT OF EVERY CHILD.</h6>
                                            <p className="mt-4"><b>MOE Book Store</b> is a solution to reduce time and resources consumed when placing orders manually and to provide a platform to buy textbooks,teacher's manuals and other learning materials quickly and easily.</p>
                                            <h5>Objectives</h5>
                                            <ul>
                                                <li>Provide accurate and reliable information.</li>
                                                <li>Minimizing the faults and errors that existed in the existing system.</li>
                                            </ul>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className="text-center mb-4" style={{marginTop:'10%'}}>
                <h2 className="text-uppercase mb-4">Our Services</h2>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="card">
                            <img src="https://i.imgur.com/okTnriE.jpeg" className="card-img-top" alt="..." />
                            <div className="card-body" style={{backgroundColor:'#DEDEDE'}}>
                                <h5 className="card-title text-uppercase">Text Books</h5>
                            </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="card">
                            <img src="https://i.imgur.com/F7KLbmJ_d.webp?maxwidth=760&fidelity=grand" className="card-img-top" alt="..." />
                            <div className="card-body" style={{backgroundColor:'#DEDEDE'}}>
                                <h5 className="card-title text-uppercase">PAST PAPERS</h5>
                            </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="card">
                            <img src="https://i.imgur.com/TWdGxBX.jpeg" className="card-img-top" alt="..." />
                            <div className="card-body" style={{backgroundColor:'#DEDEDE'}}>
                                <h5 className="card-title text-uppercase">Recommended BOOKS</h5>
                            </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="card">
                            <img src="https://i.imgur.com/lXsLOmB.jpeg" className="card-img-top" alt="..." />
                            <div className="card-body" style={{backgroundColor:'#DEDEDE'}}>
                                <h5 className="card-title text-uppercase">Teacher Manual</h5>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};


export default Home;