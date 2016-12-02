module.exports = function(mongoose, Events) {

  ObjectId = mongoose.Schema.ObjectId;

  var EventsModel = mongoose.model("Events", {
    personId : String,
    type : String,
    date : Date,
    approxDate : String,
    place : String,
    details : String
  });

  return EventsModel

};
