const router = require('express').Router();
let auth_model = require('../models/auth');
const bcrypt = require('bcryptjs');

//user login login
router.route('/login').post((req, res, next) => {
    let username = req.body.email;
    let password = req.body.password;

    auth_model.findOne({$or: [{username:username}]})
    .then(systemReg =>{
        if(systemReg){
                bcrypt.compare(password, systemReg.password, function(err, result){
                    if(err){
                        res.json({
                            error:err
                        })
                    }
                    if(result){
                        auth_model.find({username : username}).then((user_profile) => {
                            res.json({message:user_profile[0].userType});
                        }).catch((err) => {
                            console.log(err);
                        });
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
  
module.exports = router;