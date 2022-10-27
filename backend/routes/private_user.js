const router = require('express').Router();
let private_user_model = require('../models/private_user');
let auth_model = require('../models/auth');
const bcrypt = require('bcryptjs');

//Save Private User
router.route('/addPrivateUser').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }
        const name = req.body.name;
        const address = req.body.address;
        const telephoneNumber = req.body.telephoneNumber;
        const nic = req.body.nic;
        const email = req.body.email;
        const password = hashedPass;
        const status = "Active";
        const userType = "private_user";

        const private_user_creating = new private_user_model({name
            , address
            , telephoneNumber
            , nic
            , email
            , password
            , status});

        const username = email;
        const auth = new auth_model({username,password,userType});

        private_user_creating.save()
        .then(() => {
            auth.save()
            .then(() => res.json('Private User Account Creating Done!'))
            .catch((err) => {
                console.log(err);
                res.status(500).send({status: "Error with Saving Data",error: err.message});
            });
            })
        .catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Saving Data",error: err.message});
        });
    })
});

//user login login
router.route('/login').post((req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    private_user_model.findOne({$or: [{email:email}]})
    .then(systemReg =>{
        if(systemReg){
                bcrypt.compare(password, systemReg.password, function(err, result){
                    if(err){
                        res.json({
                            error:err
                        })
                    }
                    if(result){
                        console.log(err);
                        res.json({
                            message: true
                        })      
                    }else{
                        console.log(err);
                         res.json({
                            message: false
                        })    
                    }
                })

        }else{
            res.json({
                message: false
            })
        }
    })
});
  
//All Users
router.route("/allPrivateUser").get((req,res) => {
    
    private_user_model.find().sort({_id:-1}).then((user) => {
        res.json(user);
    }).catch((err) => {
        console.log(err);
    });
});  


//One Users
router.route("/onePrivateUser/:ID").get((req,res) => {
    let ID = req.params.ID; 
    private_user_model.find({email:ID}).then((user) => {
        res.json(user);
    }).catch((err) => {
        console.log(err);
    });
});   


//Delete school_model
router.route("/deletePrivateUser/:ID").delete(async (req, res) => {
    let ID = req.params.ID; 
    const status = "Close";
    const deleteUser={status};
    private_user_model.findByIdAndUpdate(ID,deleteUser)
    .then(() => {
        res.status(200).send({status :"Private User Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});

//Update private user
router.route('/updatePrivateUser').put((req, res)=>{
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }
            
        const userID = req.body.id;   
        const name = req.body.name;
        const address = req.body.address;
        const telephoneNumber = req.body.telephoneNumber;
        const password = hashedPass;

        const updatePrivateUser={name
            , address
            , telephoneNumber
            , password}
        private_user_model.findByIdAndUpdate(userID,updatePrivateUser).then(() => {       
            res.status(200).send({status :"Private User updated"});    
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        });
    });      
});

router.route('/ActivateAndDeactivate').put((req, res)=>{
    const userID = req.body.userID;   
    const status = req.body.status;

    const updatePrivateUser={status}
    private_user_model.findByIdAndUpdate(userID,updatePrivateUser).then(() => {       
        res.status(200).send({status :"Private User updated"});    
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });
          
});


module.exports = router;