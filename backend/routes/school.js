const router = require('express').Router();
let school_model = require('../models/school');
let auth_model = require('../models/auth');
const bcrypt = require('bcryptjs');

//Save School
router.route('/addSchool').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name = req.body.name;
        const address = req.body.address;
        const telephoneNumber = req.body.telephoneNumber;
        const faxNumber = req.body.faxNumber;
        const email = req.body.email;
        const website = req.body.website;
        const schoolType = req.body.schoolType;
        const username = req.body.username;
        const password = hashedPass;
        const logo = req.body.school_logo;
        const DEO = req.body.DEO;
        const status = "Active";
        const userType = "school";

        const school_saving = new school_model({name, address, telephoneNumber, faxNumber, email, website,schoolType,username
        , password, logo,DEO,status});

        const auth = new auth_model({username,password,userType});

        school_saving.save()
        .then(() => {
            auth.save()
            .then(() =>res.json('School Saving Done!'))
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
  
//All Schools
router.route("/allSchools").get((req,res) => {
    
    school_model.find().sort({_id:-1}).then((school) => {
        res.json(school);
    }).catch((err) => {
        console.log(err);
    });
});  


//One school
router.route("/oneSchool/:ID").get((req,res) => {
    let ID = req.params.ID; 
    school_model.findById(ID).then((school) => {
        res.json(school);
    }).catch((err) => {
        console.log(err);
    });
});   

//One school by user name
router.route("/oneSchoolByUsername/:username").get((req,res) => {
    school_model.find({status : "Active" , username : req.params.username}).then((school) => {
        res.json(school);
    }).catch((err) => {
        console.log(err);
    });
});


//School for DEO
router.route("/allSchoolsForDeo/:DEO").get((req,res) => {
    school_model.find({DEO : req.params.DEO}).then((school) => {
        res.json(school);
    }).catch((err) => {
        console.log(err);
    });
});


//Delete school_model
router.route("/deleteSchool/:ID").delete(async (req, res) => {
    let ID = req.params.ID; 
    const status = "Close";
    const deleteSchool={status};
    school_model.findByIdAndUpdate(ID,deleteSchool)
    .then(() => {
        res.status(200).send({status :"School Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});

//Update school
router.route('/updateSchool/:id').put((req, res)=>{
        const schoolID = req.body.id;
        const name = req.body.name;
        const address = req.body.address;
        const telephoneNumber = req.body.telephoneNumber;
        const faxNumber = req.body.faxNumber;
        const website = req.body.website;
        const schoolType = req.body.schoolType;


    const updateSchool={name, address, telephoneNumber, faxNumber,schoolType, website}
    school_model.findByIdAndUpdate(schoolID,updateSchool).then(() => {       
        res.status(200).send({status :"School updated"});    
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });
          
});


module.exports = router;