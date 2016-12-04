var auth = require('../authentication');
var mongoose = require('mongoose');

module.exports = function(app, PersonModel, PairBondRelModel, ParentalRelModel, ParentalRelTypeModel, PersonChangeModel, EventsModel) {
	app.post('/delete', auth.isAuthenticated, function(req, res) {
		var user = req.decoded._doc.userName;

		if (req.body.objectType === "person") {
			PersonModel.remove(
				{
					_id: req.body._id,
				user_id: user
				},
			function(err) {
				if (err) {
					res.status(500);
					// got this error when calling delete on a person:
					// express deprecated res.send(status, body): Use res.status(status).send(body) instead server.js:221:9 [note, the below line was line 221 when the error was received]
					res.send("Error deleting person", err);
					return;
				}
				PersonModel.find(
					{ 
						user_id: user
					}, // filter object - empty filter catches everything
					function(err, data) {
						if(err) {
							res.status(500);
							res.send("Error getting all persons after delete", err);
							return;
						}
						res.send(JSON.stringify(data));
					}
				);
			});
		} else if (req.body.objectType === "parentalRel") {
			console.log("delete parentalRel._id ", req.body.id);
			ParentalRelModel.remove(
				{
					_id: req.body._id,
					user_id: user
				},
			function(err) {
				if (err) {
					res.status(500);
					res.send("Error deleting parentalRel", err);
					return;
				}
				ParentalRelModel.find(
					{ 
						user_id: user
					}, // filter object - empty filter catches everything
					function(err, data) {
						if(err) {
							res.status(500);
							res.send("Error getting all parentalRels after delete", err);
							return;
						}
						res.send(JSON.stringify(data));
					}
				);
			});
		} else if (req.body.objectType === "pairBondRel") {
			console.log("delete pairBondRel._id ", req.body.id);
			PairBondRelModel.remove(
				{
					_id: req.body._id,
					user_id: user
				},
			function(err) {
				if (err) {
					res.status(500);
					res.send("Error deleting pairBondRel", err);
					return;
				}
				PairBondRelModel.find(
					{ 
						user_id: user
					}, // filter object - empty filter catches everything
					function(err, data) {
						if(err) {
							res.status(500);
							res.send("Error getting all pairBondRels after delete", err);
							return;
						}
						res.send(JSON.stringify(data));
					}
				);
			});
		} else if (req.body.objectType === "personChange") {
			console.log("delete personChange._id ", req.body.id);
			PersonChangeModel.remove(
				{
					_id: req.body._id,
					user_id: user
				},
			function(err) {
				if (err) {
					res.status(500);
					res.send("Error deleting personChange", err);
					return;
				}
				PersonChangeModel.find(
					{ 
						user_id: user
					}, // filter object - empty filter catches everything
					function(err, data) {
						if(err) {
							res.status(500);
							res.send("Error getting all pairBondRels after delete", err);
							return;
						}
						res.send(JSON.stringify(data));
					}
				);
			});
		} else if (req.body.objectType === "events") {
			console.log("delete events ", req.body._id);
			EventsModel.remove(
				{
					_id: req.body._id,
					user_id: user
				},
			function(err) {
				if (err) {
					res.status(500);
					res.send("Error deleting events", err);
					return;
				}
				EventsModel.find(
					{ 
						user_id: user
					}, // filter object - empty filter catches everything
					function(err, data) {
						if(err) {
							res.status(500);
							res.send("Error getting all events after delete", err);
							return;
						}
						res.send(JSON.stringify(data));
					}
				);
			});
		}

	});
};
