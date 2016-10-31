var mongoose = require('mongoose'), Schema = mongoose.Schema, ObjectId=mongoose.Schema.ObjectId;
mongoose.connect('mongodb://localhost');

var PersonSchema = require('./person.schema.js');
var Person = mongoose.model('person', PersonSchema);

var ParentalRelationshipSchema = require('./parental-relationship.schema.js');
var ParentalRelationship = mongoose.model('parentalrelationship', ParentalRelationshipSchema);

Person.findOne({_id: "57b4e6a635fac344558459eb"}, // find Josh
	function(err, doc) {

		Person.findOne({_id: "57bb37fa724c713244b530ed"},  // find David
			function(err, doc4) {
				console.log("person1", doc);
				console.log("person2", doc4);
				parentalRelationship = new ParentalRelationship({
					personOne_id: doc._id, // this is child Josh
					personTwo_id: doc4._id, // this is step-father David
					relationshipType: "father",
					subType: "step",
					startDate: "1/1/1979",
					endDate: null
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