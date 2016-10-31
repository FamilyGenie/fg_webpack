var jwt = require('jsonwebtoken');
var config = require('./config');

var Authentication = {};

Authentication.isAuthenticated = function(req, res, next) {
   var token = req.body.token || req.query.token || req.headers['x-access-token'];
   // console.log("In the Ensure",token);
   if (token) {
       jwt.verify(token, config.jwtSecret, function(err, decoded) {
           if (err) {
               return res.json({ success: false, message: 'Failed to authenticate token.' });
           } else {
               req.decoded = decoded;
               next();
           }
       });
   } else {
       return res.status(403).send({
           success: false,
           message: 'No token provided.'
       });
   }
};

module.exports = Authentication;