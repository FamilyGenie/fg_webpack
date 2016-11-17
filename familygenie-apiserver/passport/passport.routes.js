var passport = require('passport');
var jwt    = require('jsonwebtoken');

module.exports = function(app, passport) {

    app.post('/api/v1/login',
        passport.authenticate('login',{session: false}),
        function(req, res) {

            var token = jwt.sign(req.user, app.get('jwtSecret'));
            req.user.token = token;

            res.json( {
                token: token,
                userName: req.user.firstName + " " + req.user.lastName,
                login: req.user.userName
            });
        });

    /* 
    to post to signup, need this in the body
    {
            "username": "",
            "password": "",
            "firstName": "",
            "lastName": ""
        }
    */
    app.post('/api/v1/signup',
        passport.authenticate('signup',{ session: false }),
        function(req, res) {
            res.json();
        });
};