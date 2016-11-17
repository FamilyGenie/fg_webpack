var auth = require('../authentication');
var mongoose = require('mongoose');

module.exports = function(app, PersonModel, PairBondRelModel, ParentalRelModel, ParentalRelTypeModel, PersonChangeModel) {
	app.post('/create', auth.isAuthenticated, function(req, res){
		var object;
		var user = req.decoded._doc.userName;
		if (req.body.objectType === "person") {
			object = {
				fName : req.body.object.fName,
				mName: req.body.object.mName,
				lName: req.body.object.lName,
				sexAtBirth: req.body.object.sexAtBirth,
				birthDate: req.body.object.birthDate,
				birthPlace: req.body.object.birthPlace,
				deathDate: req.body.object.deathDate,
				deathPlace: req.body.object.deathPlace,
				notes: req.body.object.notes,
				user_id: user
			};

			new PersonModel(object).save(function(err, data){
				if (err) {
					console.log("Create Person error:", err);
					res.status(500);
					res.send("Error creating line item");
					return;
				}
				// console.log("****Created record being returned", data);
				res.send(JSON.stringify(data));
			});
		} else if (req.body.objectType === "parentalRel") {
			// console.log("create parentalRel with:", req.body);
			object = {
				child_id: req.body.object.child_id,
				parent_id: req.body.object.parent_id,
				relationshipType: req.body.object.relationshipType,
				subType: req.body.object.subType,
				startDate: req.body.object.startDate,
				endDate: req.body.object.endDate,
				user_id: user
			};
			new ParentalRelModel(object).save(function(err, data){
				if (err) {
					console.log("Create ParentalRel error:", err);
					res.status(500);
					res.send("Error creating line item");
					return;
				}
				res.send(JSON.stringify(data));
			});

		} else if (req.body.objectType === "pairBondRel") {
			// console.log("create pairBondRel with:", req.body);
			object = {
				personOne_id: req.body.object.personOne_id,
				personTwo_id: req.body.object.personTwo_id,
				relationshipType: req.body.object.relationshipType,
				subType: req.body.object.subType,
				startDate: req.body.object.startDate,
				endDate: req.body.object.endDate,
				user_id: user
			};
			new PairBondRelModel(object).save(function(err, data){
				if (err) {
					console.log("Create PairBondRel error:", err);
					res.status(500);
					res.send("Error creating line item");
					return;
				}
				res.send(JSON.stringify(data));
			});
		} else if (req.body.objectType === "personChange") {
			// console.log("create personChange with:", req.body);
			object = {
				person_id: req.body.object.person_id,
				dateChange: req.body.object.dateChange,
				fName : req.body.object.fName,
				mName: req.body.object.mName,
				lName: req.body.object.lName,
				sex: req.body.object.sexAtBirth,
				user_id: user
			};
			new PersonChangeModel(object).save(function(err, data){
				if (err) {
					console.log("Create PersonChange error:", err);
					res.status(500);
					res.send("Error creating line item");
					return;
				}
				res.send(JSON.stringify(data));
			});
		}
	});
};