var mongoose = require('mongoose'), Schema = mongoose.Schema, ObjectId=mongoose.Schema.ObjectId;
mongoose.connect('mongodb://localhost');

var PersonSchema = require('./person.schema.js');
var Person = mongoose.model('person', PersonSchema);
// var Person = mongoose.model('person', PersonSchema, "people");


var PairBondRelationshipSchema = require('./pairbond-relationship.schema.js');
var PairBondRelationship = mongoose.model('pairbondrelationship', PairBondRelationshipSchema);


Person.findOne({_id: "57c2f3bdb9f81e5b42bc2755"}, // find Marc
	function(err, doc) {
		//console.log("person1", doc);
		Person.findOne({_id: "57c2f3bdb9f81e5b42bc2756"}, // find Jill
			function(err, doc2) {
				console.log("person1", doc);
				console.log("person2", doc2);
				pairBondRelationship = new PairBondRelationship({
					personOne_id: doc._id, // this is Jill
					personTwo_id: doc2._id, // this is father Marc
					relationshipType: "marriage",
					startDate: "1966-01-01",
					endDate: "1978-01-01"
				});
				pairBondRelationship.save(function(err,data){
					if (err) {
						console.log("Error on pairBondRelationship save");
						// process.exit();
					}
					console.log("PairBondRelationship record saved:", data);
					// process.exit();
				});
				
		});
	});

Person.findOne({_id: "57c2f3bdb9f81e5b42bc2757"}, // find David
	function(err, doc) {
		//console.log("person1", doc);
		Person.findOne({_id: "57c2f3bdb9f81e5b42bc2756"}, // find Jill
			function(err, doc2) {
				console.log("person1", doc);
				console.log("person2", doc2);
				pairBondRelationship = new PairBondRelationship({
					personOne_id: doc._id, // this is Jill
					personTwo_id: doc2._id, // this is David
					relationshipType: "marriage",
					startDate: "1990-06-01",
					endDate: ""
				});
				pairBondRelationship.save(function(err,data){
					if (err) {
						console.log("Error on pairBondRelationship save");
						// process.exit();
					}
					console.log("PairBondRelationship record saved:", data);
					// process.exit();
				});
				
		});
	});