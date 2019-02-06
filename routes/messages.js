var express = require('express');
var router = express.Router();
var Message = require('../models/messages.js');

// create messages
router.get('/messages', function(req,res){
    res.render('messages');
});

/* GET my messages page. */
router.get('/my-messages', ensureAuthenticated, function(req, res, next) {
    Message.find(function(err, messages) {
      res.render('my-messages',{ title: 'Node Project', messages: messages });
  });
});

module.exports = router;

//Create message
router.post('/messages', function(req, res){
    var name = req.body.name;
    var date = req.body.date;
    var email = req.body.email;
    var message = req.body.message;

    //Validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('date', 'Date is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('message', 'Message is required').notEmpty();


    var errors = req.validationErrors();

    if(errors){
        res.render('messages', {
            errors:errors
        });
    } else {
        var newMessage = new Message({
            name: name,
            date: date,
            email: email,
            message: message,
        });

        Message.createMessage(newMessage, function(err, message){
            if(err) throw err;
            console.log(message);
        });

        req.flash('success_msg', 'Message was made successfully');

        res.redirect('/');

    }

});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()) {
        return next();
    } else {
        //req.flash('error_msg', 'You are not logged in');
        res.redirect('/users/login');
    }
}
module.exports = router;