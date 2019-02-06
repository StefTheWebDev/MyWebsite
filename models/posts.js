var mongoose = require('mongoose');

var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
    name: {
        type: String,
        index:true
    },
    date: {
        type: String
    },
    post: {
        type: String
    }
});

var Post = module.exports = mongoose.model('Post', PostSchema);

module.exports.createPost = function(newPost, callback){
            newPost.save(callback);
}
