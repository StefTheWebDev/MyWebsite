var express = require('express');
var router = express.Router();

var Songs = require('../models/songs');



/* GET home page. */
router.get('/', function(req, res, next) {
    Songs.find(function(err, songs) {
      res.render('index', { title: 'Node Project', songs: songs });
  });
});

module.exports = router;

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()) {
        return next();
    } else {
        //req.flash('error_msg', 'You are not logged in');
        res.redirect('/users/login');
    }
}

module.exports = router;

