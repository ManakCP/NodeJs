'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let GameSchema = new Schema({
    title: { type: String},
    platform: { type: String},
    score: { type: Number },
    genre: { type: String },
    editors_choice: { type: String }, });

module.exports = mongoose.model('synchrony_game', GameSchema, 'synchrony_game');
