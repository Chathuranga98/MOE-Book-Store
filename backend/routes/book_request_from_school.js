const router = require('express').Router();
let book_request_from_school_model = require('../models/book_request_from_school');
const timestamp = require('time-stamp');

//Save book request
router.route('/addBookRequest').post((req,res) => {
    const school = req.body.school;
    const language = req.body.language;
    const subject = req.body.subject;
    const grade = req.body.grade;
    const qty = req.body.qty;
    const fromSchool = req.body.fromSchool;
    const status = "Pending";

    const book_request_save = new book_request_from_school_model({school, language, subject, grade, qty,status,fromSchool});

       book_request_save.save()
        .then(() => res.json('Book Request Saving Done!'))
        .catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Deleting Data",error: err.message});
        });
});
  
//All book requests
router.route("/allBookRequest").get((req,res) => {
    
    book_request_from_school_model.find().sort({_id:-1}).then((bookRequest) => {
        res.json(bookRequest);
    }).catch((err) => {
        console.log(err);
    });
});  


//One book requests
router.route("/oneSchool/:ID").get((req,res) => {
    let ID = req.params.ID; 
    book_request_from_school_model.findById(ID).then((book_request) => {
        res.json(book_request);
    }).catch((err) => {
        console.log(err);
    });
});   

//One book requests by deo
router.route("/oneSchoolByedo/:edo").get((req,res) => {
    let edo = req.params.edo; 
    book_request_from_school_model.findOne({edo : edo}).then((office) => {
        res.json(office);
    }).catch((err) => {
        console.log(err);
    });
});


//All books requests asked by you from other schools
router.route("/otherSchoolBookRequest/:school").get((req,res) => {
    let school = req.params.school; 
    book_request_from_school_model.find({fromSchool : school}).then((request_book) => {
        res.json(request_book);
    }).catch((err) => {
        console.log(err);
    });
});

//One book requests by school id
router.route("/allBookRequest/:school").get((req,res) => {

    book_request_from_school_model.find({school : req.params.school}).sort({_id:-1}).then((bookRequest) => {
        res.json(bookRequest);
    }).catch((err) => {
        console.log(err);
    });
});

//Delete book requests
router.route("/deleteBookRequest/:ID").delete(async (req, res) => {
    let ID = req.params.ID; 
    book_request_from_school_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Book Requests Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});

//Update book requests
router.route('/updateBookRequest/:bookRequestID').put((req, res)=>{
    const bookRequestID = req.params.bookRequestID; 
    const qty = req.body.qty;


    const updateBookRequest={qty}
    book_request_from_school_model.findByIdAndUpdate(bookRequestID,updateBookRequest).then(() => {       
        res.status(200).send({status :"Book Request updated"});    
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });
          
});


//Accept book requests
router.route('/acceptBookRequest/:bookRequestID').put((req, res)=>{
    const bookRequestID = req.params.bookRequestID;
    const status = "Accept"; 

    const updateBookRequest={status}
    book_request_from_school_model.findByIdAndUpdate(bookRequestID,updateBookRequest).then(() => {       
        res.status(200).send({status :"Book Request Accepted"});    
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });
          
});

//Reject book requests
router.route('/rejectBookRequest/:bookRequestID').put((req, res)=>{
    const bookRequestID = req.params.bookRequestID;
    const status = "Reject"; 

    const updateBookRequest={status}
    book_request_from_school_model.findByIdAndUpdate(bookRequestID,updateBookRequest).then(() => {       
        res.status(200).send({status :"Book Request Reject"});    
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });
          
});


module.exports = router;