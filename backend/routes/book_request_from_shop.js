const router = require('express').Router();
let book_request_from_shops_model = require('../models/book_request_from_shop');
let subject_model = require('../models/subject');

//Save book request
router.route('/addBookRequest').post((req,res) => {
    const bookshop = req.body.bookshop;
    const language = req.body.language;
    const subject = req.body.subject;
    const grade = req.body.grade;
    const qty = req.body.qty;
    const status = "Pending";

    const book_request_save = new book_request_from_shops_model({bookshop,language,subject,grade,qty,status});

       book_request_save.save()
        .then(() => res.json('Book Request Saving Done!'))
        .catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Deleting Data",error: err.message});
        });
});
  
//All book requests
router.route("/allBookRequest").get((req,res) => {
    
    book_request_from_shops_model.find().sort({_id:-1}).then((bookRequest) => {
        res.json(bookRequest);
    }).catch((err) => {
        console.log(err);
    });
});  


//One book requests
router.route("/oneSchool/:ID").get((req,res) => {
    let ID = req.params.ID; 
    book_request_from_shops_model.findById(ID).then((book_request) => {
        res.json(book_request);
    }).catch((err) => {
        console.log(err);
    });
});   

//One book requests by shop id
router.route("/allBookRequest/:bookshop").get((req,res) => {

    book_request_from_shops_model.find({bookshop : req.params.bookshop}).sort({_id:-1}).then((bookRequest) => {
        res.json(bookRequest);
    }).catch((err) => {
        console.log(err);
    });
});

//Delete book requests
router.route("/deleteBookRequest/:ID").delete(async (req, res) => {
    let ID = req.params.ID; 
    book_request_from_shops_model.findByIdAndDelete(ID)
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
    book_request_from_shops_model.findByIdAndUpdate(bookRequestID,updateBookRequest).then(() => {       
        res.status(200).send({status :"Book Request updated"});    
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });
          
});


//Accept book requests
router.route('/acceptBookRequest/:bookRequestID/:current_stock/:stock_id/:request_qty').put((req, res)=>{
    const bookRequestID = req.params.bookRequestID;
    const current_stock = req.params.current_stock;
    const stock_id = req.params.stock_id;
    const request_qty = req.params.request_qty;
    const status = "Accept"; 

    const updateBookRequest={status}
    book_request_from_shops_model.findByIdAndUpdate(bookRequestID,updateBookRequest).then(() => {       
        
        const qty = parseInt(parseInt(current_stock) - parseInt(request_qty));
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


//Admin accept with new book qty
router.route('/acceptBookRequestWithCustomize/:bookRequestID/:new_Stock').put((req, res)=>{
    const bookRequestID = req.params.bookRequestID;
    const qty = req.params.new_Stock;
    const status = "Accept"; 

    const updateBookRequest={status,qty}
    book_request_from_shops_model.findByIdAndUpdate(bookRequestID,updateBookRequest).then(() => {       
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
    book_request_from_shops_model.findByIdAndUpdate(bookRequestID,updateBookRequest).then(() => {       
        res.status(200).send({status :"Book Request Reject"});    
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });
          
});

//book transfer to store
router.route('/bookTransferToStore/:bookRequestID').put((req, res)=>{
    const bookRequestID = req.params.bookRequestID;
    const status = "Transfer"; 

    const updateBookRequest={status}
    book_request_from_shops_model.findByIdAndUpdate(bookRequestID,updateBookRequest).then(() => {       
        res.status(200).send({status :"Book Transfer"});    
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });
          
});
module.exports = router;