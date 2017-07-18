module.exports = function(app){
    let auth = require('../Controller/auth');
    let game = require('../Controller/game')

    app.route('/user')        
        .post(auth.add_user);

    app.route('/login')
        .post(auth.verify_user);
    
    // app.route('/refresh')
    //     .post(auth.GetToken)

    app.route('/games')        
        .post(game.all_games)
        .post(game.add_game)
        
    app.route('/add_games_bulk')
        .post(game.add_Games_bulk_JSON);

    app.route('/games/:title')
        .get(game.one_game);
    
    app.route('/greet')
        .get(function(req, res){
            res.send('Hey Manak!!</br> <span style="padding-left:5em">I am running on NodeJs.. its really excited!!</span>');
        })
};
