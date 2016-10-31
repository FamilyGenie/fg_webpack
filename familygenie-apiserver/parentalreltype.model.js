module.exports = function(mongoose) {

	var ParentalRelTypeModel = mongoose.model("parentalRelType",{
		parentalRelType : String
	});

	return ParentalRelTypeModel;

};