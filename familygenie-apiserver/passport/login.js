var LocalStrategy   = require('passport-local').Strategy;
var User = require('../user.model');
var bCrypt = require('bcrypt-nodejs');


module.exports = function(passport){

	passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) { 
            // check in mongo if a user with username exists or not

            console.log("Well?");

            User.findOne({ 'userName' :  username },
                function(err, user) {
                    // In case of any error, return using the done method

                    console.log("User", user);
                    if (err)
                        return done(err);
                    // Username does not exist, log the error and redirect back
                    if (!user){
                        console.log('User Not Found with username '+username);
                        // return done(null, false, req.flash('message', 'User Not found.'));
                        req.body.message = "User Not Found";
                        return done(null, false);                 
                    }
                    // User exists but wrong password, log the error 
                    if (!isValidPassword(user, password)){
                        console.log('Invalid Password');
                        // return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
                        req.body.message = "Invalid Password";
                        return done(null, false);  
                    }
                          // User and password both match, return user from done method
                    // which will be treated like success

                    //smtpService.testSend();

                    return done(null, user);
                }
            );

        })
    );


    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    };
    
};