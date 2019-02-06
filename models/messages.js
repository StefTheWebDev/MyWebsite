var mongoose = require('mongoose');

var MessageSchema = mongoose.Schema({
    name: {
        type: String,
        index:true
    },
    email: {
        type: String
    },
    date: {
        type: String
    },
    message: {
        type: String
    }
});

var Message = module.exports = mongoose.model('Message', MessageSchema);

module.exports.createMessage = function(newMessage, callback){
            newMessage.save(callback);
}