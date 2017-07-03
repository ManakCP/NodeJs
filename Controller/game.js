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

exports.add_Games_bulk_JSON = (req, res) => {      
    // let jsn = [
    //     { "title":"LittleBigPlanet PS1 Vita", "platform" : "PlayStation Vita1", "score" : 9.0, "genre" : "Platformer", "editors_choice" : "Y" }
    //     , { "title":"LittleBigPlanet PS2 Vita", "platform" : "PlayStation Vita2", "score" : 8.0, "genre" : "Platformer", "editors_choice" : "Y" }
    //     ];

    //let g1 = JSON.parse(req.body.data);
        
    game.create(req.body, function(err, response){
        if (err)
            return res.send(err);
        return  res.json(response);
    })    
}

exports.add_game = (req,res) => {
    let g1 = new game(req.body);
    g1.save(function(err, response){
        if (err)
            return res.send(err);

        return res.json(response);
    })
}