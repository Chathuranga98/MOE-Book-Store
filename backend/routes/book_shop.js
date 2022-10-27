const router = require('express').Router();
let book_shop_model = require('../models/book_shop');
const bcrypt = require('bcryptjs');
let auth_model = require('../models/auth');


//Save book shop
router.route('/addBookShop').post((req,res) => {
    
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name = req.body.name;
        const address =req.body.address;
        const telephoneNumber = req.body.telephone;
        const email = req.body.email;
        const password = hashedPass;
        const profile = req.body.profile;
        const status = req.body.status;
        const userType = "Bookshop";
    
        const book_shop_saving = new book_shop_model({name
            , address
            , telephoneNumber
            , email
            , password
            , profile
            , status});

        const username = email;
        const auth = new auth_model({username,password,userType});

        book_shop_saving.save()
        .then(() => {
            auth.save()
            .then(() => res.json('Bookshop Saving Done!'))
            .catch((err) => {
                console.log(err);
                res.status(500).send({status: "Error with Deleting Data",error: err.message});
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Deleting Data",error: err.message});
        });
    });
});
  
//All BookShop
router.route("/allBookShop").get((req,res) => {
    
    book_shop_model.find().sort({_id:-1}).then((bookshop) => {
        res.json(bookshop);
    }).catch((err) => {
        console.log(err);
    });
});   

//One Bookshop books
router.route("/allBookShop/:shop_id").get((req,res) => {
    
    book_shop_model.find({email:req.params.shop_id}).sort({_id:-1}).then((bookshop) => {
        res.json(bookshop);
    }).catch((err) => {
        console.log(err);
    });
});  
  
//All Bookshop permission asked
router.route("/allBookShopPermissionAsked").get((req,res) => {
    
    book_shop_model.find({status:'Pending'}).sort({_id:-1}).then((bookshop) => {
        res.json(bookshop);
    }).catch((err) => {
        console.log(err);
    });
});  


//One bookshop
router.route("/oneBookshop/:ID").get((req,res) => {
    let ID = req.params.ID; 
    book_shop_model.findById(ID).then((school) => {
        res.json(school);
    }).catch((err) => {
        console.log(err);
    });
});   

//One school by user nama
router.route("/oneSchoolByUsername/:username").get((req,res) => {
    book_shop_model.find({status : "Active" , email : req.params.username}).then((shop) => {
        res.json(shop);
    }).catch((err) => {
        console.log(err);
    });
});

//Delete book shop
router.route("/deleteBookShop/:ID").delete(async (req, res) => {
    let ID = req.params.ID; 
    const status = "Close";
    const deleteBookShop={status};

    book_shop_model.findByIdAndUpdate(ID,deleteBookShop)
    .then(() => {
        res.status(200).send({status :"Bookshop Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});

//Update bookshop
router.route('/updateShop').put((req, res)=>{
    const shopID = req.body.shopEditId;   
    const address =req.body.addressEdit;
    const telephoneNumber = req.body.telephoneEdit;

    const updateShop={address, telephoneNumber}
    book_shop_model.findByIdAndUpdate(shopID,updateShop).then(() => {       
        res.status(200).send({status :"Book shop updated"});    
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });
          
});

//Update bookshop
router.route('/updateBookShopPermission').put((req, res)=>{
    const shopID = req.body.id;   
    const status =req.body.action;

    const updateShop={status}
    book_shop_model.findByIdAndUpdate(shopID,updateShop).then(() => {       
        res.status(200).send({status :"Book shop status updated"});    
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });
          
});


module.exports = router;