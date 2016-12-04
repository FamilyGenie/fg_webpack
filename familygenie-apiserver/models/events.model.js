module.exports = function(mongoose) {

  ObjectId = mongoose.Schema.ObjectId;

  var EventsModel = mongoose.model("Events", {
    person_id : String,
    type : String,
    date : Date,
    approxDate : String,
    place : String,
    details : String
  });

  return EventsModel

};
