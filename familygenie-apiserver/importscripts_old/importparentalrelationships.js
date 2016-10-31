var mongoose = require('mongoose'), Schema = mongoose.Schema, ObjectId=mongoose.Schema.ObjectId;
mongoose.connect('mongodb://localhost');

var PersonSchema = require('./person.schema.js');
var Person = mongoose.model('person', PersonSchema);

var ParentalRelationshipSchema = require('./parental-relationship.schema.js');
var ParentalRelationship = mongoose.model('parentalrelationship', ParentalRelationshipSchema);

Person.findOne({_id: "57c2f3bdb9f81e5b42bc2754"}, // find Josh
	function(err, doc) {
		Person.findOne({_id: "57c2f3bdb9f81e5b42bc2755"},  // find Marc
			function(err, doc2) {
				console.log("person1", doc);
				console.log("person2", doc2);
				parentalRelationship = new ParentalRelationship({
					child_id: doc._id, // this is child Josh
					parent_id: doc2._id, // this is father Marc
					relationshipType: "father",
					subType: "bio",
					startDate: "1970-12-03",
					endDate: ""
				});
				parentalRelationship.save(function(err,data){
					if (err) {
						console.log("Error on <<parentalRelationship save");
						// process.exit();
					}
					console.log("ParentalRelationship record saved:", data);
					// process.exit();
				});
				
		});

		Person.findOne({_id: "57c2f3bdb9f81e5b42bc2756"},  // find Jill
			function(err, doc3) {
				console.log("person1", doc);
				console.log("person2", doc3);
				parentalRelationship = new ParentalRelationship({
					child_id: doc._id, // this is child Josh
					parent_id: doc3._id, // this is mother Jill
					relationshipType: "mother",
					subType: "bio",
					startDate: "1970-12-03",
					endDate: ""
				});
				parentalRelationship.save(function(err,data){
					if (err) {
						console.log("Error on <<parentalRelationship save");
						// process.exit();
					}
					console.log("ParentalRelationship record saved:", data);
					// process.exit();
				});
				
		});

		Person.findOne({_id: "57c2f3bdb9f81e5b42bc2757"},  // find David
			function(err, doc3) {
				console.log("person1", doc);
				console.log("person2", doc3);
				parentalRelationship = new ParentalRelationship({
					child_id: doc._id, // this is child Josh
					parent_id: doc3._id, // this is step-father David
					relationshipType: "father",
					subType: "step",
					startDate: "1978-01-01",
					endDate: ""
				});
				parentalRelationship.save(function(err,data){
					if (err) {
						console.log("Error on <<parentalRelationship save");
						// process.exit();
					}
					console.log("ParentalRelationship record saved:", data);
					// process.exit();
				});
				
		});
	});