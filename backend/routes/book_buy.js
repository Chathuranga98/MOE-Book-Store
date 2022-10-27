const router = require('express').Router();
let book_buy_model = require('../models/book_buy');
let book_store_model = require('../models/book_store');

//Save book reject reason
router.route('/addBookBuy').post((req,res) => {
   
    const bookId = req.body.bookId;
    const Qty = req.body.Qty;
    const userName = req.body.UserName;
    const shop = req.body.shop;
    const c_qty = req.body.current_qty;
    const current_qty = c_qty - Qty;
    const status = "Add";

    const book_buy_save = new book_buy_model({bookId
       , Qty
       , userName
       , shop
       ,status});

    book_buy_save.save()
        .then(() => {

            const updateBook={current_qty}
            book_store_model.findByIdAndUpdate(bookId,updateBook).then(() => {       
                res.status(200).send({status :"Book Bought and Updated"});    
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

//buy user wise
router.route("/bookForOneUser/:username").get((req,res) => {
    book_buy_model.find({userName : req.params.username , status : 'Add'}).then((book_request) => {
        res.json(book_request);
    }).catch((err) => {
        console.log(err);
    });
});   

//selling qty bookshop wise
router.route("/bookSellingHistory/:shop").get((req,res) => {
    book_buy_model.find({shop : req.params.shop}).then((book_request) => {
        res.json(book_request);
    }).catch((err) => {
        console.log(err);
    });
});  

//view all bought books
router.route("/soldAllBooks").get((req,res) => {
    book_buy_model.find().then((book_request) => {
        res.json(book_request);
    }).catch((err) => {
        console.log(err);
    });
});   


//Delete item
router.route("/deleteCartItem/:ID/:current_added_Qty/:current_stock/:bookId").delete(async (req, res) => {
    let ID = req.params.ID; 
    let current_added_Qty = req.params.current_added_Qty; 
    let current_stock = req.params.current_stock; 
    let bookId = req.params.bookId; 
    book_buy_model.findByIdAndDelete(ID)
    .then(() => {

        const current_qty = parseInt(current_stock)+parseInt(current_added_Qty);
        const updateBookQty={current_qty}
        book_store_model.findByIdAndUpdate(bookId,updateBookQty).then(() => {       
            res.status(200).send({status :"Stock and Cart Updated."});    
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});

//update count
router.route('/updateBookQty/:cartID').put((req, res)=>{
    const cartID = req.params.cartID; 
    const new_qty = req.body.new_qty;
    const current_added_Qty = req.body.current_added_Qty;
    const current_stock = req.body.current_stock;
    const bookId = req.body.bookId;

    var current_qty = (new_qty > current_added_Qty) ? parseInt(current_stock)-(parseInt(new_qty)-parseInt(current_added_Qty)) : parseInt(current_stock)+(parseInt(current_added_Qty)-parseInt(new_qty));

    const stock_update={current_qty}
    const updateBookRequest={Qty}
    book_buy_model.findByIdAndUpdate(cartID,updateBookRequest).then(() => {       
        book_store_model.findByIdAndUpdate(bookId,stock_update).then(() => {       
            res.status(200).send({status :"Stock and Cart Updated."});    
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        });
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });
          
});


//update count
router.route('/updateBoughtStatus/:cartID').put((req, res)=>{
    const cartID = req.params.cartID; 
    const status = "Bought";

    const updateBookRequest={status}
    book_buy_model.findByIdAndUpdate(cartID,updateBookRequest).then(() => {       
        res.status(200).send({status :"Stock and Cart Updated."});    
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });
          
});
module.exports = router;