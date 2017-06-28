'use strict';
const mongoose = require('mongoose');
let user = mongoose.model('Users');
const bcrypt = require('bcrypt');
const config = require('../config');

exports.add_user = (req, res) => {
    let signUp_user = new user(req.body);
    signUp_user.dob = new Date(req.body.dob).toJSON();
    signUp_user.password = bcrypt.hashSync(req.body.password, config.saltRound);   

    signUp_user.save({
        name: signUp_user.name,
        password: signUp_user.password,
        email: signUp_user.email,
        dob: signUp_user.dob,
        age: signUp_user.age      
    }, function(err, response){
        if (err)
            res.send(err);
        res.json('User registered successfully!!');
    });
}

exports.verify_user = (req, res) => {
    user.findOne({email: req.body.email}, function(err, response){
        if (err) res.send(err);

        if (!response){
            res.json({success: false, message: 'Invalid emailId'});
        }else if (response){
            if (bcrypt.compareSync(req.body.password, response.password)){                
                res.json({success: true, message: 'valid user', username: response.name})
            }else{
                res.json({success: false, message: 'Invalid password'});
            }
        }
    })
}
