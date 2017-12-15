var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var MovieShema = new Schema({
    Title: {type: String, required: true},
    Year: {type: String},
    Rated: {type: String},
    Released: {type: String},
    Runtime: {type: String},
    Genre: {type: Array},
    Director: {type: String},
    Writer: {type: String},
    Actors: {type: String},
    Plot: {type: String},
    Language: {type: String},
    Country: {type: String},
    Awards: {type: String},
    Poster: String,
    Metascore: String,
    imdbRating: {type: String},
    imdbVotes: String,
    imdbID: { type: String, required: true, unique: true},
    Type: {type: String}
});

    MovieShema.plugin(mongoosePaginate);

Movie = module.exports = mongoose.model('Movie', MovieShema);