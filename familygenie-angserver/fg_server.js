var express = require("express");

var app = express();

app.use(function(req, res, next) {
	console.log("Request recieved for:", req.url);
	next();
});

app.use(express.static('public'));
app.use('/peoplesearch', express.static('public'));
app.get('/peopledetails/:uid', function(req, res){
    var uid = req.params.uid,
        path = req.params[0] ? req.params[0] : 'index.html';
    res.sendFile(path, {root: './public'});
});
app.get('/map/:uid', function(req, res){
    var uid = req.params.uid,
        path = req.params[0] ? req.params[0] : 'index.html';
    res.sendFile(path, {root: './public'});
});

app.use(function(req, res, next) {
	res.status(404);
	res.send('404 file not found');
});

app.listen(4040, function() {
	console.log("yes: 4040");
});