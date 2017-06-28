'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: { type: String, Required: 'user name is required' },
    password: { type: String, Required: 'password is required' },
    email: { type: String, Required: 'email is required' },
    dob: { type: Date },
    age: { type: Number },
    createdate: { type:Date, default: Date.now },});

module.exports = mongoose.model('Users', UserSchema);
