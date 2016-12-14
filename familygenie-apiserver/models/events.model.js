module.exports = function(mongoose) {

  ObjectId = mongoose.Schema.ObjectId;

  var EventsModel = mongoose.model("Events", {
    person_id : String,
    type : String,
    eventDate : Date,
    approxDate : String,
    place : String,
    details : String,
    user_id: String
  });

  return EventsModel;

};
