var auth = require('../authentication');
var mongoose = require('mongoose');

module.exports = function(app, PersonModel, PairBondRelModel, ParentalRelModel, ParentalRelTypeModel, PersonChangeModel, EventsModel) {
	app.get('/people', auth.isAuthenticated, function(req, res) {
		var user = req.decoded._doc.userName;
		PersonModel.find(
			{
				user_id: user
			}, // filter object empty - to return all
			function(err, data) {
				if(err) {
					res.status(500);
					res.send("Error getting all people");
					return;
				}
				// console.log("Results from get.people:", JSON.stringify(data));
				res.send(JSON.stringify(data));
			}
		);
	});

	app.get('/pairbondrels', auth.isAuthenticated, function(req, res) {
		var user = req.decoded._doc.userName;
		PairBondRelModel.find(
			{
				user_id: user
			}, // filter object empty - to return all
			function(err, data) {
				if(err) {
					res.status(500);
					res.send("Error getting all pairbonds", err);
					return;
				}
				res.send(JSON.stringify(data));
			}
		);
	});

	app.get('/parentalrels', auth.isAuthenticated, function(req, res) {
		var user = req.decoded._doc.userName;
		ParentalRelModel.find(
			{
				user_id: user
			}, // filter object empty - to return all
			function(err, data) {
				if(err) {
					res.status(500);
					res.send("Error getting all parental relationships", err);
					return;
				}
				// console.log("Results from get.parentRels:", JSON.stringify(data));
				res.send(JSON.stringify(data));
			}
		);
	});

	app.get('/personchanges', auth.isAuthenticated, function(req, res) {
		var user = req.decoded._doc.userName;
		PersonChangeModel.find(
			{
				user_id: user
			}, // filter object empty - to return all
			function(err, data) {
				if(err) {
					res.status(500);
					res.send("Error getting all personChanges", err);
					return;
				}
				// console.log("Results from get.personChanges:", JSON.stringify(data));
				res.send(JSON.stringify(data));
			}
		);
	});

	app.get('/parentalreltypes', auth.isAuthenticated, function(req, res) {
		// ParentalRelTypes are not different for different users, so do not filter by user_id
		ParentalRelTypeModel.find(
			{
			}, 
			function(err, data) {
				if(err) {
					res.status(500);
					res.send("Error getting all parentalRelTypes", err);
					return;
				}
				// console.log("Results from get.parentRels:", JSON.stringify(data));
				res.send(JSON.stringify(data));
			}
		);
	});

	app.get('/events', auth.isAuthenticated, function(req, res) {
		var user = req.decoded._doc.userName;
		EventsModel.find(
			{
				user_id: user
			}, 
			function(err, data) {
				if(err) {
					res.status(500);
					res.send("Error getting all Events", err);
					return;
				}
				// console.log("Results from get.Events:", JSON.stringify(data));
				res.send(JSON.stringify(data));
			}
		);
	});

};
