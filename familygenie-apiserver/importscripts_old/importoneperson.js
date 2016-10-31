var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost');

PersonSchema = mongoose.Schema({
	fName : String,
	mName: String,
	lName: String,
	sexAtBirth: String,
	BirthDate: Date,
	BirthPlace: String,
	DeathDate: Date,
	DeathPlace: String,
	Notes: String
},{collection: 'people'});
var Person = mongoose.model('people', PersonSchema);

person = new Person({
	fName : "David",
	mName: "William",
	lName: "Young",
	sexAtBirth: "M",
	BirthDate: 3/6/56,
	BirthPlace: "CA"
});

person.save();