'use strict';
const mongoose = require('mongoose');
let user = mongoose.model('Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtRefresh = require('jsonwebtoken-refresh');
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

        if (!response) {
            res.json({success: false, message: 'Authentication failed. User not found.'});
        } else if (response) {
            if (!bcrypt.compareSync(req.body.password, response.password)){
                res.json({success: false, message: 'Authentication failed. Wrong password.'});                
            }else{
                
                const token = jwt.sign({data: response.name}, config.secret, { expiresIn: 20 });                

                res.json({success: true, message: 'valid user', username: response.name, JWTtoken: token})
                //res.json({success: true, message: 'valid user', username: response.name, JWTtoken: this.GetToken('', response)})                
            }
        }
    })

    // In Progress
    exports.GetToken = (inUseToken, response) => {
        let token;
        if (inUseToken != '') {
            jwt.verify(token, config.secret, (err, decode) => {
                if (err) {
                    token = jwtRefresh.refresh(expiredToken, 20, config.secret);
                }
            })
        } else {
             token = jwt.sign({data: response.name}, config.secret, { expiresIn: 20 });
        }
        return token;
    }
}
