var mongoose = require('mongoose'), Schema = mongoose.Schema, ObjectId=mongoose.Schema.ObjectId;
mongoose.connect('mongodb://localhost');

var PersonSchema = require('./person.schema.js');
var Person = mongoose.model('person', PersonSchema);
// var Person = mongoose.model('person', PersonSchema, "people");


var PairBondRelationshipSchema = require('./pairbond-relationship.schema.js');
var PairBondRelationship = mongoose.model('pairbondrelationship', PairBondRelationshipSchema);

Person.findOne({_id: "57bb37fa724c713244b530ed"}, // find David
	function(err, doc) {
		//console.log("person1", doc);
		Person.findOne({_id: "57b4e6a635fac344558459ed"}, // find Jill
			function(err, doc2) {
				console.log("person1", doc);
				console.log("person2", doc2);
				pairBondRelationship = new PairBondRelationship({
					personOne_id: doc._id, // this is child Josh
					personTwo_id: doc2._id, // this is father Marc
					relationshipType: "marriage",
					startDate: "6/1/1990",
					endDate: null
				});
				pairBondRelationship.save(function(err,data){
					if (err) {
						console.log("Error on pairBondRelationship save");
						// process.exit();
					}
					console.log("PairBondRelationship record saved:", data);
					// process.exit();
				});
			}
		);
	}
);