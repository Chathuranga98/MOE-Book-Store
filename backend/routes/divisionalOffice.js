const router = require('express').Router();
let divisional_office_model = require('../models/divisionalOffice');
let auth_model = require('../models/auth');
const bcrypt = require('bcryptjs');

//Save divisional office
router.route('/addDivisionalOffice').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }
        const office = req.body.office;
        const address = req.body.address;
        const telephoneNumber = req.body.telephoneNumber;
        const faxNumber = req.body.faxNumber;
        const email = req.body.email;
        const website = req.body.website;
        const username = req.body.username;
        const password = hashedPass;
        const userType = "deo";

        const divisional_office_saving = new divisional_office_model({office, address, telephoneNumber, faxNumber, email, website,username
        , password});

        const auth = new auth_model({username,password,userType});

        divisional_office_saving.save()
        .then(() => {
            auth.save()
            .then(() => {
                res.json('Divisional Office Saving Done!')
            })
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
  
//All divisional office
router.route("/allDivisionalOffice").get((req,res) => {
    
    divisional_office_model.find().sort({_id:-1}).then((office) => {
        res.json(office);
    }).catch((err) => {
        console.log(err);
    });
});  


//One divisional office
router.route("/oneDivisionalOffice/:ID").get((req,res) => {
    let ID = req.params.ID; 
    divisional_office_model.findById(ID).then((office) => {
        res.json(office);
    }).catch((err) => {
        console.log(err);
    });
});   

//One divisional office by user name
router.route("/oneDivisionalOfficeByUsername/:ID").get((req,res) => {
    let ID = req.params.ID; 
    divisional_office_model.findOne({username : ID}).then((office) => {
        res.json(office);
    }).catch((err) => {
        console.log(err);
    });
});

//Delete divisional office
router.route("/deleteDivisionalOffice/:ID").delete(async (req, res) => {
    let ID = req.params.ID; 
    divisional_office_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Divisional Office Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});

//Update divisional office
router.route('/updateDivisionalOffice').put((req, res)=>{
    const officeID = req.body.deoIdEdit;  
    const address = req.body.addressEdit;
    const telephoneNumber = req.body.telephoneNumberEdit;
    const faxNumber = req.body.faxNumberEdit;


    const updateOffice={ address, telephoneNumber, faxNumber}
    divisional_office_model.findByIdAndUpdate(officeID,updateOffice).then(() => {       
        res.status(200).send({status :"Divisional Office updated"});    
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });
          
});


module.exports = router;