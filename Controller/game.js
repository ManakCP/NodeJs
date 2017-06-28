'use strict';
const mongoose = require('mongoose');
let game = mongoose.model('synchrony_game');
const config = require('../config');

exports.all_games = (req, res) => {    
     game.find({}, function(err, response){         
         if (err)
            res.json(err);
         res.json(response);
     })
}

exports.one_game = (req,res) => {    
    game.find({'title': new RegExp(req.params.title, 'i')}, function(err, response){
        if (err)
            res.json(err);
        res.json(response);
    })
}