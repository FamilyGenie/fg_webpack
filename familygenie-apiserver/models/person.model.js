module.exports = function(mongoose) {

	var PersonModel = mongoose.model("Person",{
		fName : String,
		mName: String,
		lName: String,
		sexAtBirth: String,
		birthDate: Date,
		birthPlace: String,
		deathDate: Date,
		deathPlace: String,
		notes: String,
		user_id: String
	});

	return PersonModel;

};