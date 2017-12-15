var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserShema = new Schema({
    user_id: {type: String, required: true, unique: true},
    isAdmin: {type: Boolean},
    watchlist: {type: Array}
});

module.exports = mongoose.model('User', UserShema);