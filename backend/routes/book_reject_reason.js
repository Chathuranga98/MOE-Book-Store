const router = require('express').Router();
let book_reject_reason_model = require('../models/book_reject_reason');
const timestamp = require('time-stamp');

//Save book reject reason
router.route('/addRejectReason').post((req,res) => {
   
    const request_id = req.body.request_id;
    const comment = req.body.comment;

    const reject_reason_save = new book_reject_reason_model({request_id , comment});

    reject_reason_save.save()
        .then(() => res.json('Book Request Rejection Reason Saving Done!'))
        .catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Deleting Data",error: err.message});
        });
});

//One book requests
router.route("/oneReject/:ID").get((req,res) => {
    let ID = req.params.ID; 
    book_reject_reason_model.find({request_id : ID}).then((book_request_reject) => {
        res.json(book_request_reject);
    }).catch((err) => {
        console.log(err);
    });
});   
  



module.exports = router;