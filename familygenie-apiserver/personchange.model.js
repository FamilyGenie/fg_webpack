module.exports = function(mongoose, PersonModel) {

	ObjectId = mongoose.Schema.ObjectId;

	var PersonChangeModel = mongoose.model("PersonChange",{
		person_id: {type: ObjectId, ref: PersonModel},
		dateChange: Date,
		fName : String,
		mName: String,
		lName: String,
		sex: String,
		user_id: String
	});

	return PersonChangeModel;
};