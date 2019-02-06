var express = require('express');
var router = express.Router();
var Post = require('../models/posts.js');

// create posts
router.get('/posts', ensureAuthenticated, function(req,res){
    res.render('posts');
});

/* GET posts page. */
router.get('/all-posts', function(req, res, next) {
    Post.find(function(err, posts) {
      res.render('all-posts',{ title: 'Node Project', posts: posts });
  });
});

module.exports = router;

//Create post
router.post('/posts', ensureAuthenticated, function(req, res){
    var name = req.body.name;
    var date = req.body.date;
    var post = req.body.post;

    //Validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('date', 'Date is required').notEmpty();
    req.checkBody('post', 'Post is required').notEmpty();


    var errors = req.validationErrors();

    if(errors){
        res.render('posts', {
            errors:errors
        });
    } else {
        var newPost = new Post({
            name: name,
            date: date,
            post: post,
        });

        Post.createPost(newPost, function(err, posts){
            if(err) throw err;
            console.log(posts);
        });

        req.flash('success_msg', 'Post was made successfully');

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