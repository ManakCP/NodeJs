module.exports = function(app){
    let auth = require('../Controller/auth');
    let game = require('../Controller/game')

    app.route('/user')        
        .post(auth.add_user);

    app.route('/login')
        .post(auth.verify_user);

    app.route('/games')
        .get(game.all_games);

    app.route('/games/:title')
        .get(game.one_game);
    
    app.route('/greet')
        .get(function(req, res){
            res.send('Hi Manak!! I am running on NodeJs.. its really exited!!');
        })
};
