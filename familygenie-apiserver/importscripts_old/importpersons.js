var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost');

//var PersonSchema = require('./person.schema.js');
PersonSchema = mongoose.Schema({
	fName : String,
	mName: String,
	lName: String,
	sexAtBirth: String,
	birthDate: Date,
	birthPlace: String,
	deathDate: Date,
	deathPlace: String,
	Notes: String
},{collection: 'people'});
var Person = mongoose.model('people', PersonSchema);

person = new Person({
	fName : "Joshua",
	mName: "Jack",
	lName: "Forman",
	sexAtBirth: "M",
	birthDate: 12/3/1970,
	birthPlace: "Canoga Park, CA"
});

person.save();

person = new Person({
	fName : "Marc",
	mName: "Bruce",
	lName: "Forman",
	sexAtBirth: "M",
	birthDate: 11/6/46,
	birthPlace: "Brooklyn, NY"
});

person.save();

person = new Person({
	fName : "Jill",
	mName: null,
	lName: "Forman",
	sexAtBirth: "F",
	birthDate: 8/27/47,
	birthPlace: "Los Angeles, CA"
});

person.save();

person = new Person({
	fName : "David",
	mName: "William",
	lName: "Young",
	sexAtBirth: "M",
	birthDate: 3/6/56,
	birthPlace: "CA"
});

person.save();