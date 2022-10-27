const router = require('express').Router();
let book_store_model = require('../models/book_store');
const timestamp = require('time-stamp');

//Book added ti store
router.route('/addToStore').post((req,res) => {
    
    const shop = req.body.bookShopName;
    const subject = req.body.subjectTransfer;
    const grade = req.body.gradeTransfer;
    const medium = req.body.languageTransfer;
    const qty = req.body.qtyTransfer;
    const price  = req.body.price;
    const discount = req.body.discount;
    const description = req.body.description;
    const image = req.body.image;
    const current_qty = qty;
    const status = "Add";

    const book_add_to_store = new book_store_model({shop, subject, grade, qty, price, discount, description, image, status,medium,current_qty});

    book_add_to_store.save()
        .then(() => res.json('Book Added To Store!'))
        .catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Deleting Data",error: err.message});
        });
});
  

//All book in the system
router.route("/allBooks").get((req,res) => {

    book_store_model.find().sort({_id:-1}).then((book) => {
        res.json(book);
    }).catch((err) => {
        console.log(err);
    });
});

//One book shop's books
router.route("/oneShopBook/:id").get((req,res) => {

    book_store_model.find({shop:req.params.id}).sort({_id:-1}).then((book) => {
        res.json(book);
    }).catch((err) => {
        console.log(err);
    });
});

//All book in the system
router.route("/searchBook").get((req,res) => {

    book_store_model.find().sort({_id:-1}).then((book) => {
        res.json(book);
    }).catch((err) => {
        console.log(err);
    });
});

//one book in the system
router.route("/OneBooksById/:id").get((req,res) => {

    book_store_model.findById(req.params.id).sort({_id:-1}).then((book) => {
        res.json(book);
    }).catch((err) => {
        console.log(err);
    });
});

//All book in the store
router.route("/allBookInStore/:bookshop").get((req,res) => {

    book_store_model.find({shop : req.params.bookshop}).sort({_id:-1}).then((book) => {
        res.json(book);
    }).catch((err) => {
        console.log(err);
    });
});

//Update book
router.route('/updateBookRequest/:bookID').put((req, res)=>{
    const book_id = req.params.bookID; 
    const price  = req.body.price;
    const discount = req.body.discount;
    const description = req.body.description;
    const image = req.body.image;

    const updateBookProfile={price,discount,description,image}
    book_store_model.findByIdAndUpdate(book_id,updateBookProfile).then(() => {       
        res.status(200).send({status :"Book Details Updated"});    
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });
          
});

//Store Owner Remove book
router.route('/removeBook/:book').put((req, res)=>{
    const bookID = req.params.book;
    const status = "Remove"; 

    const updateBook={status}
    book_store_model.findByIdAndUpdate(bookID,updateBook).then(() => {       
        res.status(200).send({status :"Book Removed"});    
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });
          
});

//book filter

//only medium
router.route("/filterMedium/:searchMedium").get((req,res) => {
    book_store_model.find({medium : req.params.searchMedium}).sort({_id:-1}).then((book) => {
        res.json(book);
    }).catch((err) => {
        console.log(err);
    });
});

//only subject
router.route("/filterSubject/:subject").get((req,res) => {
    book_store_model.find({subject : req.params.subject}).sort({_id:-1}).then((book) => {
        res.json(book);
    }).catch((err) => {
        console.log(err);
    });
});


//only grade
router.route("/filterGrade/:grade").get((req,res) => {
    book_store_model.find({grade : req.params.grade}).sort({_id:-1}).then((book) => {
        res.json(book);
    }).catch((err) => {
        console.log(err);
    });
});

//only grade and medium
router.route("/filterGradeMedium/:grade/:medium").get((req,res) => {
    book_store_model.find({grade : req.params.grade , medium : req.params.medium}).sort({_id:-1}).then((book) => {
        res.json(book);
    }).catch((err) => {
        console.log(err);
    });
});


//only grade and subject
router.route("/filterGradeSubject/:grade/:subject").get((req,res) => {
    book_store_model.find({grade : req.params.grade , subject : req.params.subject}).sort({_id:-1}).then((book) => {
        res.json(book);
    }).catch((err) => {
        console.log(err);
    });
});

//only subject and medium
router.route("/filterSubjectMedium/:subject/:medium").get((req,res) => {
    book_store_model.find({subject : req.params.subject , medium : req.params.medium}).sort({_id:-1}).then((book) => {
        res.json(book);
    }).catch((err) => {
        console.log(err);
    });
});

//only subject , grade and medium
router.route("/filterSubjectMediumGrade/:subject/:medium/:grade").get((req,res) => {
    book_store_model.find({subject : req.params.subject , medium : req.params.medium , grade:req.params.grade }).sort({_id:-1}).then((book) => {
        res.json(book);
    }).catch((err) => {
        console.log(err);
    });
});



module.exports = router;