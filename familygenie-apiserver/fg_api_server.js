var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

// the following are for passport.js and authentication
var passport = require('passport');
var jwt    = require('jsonwebtoken');
var initPassport = require('./passport/init');
var config = require('./config');
var flash = require('connect-flash');
var auth = require('./authentication');
var session = require('express-session');
// var cookieParser = require('cookie-parser');
var user;

mongoose.connect('mongodb://localhost');

var PersonModel = require('./person.model.js')(mongoose);
var PairBondRelModel = require('./pairbond-relationship.model.js')(mongoose, PersonModel);
var ParentalRelModel = require('./parental-relationship.model.js')(mongoose, PersonModel);
var ParentalRelTypeModel = require('./parentalreltype.model.js')(mongoose, PersonModel);
var PersonChangeModel = require('./personchange.model.js')(mongoose, PersonModel);

var app = express();

// the following are for passport.js
app.set('jwtSecret', config.jwtSecret);
app.use(passport.initialize());
// trying to get flash to work, I needed to 
// app.use(cookieParser());
// app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
initPassport(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cors());

app.use(function(req, res, next) {
	console.log("Request recieved for:", req.url);
	next();
});

require("./user.server.route")(app,passport);

require("./api_calls/get-api")(app, passport, PersonModel, PairBondRelModel, ParentalRelModel, ParentalRelTypeModel, PersonChangeModel);
require("./api_calls/create-api")(app, passport, PersonModel, PairBondRelModel, ParentalRelModel, ParentalRelTypeModel, PersonChangeModel);
require("./api_calls/update-api")(app, passport, PersonModel, PairBondRelModel, ParentalRelModel, ParentalRelTypeModel, PersonChangeModel);
require("./api_calls/delete-api")(app, passport, PersonModel, PairBondRelModel, ParentalRelModel, ParentalRelTypeModel, PersonChangeModel);
require("./gedcom/gedcom.js")(app, mongoose);

/*app.get('*', function(req, res){
   res.sendFile('../familygenie-angular/index.html');
});*/

app.use(function(req, res, next) {
	res.status(404);
	res.send("Not found here, try somewhere else maybe?");
});

app.listen(3500, function() {
	console.log("Ready to go: 3500");
});
