const router = require('express').Router();
let subject_model = require('../models/subject');

//Save subject
router.route('/addSubject').post((req,res) => {

    const subject_name = req.body.subject_name;
    const grade = req.body.grade;
    const qty = req.body.qty;
    const medium =  req.body.medium;

    const subject_saving = new subject_model({subject_name,grade,qty,medium});

       subject_saving.save()
        .then(() => res.json('Subject Saving Done!'))
        .catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Deleting Data",error: err.message});
        });
});
  
//All subject
router.route("/allSubject").get((req,res) => {
    subject_model.find().sort({subject_name:1}).then((subject) => {
        res.json(subject);
    }).catch((err) => {
        console.log(err);
    });
});  

  
//All subject
router.route("/allSubjectWithoutDuplicate").get((req,res) => {
    subject_model.find().sort({subject_name:1}).then((subject) => {
        res.json(subject);
    }).catch((err) => {
        console.log(err);
    });
});  

//Delete subject
router.route("/deleteSubject/:ID").delete(async (req, res) => {
    let ID = req.params.ID; 
    subject_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Subject Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});

//search from grade
router.route("/allSubjectFilterGrade/:grade").get((req,res) => {
    let grade = req.params.grade;
    subject_model.find({grade:grade}).sort({subject_name:1}).then((subject) => {
        res.json(subject);
    }).catch((err) => {
        console.log(err);
    });
}); 

//search from medium
router.route("/allSubjectFilterMedium/:medium").get((req,res) => {
    let medium = req.params.medium;
    subject_model.find({medium:medium}).sort({subject_name:1}).then((subject) => {
        res.json(subject);
    }).catch((err) => {
        console.log(err);
    });
}); 

//search from medium
router.route("/allSubjectFilterGradeMedium/:grade/:medium").get((req,res) => {
    let medium = req.params.medium;
    let grade = req.params.grade;
    subject_model.find({medium:medium , grade:grade}).sort({subject_name:1}).then((subject) => {
        res.json(subject);
    }).catch((err) => {
        console.log(err);
    });
}); 

//search from current stock for request
router.route("/getCurrentStockOfTheSubject/:grade/:medium/:subject").get((req,res) => {
    let medium = req.params.medium;
    let grade = req.params.grade;
    let subject = req.params.subject;

    subject_model.find({medium:medium , grade:grade , subject_name:subject}).sort({subject_name:1}).then((subject) => {
        res.json(subject);
    }).catch((err) => {
        console.log(err);
    });
}); 

//update count
router.route('/addNewBookStock/:subID').put((req, res)=>{
    const subID = req.params.subID; 
    const current_stock = req.body.current_stock; 
    const new_Stock = req.body.new_Stock;

    var qty = parseInt(current_stock)+parseInt(new_Stock);
    const stock_update={qty}
    subject_model.findByIdAndUpdate(subID,stock_update).then(() => {       
        res.status(200).send({status :"Stock Updated."});    
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });
          
});

module.exports = router;