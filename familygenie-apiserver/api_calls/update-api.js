var auth = require('../authentication');
var mongoose = require('mongoose');

module.exports = function(app, PersonModel, PairBondRelModel, ParentalRelModel, ParentalRelTypeModel, PersonChangeModel, EventsModel) {
	app.post('/update', auth.isAuthenticated, function(req, res){
    console.log("in update with:", req.body.objectType);
		// console.log("req.body.object._id",req.body.object._id);
		var id = req.body.object._id;
		var user = req.decoded._doc.userName;

		if (req.body.objectType === "person") {
			PersonModel.findOneAndUpdate(
				{
					_id: id,
					user_id: user
				},
				{$set: {
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
				}},
				{new: true},
				function(err, data) {
					if(err) {
						res.status(500);
						res.send("Error updating person data");
						return;
					}
					console.log("****Updated record being returned", data);
					res.send(data);
				}
			);
		} else if (req.body.objectType === "parentalRel") {
			ParentalRelModel.findOneAndUpdate(
				{
					_id: id,
					user_id: user
				},
				{$set: {
					child_id: req.body.object.child_id,
					parent_id: req.body.object.parent_id,
					relationshipType: req.body.object.relationshipType,
					subType: req.body.object.subType,
					startDate: req.body.object.startDate,
					endDate: req.body.object.endDate,
					user_id: user
				}},
				{new: true},
				function(err, data) {
					if(err) {
						res.status(500);
						res.send("Error updating parental relationship data");
						return;
					}
					res.send(data);
				}
			);
		} else if (req.body.objectType === "pairBondRel") {
			PairBondRelModel.findOneAndUpdate(
				{
					_id: id,
					user_id: user
				},
				{$set: {
					personOne_id: req.body.object.personOne_id,
					personTwo_id: req.body.object.personTwo_id,
					relationshipType: req.body.object.relationshipType,
					subType: req.body.object.subType,
					startDate: req.body.object.startDate,
					endDate: req.body.object.endDate,
					user_id: user
				}},
				{new: true},
				function(err, data) {
					if(err) {
						res.status(500);
						res.send("Error updating pair bond relationship data");
						return;
					}
					res.send(data);
				}
			);
		} else if (req.body.objectType === "personChange") {
			PersonChangeModel.findOneAndUpdate(
				{
					_id: id,
					user_id: user
				},
				{$set: {
				person_id: req.body.object.person_id,
				dateChange: req.body.object.dateChange,
				fName : req.body.object.fName,
				mName: req.body.object.mName,
				lName: req.body.object.lName,
				sex: req.body.object.sex,
				user_id: user
			}},
				{new: true},
				function(err, data) {
					if(err) {
						res.status(500);
						res.send("Error updating person change data");
						return;
					}
					res.send(data);
				}
			);
		} else if (req.body.objectType === "event") {
      console.log('object: ', req.body.object)
			EventsModel.findOneAndUpdate(
				{
					_id: id,
					user_id: user
				},
				{$set: {
        person_id: req.body.object.person_id,
        type: req.body.object.type,
        eventDate: req.body.object.date,
        place: req.body.object.place,
        details: req.body.object.details
			}},
				{new: true},
				function(err, data) {
					if(err) {
						res.status(500);
						res.send("Error updating person change data");
						return;
					}
					res.send(data);
				}
			);
		}
	});
};
