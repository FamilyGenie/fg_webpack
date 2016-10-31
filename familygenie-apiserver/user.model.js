var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = mongoose.Schema({
        userName: String,
        firstName: String,
        lastName: String,
        password: String,
        group: String,
        active: {
            type: Boolean,
            default: true
        }
    },
    {
        toObject: {virtuals: true},
        toJSON: {virtuals: true}
    });


var User = mongoose.model('user', UserSchema);

module.exports = User;
