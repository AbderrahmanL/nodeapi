const Post = require("../models/post");
const {validationResult} = require("express-validator");

exports.getPosts = (req, res) => {
    const posts = Post.find().select("_id title body")
    .then((posts) => {
        // if the key and value are named the same we can use {posts}
        // instead of {posts : posts}
        res.json({posts})
    })
    .catch(err => console.log(err))
};

exports.createPost = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json(errors.array({ onlyFirstError: true }));
    }
    else{
        const post = new Post(req.body);
        //console.log("create post:", req.body);
        post.save()
        .then( result => {
            res.status(200).json({
                post: result
            });
        }) // errors are handled by the validator
        // .catch( err => { 
        //     if(!err.statusCode){
        //         err.statusCode = 500;
        //     }
        //     next(err);
        // });
    }
};