const router = require('express').Router();
let book_request_from_deo_model = require('../models/book_request_from_deo');
let subject_model = require('../models/subject');
const timestamp = require('time-stamp');

//Save book request
router.route('/addBookRequest').post((req,res) => {
    const school = req.body.school;
    const language = req.body.language;
    const subject = req.body.subject;
    const grade = req.body.grade;
    const qty = req.body.qty;
    const availableQty = req.body.availableQty;
    const edo = req.body.edo;
    const stock_id = req.body.stock_id;
    const status = "Pending";

    let qty_for_stock_update = parseInt(availableQty) - parseInt(qty);

    const book_request_save = new book_request_from_deo_model({school, language, subject, grade, qty, edo,status});

       book_request_save.save()
        .then(() => {
            let qty = qty_for_stock_update;
            const stock_update={qty}
            subject_model.findByIdAndUpdate(stock_id,stock_update).then(() => {       
                res.status(200).send({status :"Stock Updated."});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Deleting Data",error: err.message});
        });
});
  
//All book requests
router.route("/allBookRequest").get((req,res) => {
    
    book_request_from_deo_model.find().sort({_id:-1}).then((bookRequest) => {
        res.json(bookRequest);
    }).catch((err) => {
        console.log(err);
    });
});  


//One book requests
router.route("/oneSchool/:ID").get((req,res) => {
    let ID = req.params.ID; 
    book_request_from_deo_model.findById(ID).then((book_request) => {
        res.json(book_request);
    }).catch((err) => {
        console.log(err);
    });
});   

//One book requests by deo
router.route("/oneSchoolByedo/:edo").get((req,res) => {
    let edo = req.params.edo; 
    book_request_from_deo_model.findOne({edo : edo}).then((office) => {
        res.json(office);
    }).catch((err) => {
        console.log(err);
    });
});

//One book requests by school id
router.route("/allBookRequest/:school").get((req,res) => {

    book_request_from_deo_model.find({school : req.params.school}).sort({_id:-1}).then((bookRequest) => {
        res.json(bookRequest);
    }).catch((err) => {
        console.log(err);
    });
});

//Delete book requests
router.route("/deleteBookRequest/:ID").delete(async (req, res) => {
    let ID = req.params.ID; 
    book_request_from_deo_model.findByIdAndDelete(ID)
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
    const availableQty = req.body.availableQty;
    const stock_id = req.body.stock_id;

    let qty_for_stock_update = parseInt(availableQty) - parseInt(qty);


    const updateBookRequest={qty}
    book_request_from_deo_model.findByIdAndUpdate(bookRequestID,updateBookRequest).then(() => {       
        let qty = qty_for_stock_update;
        const stock_update={qty}
        subject_model.findByIdAndUpdate(stock_id,stock_update).then(() => {       
            res.status(200).send({status :"Stock Updated."});    
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        });     
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
    book_request_from_deo_model.findByIdAndUpdate(bookRequestID,updateBookRequest).then(() => {       
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
    book_request_from_deo_model.findByIdAndUpdate(bookRequestID,updateBookRequest).then(() => {       
        res.status(200).send({status :"Book Request Reject"});    
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });
          
});


module.exports = router;