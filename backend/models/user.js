var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    login: {type: String, required: true, unique: true},
    name: {type: String},
    password: {type: String, required: true},
    email: {type: String, lowercase: true},
    role: {type: String, enum: ['User', 'Admin'], default: 'User'},
    watchlist: {type: Array, default: []}
});

//Save user`s hashed password
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

//Compare password
UserSchema.methods.comparePassword = function (pw, cb) {
  bcrypt.compare(pw, this.password, function (err, isMatch) {
      if (err) {
          return cb(err);
      }
      cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);