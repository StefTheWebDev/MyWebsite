var mongoose = require('mongoose');
var Schema = mongoose.Schema; 
var schema = new Schema({ 
 name: {type: String, required: true}, 
 publicationYear: {type: String, required: true}, 
 link: {type: String, required: true},
 imageUrl: {type: String, required: true} 
}); 
module.exports = mongoose.model('Songs', schema);