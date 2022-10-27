
import React, { useState , useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBIcon, MDBCardText, MDBModalDialog ,MDBModalBody ,MDBModalFooter,MDBModalContent,MDBModalHeader,MDBModalTitle, MDBBtn, MDBCol, MDBRow , MDBCardTitle, MDBCardImage} from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';
import axios from 'axios';
import Navbar from "./adminNav";

function Subjects() {

    const [subject_name, setSubject] = useState("");
    const [grade, setGrade] = useState("");
    const [medium, setMedium] = useState("");
    const [qty, setQuantity] = useState("");

    const [searchGrade, setSearchGrade] = useState("");
    const [searchMedium, setSearchMedium] = useState("");

    const [AllSubject,setAllSubject] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/subject/allSubject")
        .then(res => setAllSubject(res.data))
        .catch(error => console.log(error));
    },[])

    function clear(){
        setSubject("");
        setGrade("");
        setMedium("");
        setQuantity("");
    }


   
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
    }

    function subjectAdd() {
        const addSubject ={subject_name,grade,qty,medium}

        axios.post("http://localhost:5000/subject/addSubject",addSubject).then(() =>{
            Swal.fire({  
                title: "Success!",
                text: "Subject Adding Success!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                    if (okay) {
                        clear();
                        axios.get("http://localhost:5000/subject/allSubject")
                        .then(res => setAllSubject(res.data))
                        .catch(error => console.log(error));
                    }
            });
        }).catch((err)=>{
            Swal.fire({  
                title: "Error!",
                text: "Subject Adding Not Success. ",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })
    }

    function back(){
        window.location.href = "Admin_Dashboard";
    }

    function deleteSubject(id){
        Swal.fire({
            title: 'Do you want to this subject?' ,
            icon: 'warning',
            confirmButtonText: 'Yes',
            showDenyButton: true,
            denyButtonText: 'No',
           
        }).then((result) => {
            if (result['isConfirmed']){
                    axios.delete("http://localhost:5000/subject/deleteSubject/"+id).then(() =>{
    
                    Swal.fire({  
                        title: "Success!",
                        text: "Subject Deleting Success",
                        icon: 'success',
                        confirmButtonText: "OK",
                        type: "success"}).then(okay => {
                            if (okay) {
                                axios.get("http://localhost:5000/subject/allSubject")
                                .then(res => setAllSubject(res.data))
                                .catch(error => console.log(error));
                            }
                    });
            
                    
                    }).catch((err)=>{
            
                        Swal.fire({  
                        title: "Error!",
                        text: "System Error!. Account Not deleted.",
                        icon: 'error',
                        confirmButtonText: "OK",
                        type: "success"})
                    })
            }else{
                Swal.fire({  
                    title: "Warning!",
                    text: "Subject Deleting Canceled",
                    icon: 'warning',
                    confirmButtonText: "OK",
                    type: "success"
                })
            }
        });
    }

    function search(){

        if((searchGrade != "") && (searchMedium != "")){
            axios.get("http://localhost:5000/subject/allSubjectFilterGradeMedium/"+searchGrade+"/"+searchMedium)
            .then(res => setAllSubject(res.data))
            .catch(error => console.log(error));
        }else if((searchMedium == "") && (searchGrade != "") ){
            axios.get("http://localhost:5000/subject/allSubjectFilterMedium/"+searchMedium)
            .then(res => setAllSubject(res.data))
            .catch(error => console.log(error));
        }else if((searchMedium != "") && (searchGrade == "") ){
            axios.get("http://localhost:5000/subject/allSubjectFilterGrade/"+searchGrade)
            .then(res => setAllSubject(res.data))
            .catch(error => console.log(error));
        }else{
            Swal.fire({  
                title: "Warning!",
                text: "Please enter subject and grade.",
                icon: 'warning',
                confirmButtonText: "OK",
                type: "success"
            })
        }
    }

    function close(){
        axios.get("http://localhost:5000/subject/allSubject")
        .then(res => setAllSubject(res.data))
        .catch(error => console.log(error));

        setSearchGrade("");
        setSearchMedium("");
    }

    async function editQty(request_id,current_stock){
        const { value: number } = await Swal.fire({
            title: 'Enter New Stocks.',
            input: 'number',
            inputLabel: 'Enter New Book Stock.',
            inputPlaceholder: '',
            showDenyButton: true
          })
          
          if (number) {
                const new_Stock = number;
                const updateSockDetails = {current_stock,new_Stock}
                axios.put("http://localhost:5000/subject/addNewBookStock/"+request_id,updateSockDetails).then(() =>{
    
                    Swal.fire({  
                        title: "Success!",
                        text: "Stock Updating Success!",
                        icon: 'success',
                        confirmButtonText: "OK",
                        type: "success"}).then(okay => {
                            if (okay) {
                                window.location.href = "/Admin_subjects";
                            }
                    });
    
            
                }).catch((err)=>{
        
                    Swal.fire({  
                    title: "Error!",
                    text: "Stock Updating  Not Success",
                    icon: 'error',
                    confirmButtonText: "OK",
                    type: "success"})
                })
          }
    }
 
    return (
        <div>
        <div class="dashboard-main-wrapper">
            <Navbar/>
            <div class="dashboard-wrapper">
                <div class="container" style={{paddingTop:'3%',paddingLeft:'2%', paddingBottom:'10%', width:'98%'}}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i><small>ADMIN</small><br/>&nbsp;&nbsp;&nbsp;&nbsp;Dashboard</h4>
                    <hr/>
                    <div className="text-end">
                        <MDBBtn color="dark" size='sm' className='shadow-0 p-2' style={{letterSpacing:'1px'}} onClick={back} >Back</MDBBtn>
                    </div>
                    <MDBRow className='mt-3 ' >
                        <MDBCol sm='6'>
                            <div className="border  p-3 mb-3" style={{backgroundColor:'#ECECEC'}}>
                                <h6>Filter Subjects : </h6>
                                <hr/>
                            <MDBRow >
                                
                                <MDBCol sm='4'>
                                    <h6 className="fw-normal text-dark">Medium</h6>
                                    <select value={medium}  class="bg-light form-select" onChange={(e) =>{
                                        setSearchMedium(e.target.value);
                                    }}>
                                        <option value="" >Select Medium</option>
                                        <option value="Sinhala" >Sinhala</option>
                                        <option value="Tamil" >Tamil</option>
                                        <option value="English" >English</option>
                                    </select>
                                </MDBCol>
                                <MDBCol sm='4'>
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
                                <MDBCol sm='4'>
                                    <h6 className="fw-normal text-dark">&nbsp;</h6>
                                    <button class="btn btn-dark rounded-0 btn-sm mt-1 shadow-0" onClick={search}><MDBIcon fas icon="search" /></button>
                                    <button class="btn btn-danger rounded-0 btn-sm mt-1 shadow-0" onClick={close}><MDBIcon fas icon="times" /></button>
                                </MDBCol>
                            </MDBRow>
                            </div>
                            <MDBTable>
                                <MDBTableHead>
                                    <tr className="bg-dark">
                                        <th scope='col' className="text-white " style={{fontSize:'15px'}}>Subject</th>
                                        <th scope='col' className="text-white " style={{fontSize:'15px'}}>Grade</th>
                                        <th scope='col' className="text-white " style={{fontSize:'15px'}}>Quantity</th>
                                        <th scope='col' className="text-white " style={{fontSize:'15px'}}>Medium</th>
                                        <th scope='col' className="text-white " style={{fontSize:'15px'}}>Action</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>  
                                    {AllSubject.map((subject,key) => (
                                        <tr className="bg-light">
                                            <th scope='col' style={{fontSize:'15px'}}>{subject.subject_name}</th>
                                            <th scope='col' style={{fontSize:'15px'}}>{subject.grade}</th>
                                            <th scope='col' style={{fontSize:'15px'}}>{subject.qty}</th>
                                            <th scope='col' style={{fontSize:'15px'}}>{subject.medium}</th>
                                            <th scope='col' style={{fontSize:'15px'}}>
                                                <button className="btn btn-outline-danger btn-sm"  onClick={()=>deleteSubject(subject._id )}><MDBIcon size='1x' fas icon="trash" /></button>&nbsp;&nbsp;
                                                <button className="btn btn-outline-success btn-sm"  onClick={()=>editQty(subject._id,subject.qty)}><MDBIcon size='1x' fas icon="pen" /></button>
                                            </th>
                                        </tr>
                                    ))}
                                </MDBTableBody>
                            </MDBTable>
                        </MDBCol>
                        <MDBCol sm='6'>
                            <div className="pt-5 pb-2 pr-5 pl-5 rounded" style={{backgroundColor:'#E5E8E8'}}>
                                <center>
                                    <h4>Add New Subject</h4>
                                </center>
                                <div class="mb-3">
                                    <h6 className="fw-normal text-dark">Subject</h6>
                                    <input type="text" value={subject_name} class="bg-light form-control" onChange={(e) =>{
                                        setSubject(e.target.value);
                                    }}/>
                                </div>
                                <div class="mb-3">
                                    <h6 className="fw-normal text-dark">Medium</h6>
                                    <select value={medium}  class="bg-light form-select" onChange={(e) =>{
                                        setMedium(e.target.value);
                                    }} >
                                        <option value="" >Select Medium</option>
                                        <option value="Sinhala" >Sinhala</option>
                                        <option value="Tamil" >Tamil</option>
                                        <option value="English" >English</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <h6 className="fw-normal text-dark">Grade</h6>
                                    <select class="bg-light form-select" value={grade}  onChange={(e) =>{
                                        setGrade(e.target.value);
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
                                </div>
                                <div class="mb-3 mt-4">
                                    <h6 className="fw-normal text-dark">Quantity</h6>
                                    <input type="number" value={qty} class="bg-light form-control" onChange={(e) =>{
                                        setQuantity(e.target.value);
                                    }}/>
                                </div>
                                <div class="mb-3 text-end">
                                    <button class="btn btn-outline-dark btn-sm shadow-0" onClick={subjectAdd}>Save</button>
                                </div>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </div>
            </div>
          </div>
        </div>
      )
};


export default Subjects;